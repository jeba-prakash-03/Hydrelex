import { Router, Response } from 'express';
import pool from '../db/connection.js';
import { requireAuth, AuthRequest } from '../middleware/auth.js';

const router = Router();

// Dashboard Summary Stats
router.get('/stats', requireAuth, async (_req: AuthRequest, res: Response) => {
  try {
    const [enqTotal]: any = await pool.query('SELECT COUNT(*) as count FROM enquiries');
    const [enqPending]: any = await pool.query("SELECT COUNT(*) as count FROM enquiries WHERE status = 'PENDING'");
    const [enqCompleted]: any = await pool.query("SELECT COUNT(*) as count FROM enquiries WHERE status = 'COMPLETED'");
    
    const [apptConfirmed]: any = await pool.query("SELECT COUNT(*) as count FROM appointments WHERE status = 'CONFIRMED'");
    const [apptScheduled]: any = await pool.query("SELECT COUNT(*) as count FROM appointments WHERE status = 'SCHEDULED'");

    const [revApproved]: any = await pool.query("SELECT COUNT(*) as count FROM reviews WHERE status = 'APPROVED'");
    const [revPending]: any = await pool.query("SELECT COUNT(*) as count FROM reviews WHERE status = 'PENDING'");

    const [recentEnquiries]: any = await pool.query(
      `SELECT id, reference_no, full_name, phone, enquiry_type, product_service_interest, status, created_at
       FROM enquiries
       ORDER BY created_at DESC
       LIMIT 6`
    );

    const [recentLogs]: any = await pool.query(
      `SELECT l.*, a.username as admin_username
       FROM admin_activity_logs l
       LEFT JOIN admins a ON l.admin_id = a.id
       ORDER BY l.created_at DESC
       LIMIT 10`
    );

    return res.json({
      success: true,
      stats: {
        totalEnquiries: enqTotal[0].count,
        pendingEnquiries: enqPending[0].count,
        completedEnquiries: enqCompleted[0].count,
        confirmedAppointments: apptConfirmed[0].count,
        pendingAppointments: apptScheduled[0].count,
        approvedReviews: revApproved[0].count,
        pendingReviews: revPending[0].count,
      },
      recentEnquiries,
      recentLogs,
    });
  } catch (error) {
    console.error('Fetch dashboard stats error:', error);
    return res.status(500).json({ success: false, message: 'Failed to load dashboard metrics.' });
  }
});

// Admin activity logs
router.get('/logs', requireAuth, async (_req: AuthRequest, res: Response) => {
  try {
    const [rows]: any = await pool.query(
      `SELECT l.*, a.username as admin_username
       FROM admin_activity_logs l
       LEFT JOIN admins a ON l.admin_id = a.id
       ORDER BY l.created_at DESC
       LIMIT 50`
    );
    return res.json({ success: true, logs: rows });
  } catch (error) {
    console.error('Fetch logs error:', error);
    return res.status(500).json({ success: false, message: 'Failed to retrieve logs.' });
  }
});

export default router;

