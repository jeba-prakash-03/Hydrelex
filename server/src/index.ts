import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

import authRoutes from './routes/auth.js';
import enquiryRoutes from './routes/enquiries.js';
import appointmentRoutes from './routes/appointments.js';
import reviewRoutes from './routes/reviews.js';
import productRoutes from './routes/products.js';
import serviceRoutes from './routes/services.js';
import projectRoutes from './routes/projects.js';
import settingRoutes from './routes/settings.js';
import adminRoutes from './routes/admin.js';
import uploadRoutes from './routes/upload.js';
import { apiLimiter } from './middleware/rateLimiter.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Security and CORS
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);

app.use(
  cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173', process.env.FRONTEND_URL || '*'],
    credentials: true,
  })
);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static uploads serving
const uploadsDir = path.resolve(__dirname, '../../uploads');
app.use('/uploads', express.static(uploadsDir));

// Apply general rate limiter to API routes
app.use('/api', apiLimiter);

// Health check
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'online',
    service: 'HYDRELEX LIFT SYSTEMS API',
    timestamp: new Date().toISOString(),
  });
});

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/enquiries', enquiryRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/products', productRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/settings', settingRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/upload', uploadRoutes);

// Global Error Handler
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Unhandled Server Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error occurred.',
  });
});

app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(` HYDRELEX LIFT SYSTEMS SERVER RUNNING`);
  console.log(` Port: ${PORT}`);
  console.log(` Env:  ${process.env.NODE_ENV || 'development'}`);
  console.log(` API:  http://localhost:${PORT}/api/health`);
  console.log(`====================================================`);
});

