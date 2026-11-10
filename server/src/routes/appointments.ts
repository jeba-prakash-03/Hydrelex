import { Router, Response } from 'express';
import pool from '../db/connection.js';
import { requireAuth, AuthRequest } from '../middleware/auth.js';

const router = Router();

// 1. Get all appointments (Admin)
router.get('/', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const { status, date } = req.query;
    const conditions: string[] = [];
    const params: any[] = [];

    if (status && status !== 'ALL') {
      conditions.push('a.status = ?');
      params.push(status);
    }

    if (date) {
      conditions.push('a.scheduled_date = ?');
      params.push(date);
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

    const [rows]: any = await pool.query(
      `SELECT a.*, e.reference_no, e.full_name, e.phone, e.email, e.company_name,
              e.location, e.enquiry_type, e.product_service_interest, adm.username as confirmed_by_name
       FROM appointments a
       JOIN enquiries e ON a.enquiry_id = e.id
       LEFT JOIN admins adm ON a.confirmed_by = adm.id
       ${whereClause}
       ORDER BY a.scheduled_date ASC, a.scheduled_time ASC`,
      params
    );

    return res.json({ success: true, appointments: rows });
  } catch (error) {
    console.error('Fetch appointments error:', error);
    return res.status(500).json({ success: false, message: 'Failed to retrieve appointments.' });
  }
});

// 2. Confirm or reschedule appointment (Admin)
router.patch('/:id/confirm', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { scheduled_date, scheduled_time, notes, status = 'CONFIRMED' } = req.body;

    const [apptRows]: any = await pool.query('SELECT enquiry_id FROM appointments WHERE id = ?', [id]);
    if (apptRows.length === 0) {
      return res.status(404).json({ success: false, message: 'Appointment not found.' });
    }

    await pool.query(
      `UPDATE appointments
       SET scheduled_date = COALESCE(?, scheduled_date),
           scheduled_time = COALESCE(?, scheduled_time),
           status = ?,
           notes = COALESCE(?, notes),
           confirmed_by = ?,
           confirmed_at = NOW()
       WHERE id = ?`,
      [scheduled_date || null, scheduled_time || null, status, notes || null, req.admin!.id, id]
    );

    // Also update parent enquiry status to APPOINTMENT_SCHEDULED if confirmed
    if (status === 'CONFIRMED' || status === 'SCHEDULED') {
      await pool.query(
        "UPDATE enquiries SET status = 'APPOINTMENT_SCHEDULED' WHERE id = ?",
        [apptRows[0].enquiry_id]
      );
    }

    // Log admin activity
    await pool.query(
      'INSERT INTO admin_activity_logs (admin_id, action, entity_type, entity_id, details, ip_address) VALUES (?, ?, ?, ?, ?, ?)',
      [req.admin!.id, 'CONFIRM_APPOINTMENT', 'APPOINTMENT', Number(id), `Confirmed/Updated appointment #${id} to ${status}`, req.ip]
    );

    return res.json({ success: true, message: 'Appointment confirmed and scheduled successfully.' });
  } catch (error) {
    console.error('Confirm appointment error:', error);
    return res.status(500).json({ success: false, message: 'Failed to confirm appointment.' });
  }
});

// 3. Update appointment status (Admin)
router.patch('/:id/status', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

    const validStatuses = ['SCHEDULED', 'CONFIRMED', 'RESCHEDULED', 'COMPLETED', 'CANCELLED'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid appointment status.' });
    }

    await pool.query(
      `UPDATE appointments
       SET status = ?,
           notes = COALESCE(?, notes)
       WHERE id = ?`,
      [status, notes !== undefined ? notes : null, id]
    );

    return res.json({ success: true, message: 'Appointment status updated.' });
  } catch (error) {
    console.error('Update appointment status error:', error);
    return res.status(500).json({ success: false, message: 'Failed to update status.' });
  }
});

export default router;

