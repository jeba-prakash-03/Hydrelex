import { Router, Request, Response } from 'express';
import { z } from 'zod';
import pool from '../db/connection.js';
import { requireAuth, AuthRequest } from '../middleware/auth.js';
import { formSubmissionLimiter } from '../middleware/rateLimiter.js';
import { sendEnquiryNotificationEmail } from '../utils/email.js';

const router = Router();

const enquirySchema = z.object({
  fullName: z.string().trim().min(2, 'Full name must be at least 2 characters').max(120),
  phone: z.string().trim().regex(/^[0-9+() -]{7,20}$/, 'Valid phone number is required'),
  email: z.string().trim().email('Valid email address is required').max(191),
  companyName: z.string().trim().max(191).optional().nullable(),
  location: z.string().trim().min(2, 'Location or site address is required').max(191),
  enquiryType: z.enum([
    'New Lift Installation',
    'Product Enquiry',
    'Maintenance',
    'Repair',
    'Business Partnership',
    'General Enquiry'
  ]),
  productServiceInterest: z.string().trim().min(2, 'Please select or state product/service of interest').max(191),
  preferredDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Valid preferred appointment date is required',
  }),
  preferredTime: z.string().trim().min(2, 'Preferred time slot is required').max(50),
  projectDescription: z.string().trim().min(10, 'Please provide at least a brief description (10+ chars) of your requirements').max(3000),
  additionalMessage: z.string().trim().max(2000).optional().nullable(),
  // Honeypot field for bot spam detection
  hp_company_url: z.string().optional().nullable(),
});

function generateReferenceNumber(): string {
  const dateStr = new Date().toISOString().slice(2, 7).replace('-', '');
  const randomPart = Math.floor(1000 + Math.random() * 9000);
  return `HYD-${dateStr}-${randomPart}`;
}

// 1. Submit consultation enquiry (Public)
router.post('/', formSubmissionLimiter, async (req: Request, res: Response) => {
  try {
    const parseResult = enquirySchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed. Please check the entered fields.',
        errors: parseResult.error.flatten().fieldErrors,
      });
    }

    const data = parseResult.data;

    // Check honeypot: bots fill this hidden field
    if (data.hp_company_url && data.hp_company_url.trim().length > 0) {
      // Fake success for bots to discourage retry
      return res.status(201).json({
        success: true,
        referenceNo: 'HYD-BOT-PROCESSED',
        message: 'Your consultation request has been submitted successfully.',
      });
    }

    const referenceNo = generateReferenceNumber();

    const [insertResult]: any = await pool.query(
      `INSERT INTO enquiries (
        reference_no, full_name, phone, email, company_name, location,
        enquiry_type, product_service_interest, preferred_date, preferred_time,
        project_description, additional_message, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'PENDING')`,
      [
        referenceNo,
        data.fullName,
        data.phone,
        data.email,
        data.companyName || null,
        data.location,
        data.enquiryType,
        data.productServiceInterest,
        data.preferredDate,
        data.preferredTime,
        data.projectDescription,
        data.additionalMessage || null,
      ]
    );

    const enquiryId = insertResult.insertId;

    // Create corresponding appointment request record
    await pool.query(
      `INSERT INTO appointments (enquiry_id, scheduled_date, scheduled_time, status, notes)
       VALUES (?, ?, ?, 'SCHEDULED', 'Customer requested appointment via web portal. Pending admin confirmation.')`,
      [enquiryId, data.preferredDate, data.preferredTime]
    );

    // Trigger email alert to company
    sendEnquiryNotificationEmail({
      reference_no: referenceNo,
      full_name: data.fullName,
      phone: data.phone,
      email: data.email,
      enquiry_type: data.enquiryType,
      product_service_interest: data.productServiceInterest,
      location: data.location,
      preferred_date: data.preferredDate,
      preferred_time: data.preferredTime,
      project_description: data.projectDescription,
    }).catch((err) => console.error('Email trigger err:', err));

    return res.status(201).json({
      success: true,
      referenceNo,
      message: 'Your consultation request has been submitted successfully. Our engineering team will review your appointment request and contact you directly.',
    });
  } catch (error) {
    console.error('Enquiry submission error:', error);
    return res.status(500).json({ success: false, message: 'Failed to process consultation enquiry. Please try again.' });
  }
});

// 2. Track enquiry status (Public - requires Reference ID & matching phone digits to protect customer privacy)
router.post('/track', formSubmissionLimiter, async (req: Request, res: Response) => {
  try {
    const { referenceNo, phone } = req.body;
    if (!referenceNo || !phone) {
      return res.status(400).json({ success: false, message: 'Reference number and phone number are required.' });
    }

    const cleanPhone = phone.replace(/[^0-9]/g, '');
    const [rows]: any = await pool.query(
      `SELECT e.reference_no, e.enquiry_type, e.product_service_interest, e.location,
              e.preferred_date, e.preferred_time, e.status, e.created_at, e.phone,
              a.status as appointment_status, a.scheduled_date, a.scheduled_time
       FROM enquiries e
       LEFT JOIN appointments a ON e.id = a.enquiry_id
       WHERE e.reference_no = ? LIMIT 1`,
      [referenceNo.trim()]
    );

    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'No enquiry found with this reference number.' });
    }

    const enquiry = rows[0];
    const dbPhoneDigits = enquiry.phone.replace(/[^0-9]/g, '');

    // Check last 4 digits match for privacy check
    if (!dbPhoneDigits.endsWith(cleanPhone.slice(-4))) {
      return res.status(403).json({ success: false, message: 'Verification failed. Phone number does not match this record.' });
    }

    return res.json({
      success: true,
      enquiry: {
        referenceNo: enquiry.reference_no,
        enquiryType: enquiry.enquiry_type,
        productServiceInterest: enquiry.product_service_interest,
        location: enquiry.location,
        requestedDate: enquiry.preferred_date,
        requestedTime: enquiry.preferred_time,
        status: enquiry.status,
        createdAt: enquiry.created_at,
        appointmentStatus: enquiry.appointment_status,
        confirmedDate: enquiry.scheduled_date,
        confirmedTime: enquiry.scheduled_time,
      },
    });
  } catch (error) {
    console.error('Track enquiry error:', error);
    return res.status(500).json({ success: false, message: 'Failed to check status.' });
  }
});

// 3. Admin: Get all enquiries with filtering and search
router.get('/', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const { status, type, search, page = '1', limit = '20' } = req.query;
    const pageNum = Math.max(1, parseInt(page as string, 10) || 1);
    const limitNum = Math.min(100, Math.max(1, parseInt(limit as string, 10) || 20));
    const offset = (pageNum - 1) * limitNum;

    const conditions: string[] = [];
    const params: any[] = [];

    if (status && status !== 'ALL') {
      conditions.push('e.status = ?');
      params.push(status);
    }

    if (type && type !== 'ALL') {
      conditions.push('e.enquiry_type = ?');
      params.push(type);
    }

    if (search && (search as string).trim()) {
      const searchTerm = `%${(search as string).trim()}%`;
      conditions.push('(e.reference_no LIKE ? OR e.full_name LIKE ? OR e.phone LIKE ? OR e.email LIKE ? OR e.location LIKE ?)');
      params.push(searchTerm, searchTerm, searchTerm, searchTerm, searchTerm);
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

    const [countResult]: any = await pool.query(
      `SELECT COUNT(*) as total FROM enquiries e ${whereClause}`,
      params
    );
    const total = countResult[0].total;

    const [rows]: any = await pool.query(
      `SELECT e.*, a.id as appointment_id, a.status as appointment_status,
              a.scheduled_date, a.scheduled_time
       FROM enquiries e
       LEFT JOIN appointments a ON e.id = a.enquiry_id
       ${whereClause}
       ORDER BY e.created_at DESC
       LIMIT ? OFFSET ?`,
      [...params, limitNum, offset]
    );

    return res.json({
      success: true,
      enquiries: rows,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum),
      },
    });
  } catch (error) {
    console.error('Fetch enquiries error:', error);
    return res.status(500).json({ success: false, message: 'Failed to fetch enquiries.' });
  }
});

// 4. Admin: Get enquiry details
router.get('/:id', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const [rows]: any = await pool.query(
      `SELECT e.*, a.id as appointment_id, a.status as appointment_status,
              a.scheduled_date, a.scheduled_time, a.notes as appointment_notes,
              a.confirmed_at, adm.username as confirmed_by_name
       FROM enquiries e
       LEFT JOIN appointments a ON e.id = a.enquiry_id
       LEFT JOIN admins adm ON a.confirmed_by = adm.id
       WHERE e.id = ? LIMIT 1`,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Enquiry not found.' });
    }

    return res.json({ success: true, enquiry: rows[0] });
  } catch (error) {
    console.error('Fetch enquiry detail error:', error);
    return res.status(500).json({ success: false, message: 'Failed to fetch enquiry details.' });
  }
});

// 5. Admin: Update enquiry status & internal notes
router.patch('/:id/status', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { status, internal_notes } = req.body;

    const validStatuses = ['PENDING', 'CONTACTED', 'APPOINTMENT_SCHEDULED', 'COMPLETED', 'CANCELLED'];
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status value.' });
    }

    await pool.query(
      `UPDATE enquiries 
       SET status = COALESCE(?, status),
           internal_notes = COALESCE(?, internal_notes)
       WHERE id = ?`,
      [status || null, internal_notes !== undefined ? internal_notes : null, id]
    );

    // Log admin activity
    await pool.query(
      'INSERT INTO admin_activity_logs (admin_id, action, entity_type, entity_id, details, ip_address) VALUES (?, ?, ?, ?, ?, ?)',
      [req.admin!.id, 'UPDATE_STATUS', 'ENQUIRY', Number(id), `Updated enquiry #${id} status to ${status || 'unchanged'}`, req.ip]
    );

    return res.json({ success: true, message: 'Enquiry status updated successfully.' });
  } catch (error) {
    console.error('Update enquiry status error:', error);
    return res.status(500).json({ success: false, message: 'Failed to update enquiry.' });
  }
});

export default router;

