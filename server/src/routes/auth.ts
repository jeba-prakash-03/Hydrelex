import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import pool from '../db/connection.js';
import { requireAuth, AuthRequest } from '../middleware/auth.js';
import { loginLimiter } from '../middleware/rateLimiter.js';

const router = Router();

const loginSchema = z.object({
  identifier: z.string().min(1, 'Email or username is required'),
  password: z.string().min(1, 'Password is required'),
});

router.post('/login', loginLimiter, async (req: Request, res: Response) => {
  try {
    const parseResult = loginSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({ success: false, errors: parseResult.error.flatten().fieldErrors });
    }

    const { identifier, password } = parseResult.data;

    const [rows]: any = await pool.query(
      'SELECT id, username, email, password_hash, role FROM admins WHERE email = ? OR username = ? LIMIT 1',
      [identifier, identifier]
    );

    if (rows.length === 0) {
      return res.status(401).json({ success: false, message: 'Invalid credentials provided.' });
    }

    const admin = rows[0];
    const passwordMatch = await bcrypt.compare(password, admin.password_hash);

    if (!passwordMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials provided.' });
    }

    const secret = process.env.JWT_SECRET || 'hydrelex_jwt_super_secret_key_2026_vertical_mobility';
    const token = jwt.sign(
      {
        id: admin.id,
        username: admin.username,
        email: admin.email,
        role: admin.role,
      },
      secret,
      { expiresIn: '7d' }
    );

    // Log admin activity
    try {
      await pool.query(
        'INSERT INTO admin_activity_logs (admin_id, action, entity_type, details, ip_address) VALUES (?, ?, ?, ?, ?)',
        [admin.id, 'LOGIN', 'AUTH', 'Admin logged in successfully', req.ip]
      );
    } catch (e) {
      // non-fatal
    }

    return res.json({
      success: true,
      message: 'Login successful',
      token,
      admin: {
        id: admin.id,
        username: admin.username,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error during authentication.' });
  }
});

router.get('/me', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const [rows]: any = await pool.query(
      'SELECT id, username, email, role, created_at FROM admins WHERE id = ? LIMIT 1',
      [req.admin!.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Admin user not found.' });
    }

    return res.json({
      success: true,
      admin: rows[0],
    });
  } catch (error) {
    console.error('Auth check error:', error);
    return res.status(500).json({ success: false, message: 'Failed to verify session.' });
  }
});

router.post('/logout', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    await pool.query(
      'INSERT INTO admin_activity_logs (admin_id, action, entity_type, details, ip_address) VALUES (?, ?, ?, ?, ?)',
      [req.admin!.id, 'LOGOUT', 'AUTH', 'Admin logged out', req.ip]
    );
    return res.json({ success: true, message: 'Logged out successfully.' });
  } catch (error) {
    return res.json({ success: true, message: 'Logged out.' });
  }
});

export default router;

