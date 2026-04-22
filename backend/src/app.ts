import express from 'express';
import errorHandler from '@middlewares/errorHandler.js';
import authRoutes from '@routes/auth.route.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { APP_ORIGIN } from '@constants/env.js';
import userRouter from '@routes/user.route.js';
import { authenticate } from '@middlewares/authenticate.js';
import sessionRouter from '@routes/session.route.js';

const app = express();

app.use(
  cors({
    origin: APP_ORIGIN,
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ states: 'success' });
});

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', authenticate, userRouter);
app.use('/api/v1/session', authenticate, sessionRouter);

// Global error handler (should be after routes)
app.use(errorHandler);

export default app;
