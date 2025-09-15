import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import taskRoutes from './routes/taskRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

app.use((err, _req, res, _next) => {
  // Generic error handler
  const status = err.status || 500;
  res.status(status).json({ message: err.message || 'Server error' });
});

export default app;


