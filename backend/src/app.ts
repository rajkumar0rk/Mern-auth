import express from 'express';
import { errorHandler } from '@middlewares/errorHandler.js';
import authRoutes from '@routes/auth.route.js';
import cors from 'cors';

import { APP_ORIGIN } from '@constants/env.js';

const app = express();

app.use(cors({
  origin: APP_ORIGIN,
  credentials: true
}))

app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ states: 'success' });
});

// Routes
app.use("/api/v1/auth", authRoutes)

// Global error handler (should be after routes)
app.use(errorHandler);

export default app;
