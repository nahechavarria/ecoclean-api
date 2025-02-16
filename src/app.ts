import express from 'express';
import logger from 'morgan';
import { router } from './infrastructure/routes';
import { errorHandler } from './infrastructure/http/middlewares';
import { connectDB } from './infrastructure/database';
import cors from 'cors';
import './config';

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
