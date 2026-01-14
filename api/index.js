// Vercel Serverless Function Entry Point
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from '../server/config/database.js';

// Import routes
import authRoutes from '../server/routes/authRoutes.js';
import profileRoutes from '../server/routes/profileRoutes.js';
import serviceRoutes from '../server/routes/serviceRoutes.js';
import blogRoutes from '../server/routes/blogRoutes.js';
import storyRoutes from '../server/routes/storyRoutes.js';
import pricingRoutes from '../server/routes/pricingRoutes.js';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Connect to MongoDB (with connection pooling for serverless)
let isConnected = false;

async function ensureDbConnection() {
  if (isConnected) {
    return;
  }
  await connectDB();
  isConnected = true;
}

// Middleware
const deploymentHost = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : undefined;

const envAllowed = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',').map(o => o.trim()).filter(Boolean)
  : [];

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'https://lagnasohala.vercel.app',
  'https://lagn-sohala-demo.vercel.app',
  deploymentHost,
  ...envAllowed,
].filter(Boolean);

const corsOptions = {
  origin: (origin, callback) => {
    // Allow non-browser requests or same-origin
    if (!origin) return callback(null, true);

    const isAllowed =
      allowedOrigins.includes(origin) ||
      /\.vercel\.app$/.test(origin) ||
      /localhost(:\d+)?$/.test(origin);

    return isAllowed
      ? callback(null, true)
      : callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/stories', storyRoutes);
app.use('/api/pricing', pricingRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

// Export for Vercel serverless
export default async function handler(req, res) {
  // Ensure database connection
  await ensureDbConnection();
  
  // Let Express handle the request
  return app(req, res);
}
