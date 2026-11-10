import { Router, Request, Response } from 'express';
import { upload } from '../middleware/upload.js';
import path from 'path';

const router = Router();

router.post('/', upload.single('image'), (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No image file uploaded.' });
    }

    // Relative web URL
    const relativePath = path.relative(path.resolve(__dirname, '../../../uploads'), req.file.path);
    const fileUrl = `/uploads/${relativePath.replace(/\\/g, '/')}`;

    return res.status(201).json({
      success: true,
      url: fileUrl,
      filename: req.file.filename,
      size: req.file.size,
    });
  } catch (error) {
    console.error('File upload error:', error);
    return res.status(500).json({ success: false, message: 'File upload failed.' });
  }
});

export default router;

