import { Router, Request, Response } from 'express';
import { z } from 'zod';
import pool from '../db/connection.js';
import { requireAuth, AuthRequest } from '../middleware/auth.js';

const router = Router();

const productSchema = z.object({
  title: z.string().trim().min(2).max(191),
  slug: z.string().trim().min(2).max(191),
  category: z.string().trim().min(2).max(100),
  shortDescription: z.string().trim().min(5).max(255),
  description: z.string().trim().min(10),
  capacity: z.string().trim().max(100).optional().nullable(),
  speed: z.string().trim().max(100).optional().nullable(),
  driveSystem: z.string().trim().max(100).optional().nullable(),
  features: z.array(z.string()).optional().default([]),
  imageUrl: z.string().trim().min(5).max(500),
  isActive: z.boolean().optional().default(true),
  displayOrder: z.number().int().optional().default(0),
});

// 1. Get products (Public active, or admin with all)
router.get('/', async (req: Request, res: Response) => {
  try {
    const { includeInactive } = req.query;
    let query = 'SELECT * FROM products';
    if (includeInactive !== 'true') {
      query += ' WHERE is_active = TRUE';
    }
    query += ' ORDER BY display_order ASC, id ASC';

    const [rows]: any = await pool.query(query);
    const parsedRows = rows.map((p: any) => ({
      ...p,
      features: typeof p.features === 'string' ? JSON.parse(p.features) : (p.features || []),
    }));

    return res.json({ success: true, products: parsedRows });
  } catch (error) {
    console.error('Fetch products error:', error);
    return res.status(500).json({ success: false, message: 'Failed to load products.' });
  }
});

// 2. Get single product by ID or slug
router.get('/:slugOrId', async (req: Request, res: Response) => {
  try {
    const slugOrId = String(req.params.slugOrId);
    const isNumeric = /^\d+$/.test(slugOrId);

    const query = isNumeric
      ? 'SELECT * FROM products WHERE id = ? LIMIT 1'
      : 'SELECT * FROM products WHERE slug = ? LIMIT 1';

    const [rows]: any = await pool.query(query, [slugOrId]);
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Product not found.' });
    }

    const product = rows[0];
    product.features = typeof product.features === 'string' ? JSON.parse(product.features) : (product.features || []);

    return res.json({ success: true, product });
  } catch (error) {
    console.error('Fetch product detail error:', error);
    return res.status(500).json({ success: false, message: 'Failed to load product.' });
  }
});

// 3. Create product (Admin)
router.post('/', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const parseResult = productSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({ success: false, errors: parseResult.error.flatten().fieldErrors });
    }

    const p = parseResult.data;
    const [result]: any = await pool.query(
      `INSERT INTO products (
        title, slug, category, short_description, description,
        capacity, speed, drive_system, features, image_url, is_active, display_order
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        p.title,
        p.slug,
        p.category,
        p.shortDescription,
        p.description,
        p.capacity || null,
        p.speed || null,
        p.driveSystem || null,
        JSON.stringify(p.features),
        p.imageUrl,
        p.isActive,
        p.displayOrder,
      ]
    );

    await pool.query(
      'INSERT INTO admin_activity_logs (admin_id, action, entity_type, entity_id, details, ip_address) VALUES (?, ?, ?, ?, ?, ?)',
      [req.admin!.id, 'CREATE_PRODUCT', 'PRODUCT', result.insertId, `Created product "${p.title}"`, req.ip]
    );

    return res.status(201).json({ success: true, message: 'Product created successfully', id: result.insertId });
  } catch (error: any) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ success: false, message: 'A product with this slug already exists.' });
    }
    console.error('Create product error:', error);
    return res.status(500).json({ success: false, message: 'Failed to create product.' });
  }
});

// 4. Update product (Admin)
router.put('/:id', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const parseResult = productSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({ success: false, errors: parseResult.error.flatten().fieldErrors });
    }

    const p = parseResult.data;
    await pool.query(
      `UPDATE products SET
        title = ?, slug = ?, category = ?, short_description = ?, description = ?,
        capacity = ?, speed = ?, drive_system = ?, features = ?, image_url = ?,
        is_active = ?, display_order = ?
       WHERE id = ?`,
      [
        p.title,
        p.slug,
        p.category,
        p.shortDescription,
        p.description,
        p.capacity || null,
        p.speed || null,
        p.driveSystem || null,
        JSON.stringify(p.features),
        p.imageUrl,
        p.isActive,
        p.displayOrder,
        id,
      ]
    );

    await pool.query(
      'INSERT INTO admin_activity_logs (admin_id, action, entity_type, entity_id, details, ip_address) VALUES (?, ?, ?, ?, ?, ?)',
      [req.admin!.id, 'UPDATE_PRODUCT', 'PRODUCT', Number(id), `Updated product "${p.title}"`, req.ip]
    );

    return res.json({ success: true, message: 'Product updated successfully.' });
  } catch (error) {
    console.error('Update product error:', error);
    return res.status(500).json({ success: false, message: 'Failed to update product.' });
  }
});

// 5. Delete product (Admin)
router.delete('/:id', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM products WHERE id = ?', [id]);

    await pool.query(
      'INSERT INTO admin_activity_logs (admin_id, action, entity_type, entity_id, details, ip_address) VALUES (?, ?, ?, ?, ?, ?)',
      [req.admin!.id, 'DELETE_PRODUCT', 'PRODUCT', Number(id), `Deleted product #${id}`, req.ip]
    );

    return res.json({ success: true, message: 'Product deleted.' });
  } catch (error) {
    console.error('Delete product error:', error);
    return res.status(500).json({ success: false, message: 'Failed to delete product.' });
  }
});

export default router;
