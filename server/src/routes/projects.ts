import { Router, Request, Response } from 'express';
import { z } from 'zod';
import pool from '../db/connection.js';
import { requireAuth, AuthRequest } from '../middleware/auth.js';

const router = Router();

const projectSchema = z.object({
  title: z.string().trim().min(2).max(191),
  category: z.string().trim().min(2).max(100),
  location: z.string().trim().min(2).max(191),
  specifications: z.string().trim().max(255).optional().nullable(),
  description: z.string().trim().min(10),
  coverImage: z.string().trim().min(5).max(500),
  isSample: z.boolean().optional().default(false),
  displayOrder: z.number().int().optional().default(0),
});

// 1. Get all projects
router.get('/', async (req: Request, res: Response) => {
  try {
    const { category } = req.query;
    let query = 'SELECT * FROM projects';
    const params: any[] = [];

    if (category && category !== 'ALL') {
      query += ' WHERE category = ?';
      params.push(category);
    }
    query += ' ORDER BY display_order ASC, id DESC';

    const [rows]: any = await pool.query(query, params);
    return res.json({ success: true, projects: rows });
  } catch (error) {
    console.error('Fetch projects error:', error);
    return res.status(500).json({ success: false, message: 'Failed to load projects.' });
  }
});

// 2. Create project (Admin)
router.post('/', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const parseResult = projectSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({ success: false, errors: parseResult.error.flatten().fieldErrors });
    }

    const p = parseResult.data;
    const [result]: any = await pool.query(
      `INSERT INTO projects (
        title, category, location, specifications, description, cover_image, is_sample, display_order
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [p.title, p.category, p.location, p.specifications || null, p.description, p.coverImage, p.isSample, p.displayOrder]
    );

    await pool.query(
      'INSERT INTO admin_activity_logs (admin_id, action, entity_type, entity_id, details, ip_address) VALUES (?, ?, ?, ?, ?, ?)',
      [req.admin!.id, 'CREATE_PROJECT', 'PROJECT', result.insertId, `Created project "${p.title}"`, req.ip]
    );

    return res.status(201).json({ success: true, message: 'Project created successfully', id: result.insertId });
  } catch (error) {
    console.error('Create project error:', error);
    return res.status(500).json({ success: false, message: 'Failed to create project.' });
  }
});

// 3. Update project (Admin)
router.put('/:id', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const parseResult = projectSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({ success: false, errors: parseResult.error.flatten().fieldErrors });
    }

    const p = parseResult.data;
    await pool.query(
      `UPDATE projects SET
        title = ?, category = ?, location = ?, specifications = ?,
        description = ?, cover_image = ?, is_sample = ?, display_order = ?
       WHERE id = ?`,
      [p.title, p.category, p.location, p.specifications || null, p.description, p.coverImage, p.isSample, p.displayOrder, id]
    );

    await pool.query(
      'INSERT INTO admin_activity_logs (admin_id, action, entity_type, entity_id, details, ip_address) VALUES (?, ?, ?, ?, ?, ?)',
      [req.admin!.id, 'UPDATE_PROJECT', 'PROJECT', Number(id), `Updated project "${p.title}"`, req.ip]
    );

    return res.json({ success: true, message: 'Project updated successfully.' });
  } catch (error) {
    console.error('Update project error:', error);
    return res.status(500).json({ success: false, message: 'Failed to update project.' });
  }
});

// 4. Delete project (Admin)
router.delete('/:id', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM projects WHERE id = ?', [id]);

    await pool.query(
      'INSERT INTO admin_activity_logs (admin_id, action, entity_type, entity_id, details, ip_address) VALUES (?, ?, ?, ?, ?, ?)',
      [req.admin!.id, 'DELETE_PROJECT', 'PROJECT', Number(id), `Deleted project #${id}`, req.ip]
    );

    return res.json({ success: true, message: 'Project deleted.' });
  } catch (error) {
    console.error('Delete project error:', error);
    return res.status(500).json({ success: false, message: 'Failed to delete project.' });
  }
});

export default router;

