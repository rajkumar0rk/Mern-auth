import express from 'express';
import itemRoutes from '#routes/item.route';
import { errorHandler } from '#middlewares/errorHandler';

const app = express();

app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ states: 'success' });
});

// Routes
app.use('/api/items', itemRoutes);

// Global error handler (should be after routes)
app.use(errorHandler);

export default app;
