import express from 'express';
import logger from 'morgan';
import router from './infrastructure/adapters/web/routes';
import { errorHandler } from './infrastructure/middleware/errorHandle';
import { connectDB } from "./infrastructure/config/database";
import cors from 'cors';

// Initializations
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger('combined'));

// app.use('/uploads', express.static('uploads'));
// app.use(express.static('public'));

// Routes
app.use('/api', router);

// Error handlers
app.use(errorHandler);

// Connect to database
connectDB();

export default app;