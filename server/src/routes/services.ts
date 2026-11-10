import { Router, Request, Response } from 'express';
import { z } from 'zod';
import pool from '../db/connection.js';
import { requireAuth, AuthRequest } from '../middleware/auth.js';

const router = Router();

const serviceSchema = z.object({
  title: z.string().trim().min(2).max(191),
  slug: z.string().trim().min(2).max(191),
  shortDescription: z.string().trim().min(5).max(255),
  description: z.string().trim().min(10),
  features: z.array(z.string()).optional().default([]),
  iconName: z.string().trim().default('Wrench'),
  imageUrl: z.string().trim().max(500).optional().nullable(),
  isActive: z.boolean().optional().default(true),
  displayOrder: z.number().int().optional().default(0),
});

// 1. Get services
router.get('/', async (req: Request, res: Response) => {
  try {
    const { includeInactive } = req.query;
    let query = 'SELECT * FROM services';
    if (includeInactive !== 'true') {
      query += ' WHERE is_active = TRUE';
    }
    query += ' ORDER BY display_order ASC, id ASC';

    const [rows]: any = await pool.query(query);
    const parsedRows = rows.map((s: any) => ({
      ...s,
      features: typeof s.features === 'string' ? JSON.parse(s.features) : (s.features || []),
    }));

    return res.json({ success: true, services: parsedRows });
  } catch (error) {
    console.error('Fetch services error:', error);
    return res.status(500).json({ success: false, message: 'Failed to load services.' });
  }
});

// 2. Get single service
router.get('/:slugOrId', async (req: Request, res: Response) => {
  try {
    const slugOrId = String(req.params.slugOrId);
    const isNumeric = /^\d+$/.test(slugOrId);

    const query = isNumeric
      ? 'SELECT * FROM services WHERE id = ? LIMIT 1'
      : 'SELECT * FROM services WHERE slug = ? LIMIT 1';

    const [rows]: any = await pool.query(query, [slugOrId]);
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Service not found.' });
    }

    const service = rows[0];
    service.features = typeof service.features === 'string' ? JSON.parse(service.features) : (service.features || []);

    return res.json({ success: true, service });
  } catch (error) {
    console.error('Fetch service detail error:', error);
    return res.status(500).json({ success: false, message: 'Failed to load service.' });
  }
});

// 3. Create service (Admin)
router.post('/', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const parseResult = serviceSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({ success: false, errors: parseResult.error.flatten().fieldErrors });
    }

    const s = parseResult.data;
    const [result]: any = await pool.query(
      `INSERT INTO services (
        title, slug, short_description, description, features, icon_name, image_url, is_active, display_order
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        s.title,
        s.slug,
        s.shortDescription,
        s.description,
        JSON.stringify(s.features),
        s.iconName,
        s.imageUrl || null,
        s.isActive,
        s.displayOrder,
      ]
    );

    await pool.query(
      'INSERT INTO admin_activity_logs (admin_id, action, entity_type, entity_id, details, ip_address) VALUES (?, ?, ?, ?, ?, ?)',
      [req.admin!.id, 'CREATE_SERVICE', 'SERVICE', result.insertId, `Created service "${s.title}"`, req.ip]
    );

    return res.status(201).json({ success: true, message: 'Service created successfully', id: result.insertId });
  } catch (error: any) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ success: false, message: 'A service with this slug already exists.' });
    }
    console.error('Create service error:', error);
    return res.status(500).json({ success: false, message: 'Failed to create service.' });
  }
});

// 4. Update service (Admin)
router.put('/:id', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const parseResult = serviceSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({ success: false, errors: parseResult.error.flatten().fieldErrors });
    }

    const s = parseResult.data;
    await pool.query(
      `UPDATE services SET
        title = ?, slug = ?, short_description = ?, description = ?,
        features = ?, icon_name = ?, image_url = ?, is_active = ?, display_order = ?
       WHERE id = ?`,
      [
        s.title,
        s.slug,
        s.shortDescription,
        s.description,
        JSON.stringify(s.features),
        s.iconName,
        s.imageUrl || null,
        s.isActive,
        s.displayOrder,
        id,
      ]
    );

    await pool.query(
      'INSERT INTO admin_activity_logs (admin_id, action, entity_type, entity_id, details, ip_address) VALUES (?, ?, ?, ?, ?, ?)',
      [req.admin!.id, 'UPDATE_SERVICE', 'SERVICE', Number(id), `Updated service "${s.title}"`, req.ip]
    );

    return res.json({ success: true, message: 'Service updated successfully.' });
  } catch (error) {
    console.error('Update service error:', error);
    return res.status(500).json({ success: false, message: 'Failed to update service.' });
  }
});

// 5. Delete service (Admin)
router.delete('/:id', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM services WHERE id = ?', [id]);

    await pool.query(
      'INSERT INTO admin_activity_logs (admin_id, action, entity_type, entity_id, details, ip_address) VALUES (?, ?, ?, ?, ?, ?)',
      [req.admin!.id, 'DELETE_SERVICE', 'SERVICE', Number(id), `Deleted service #${id}`, req.ip]
    );

    return res.json({ success: true, message: 'Service deleted.' });
  } catch (error) {
    console.error('Delete service error:', error);
    return res.status(500).json({ success: false, message: 'Failed to delete service.' });
  }
});

export default router;
