import { Router, Request, Response } from 'express';
import { z } from 'zod';
import pool from '../db/connection.js';
import { requireAuth, AuthRequest } from '../middleware/auth.js';
import { formSubmissionLimiter } from '../middleware/rateLimiter.js';

const router = Router();

const reviewSchema = z.object({
  customerName: z.string().trim().min(2, 'Name must be at least 2 characters').max(120),
  email: z.string().trim().email('Invalid email format').max(191).optional().or(z.literal('')),
  phone: z.string().trim().max(25).optional().or(z.literal('')),
  rating: z.number().int().min(1, 'Rating must be between 1 and 5').max(5),
  title: z.string().trim().min(3, 'Review title must be at least 3 characters').max(191),
  description: z.string().trim().min(10, 'Review description must be at least 10 characters').max(2000),
  imageUrl: z.string().trim().max(500).optional().or(z.literal('')),
  hp_website: z.string().optional().or(z.literal('')),
});

// 1. Public: Submit a review
router.post('/', formSubmissionLimiter, async (req: Request, res: Response) => {
  try {
    const parseResult = reviewSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed. Please verify your input.',
        errors: parseResult.error.flatten().fieldErrors,
      });
    }

    const data = parseResult.data;

    // Honeypot check
    if (data.hp_website && data.hp_website.trim().length > 0) {
      return res.status(201).json({
        success: true,
        message: 'Thank you for your review. It will appear publicly after moderation.',
      });
    }

    await pool.query(
      `INSERT INTO reviews (
        customer_name, email, phone, rating, title, description, image_url, status, ip_address
      ) VALUES (?, ?, ?, ?, ?, ?, ?, 'PENDING', ?)`,
      [
        data.customerName,
        data.email || null,
        data.phone || null,
        data.rating,
        data.title,
        data.description,
        data.imageUrl || null,
        req.ip,
      ]
    );

    return res.status(201).json({
      success: true,
      message: 'Thank you for your valuable feedback! Your review has been submitted and will be displayed once verified by our quality assurance team.',
    });
  } catch (error) {
    console.error('Review submit error:', error);
    return res.status(500).json({ success: false, message: 'Failed to submit review. Please try again later.' });
  }
});

// 2. Public: Get approved reviews and rating stats
router.get('/approved', async (_req: Request, res: Response) => {
  try {
    const [reviews]: any = await pool.query(
      `SELECT id, customer_name, rating, title, description, image_url, created_at
       FROM reviews
       WHERE status = 'APPROVED'
       ORDER BY created_at DESC`
    );

    const [stats]: any = await pool.query(
      `SELECT COUNT(*) as total_reviews,
              COALESCE(AVG(rating), 0) as average_rating
       FROM reviews
       WHERE status = 'APPROVED'`
    );

    const averageRating = Number(Number(stats[0].average_rating).toFixed(1));
    const totalReviews = Number(stats[0].total_reviews);

    return res.json({
      success: true,
      reviews,
      stats: {
        averageRating,
        totalReviews,
      },
    });
  } catch (error) {
    console.error('Fetch approved reviews error:', error);
    return res.status(500).json({ success: false, message: 'Failed to load reviews.' });
  }
});

// 3. Admin: Get all reviews (Pending, Approved, Rejected)
router.get('/admin', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const { status } = req.query;
    let query = 'SELECT * FROM reviews';
    const params: any[] = [];

    if (status && status !== 'ALL') {
      query += ' WHERE status = ?';
      params.push(status);
    }
    query += ' ORDER BY created_at DESC';

    const [rows]: any = await pool.query(query, params);
    return res.json({ success: true, reviews: rows });
  } catch (error) {
    console.error('Fetch admin reviews error:', error);
    return res.status(500).json({ success: false, message: 'Failed to fetch reviews.' });
  }
});

// 4. Admin: Approve review
router.patch('/:id/approve', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    await pool.query("UPDATE reviews SET status = 'APPROVED' WHERE id = ?", [id]);

    await pool.query(
      'INSERT INTO admin_activity_logs (admin_id, action, entity_type, entity_id, details, ip_address) VALUES (?, ?, ?, ?, ?, ?)',
      [req.admin!.id, 'APPROVE_REVIEW', 'REVIEW', Number(id), `Approved customer review #${id}`, req.ip]
    );

    return res.json({ success: true, message: 'Review approved and published to public website.' });
  } catch (error) {
    console.error('Approve review error:', error);
    return res.status(500).json({ success: false, message: 'Failed to approve review.' });
  }
});

// 5. Admin: Reject review
router.patch('/:id/reject', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    await pool.query("UPDATE reviews SET status = 'REJECTED' WHERE id = ?", [id]);

    await pool.query(
      'INSERT INTO admin_activity_logs (admin_id, action, entity_type, entity_id, details, ip_address) VALUES (?, ?, ?, ?, ?, ?)',
      [req.admin!.id, 'REJECT_REVIEW', 'REVIEW', Number(id), `Rejected review #${id}`, req.ip]
    );

    return res.json({ success: true, message: 'Review rejected.' });
  } catch (error) {
    console.error('Reject review error:', error);
    return res.status(500).json({ success: false, message: 'Failed to reject review.' });
  }
});

// 6. Admin: Delete review
router.delete('/:id', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM reviews WHERE id = ?', [id]);

    await pool.query(
      'INSERT INTO admin_activity_logs (admin_id, action, entity_type, entity_id, details, ip_address) VALUES (?, ?, ?, ?, ?, ?)',
      [req.admin!.id, 'DELETE_REVIEW', 'REVIEW', Number(id), `Deleted review #${id}`, req.ip]
    );

    return res.json({ success: true, message: 'Review deleted permanently.' });
  } catch (error) {
    console.error('Delete review error:', error);
    return res.status(500).json({ success: false, message: 'Failed to delete review.' });
  }
});

export default router;

