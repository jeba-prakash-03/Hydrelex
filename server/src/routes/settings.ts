import { Router, Request, Response } from 'express';
import pool from '../db/connection.js';
import { requireAuth, AuthRequest } from '../middleware/auth.js';

const router = Router();

// 1. Get company settings (Public)
router.get('/', async (_req: Request, res: Response) => {
  try {
    const [rows]: any = await pool.query('SELECT setting_key, setting_value FROM company_settings');
    const settings: Record<string, string> = {};
    for (const row of rows) {
      settings[row.setting_key] = row.setting_value;
    }
    return res.json({ success: true, settings });
  } catch (error) {
    console.error('Fetch settings error:', error);
    return res.status(500).json({ success: false, message: 'Failed to load company settings.' });
  }
});

// 2. Update company settings (Admin)
router.put('/', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const settings = req.body;
    if (!settings || typeof settings !== 'object') {
      return res.status(400).json({ success: false, message: 'Invalid settings payload.' });
    }

    for (const [key, value] of Object.entries(settings)) {
      if (typeof key === 'string' && value !== undefined) {
        await pool.query(
          `INSERT INTO company_settings (setting_key, setting_value)
           VALUES (?, ?)
           ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value)`,
          [key, String(value)]
        );
      }
    }

    await pool.query(
      'INSERT INTO admin_activity_logs (admin_id, action, entity_type, details, ip_address) VALUES (?, ?, ?, ?, ?)',
      [req.admin!.id, 'UPDATE_SETTINGS', 'COMPANY_SETTINGS', 'Updated company profile settings', req.ip]
    );

    return res.json({ success: true, message: 'Settings updated successfully.' });
  } catch (error) {
    console.error('Update settings error:', error);
    return res.status(500).json({ success: false, message: 'Failed to update settings.' });
  }
});

export default router;

