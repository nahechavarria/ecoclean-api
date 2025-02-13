import express from 'express';
import logger from 'morgan';
import router from './infrastructure/adapters/web/routes';
import { connectDB } from "./infrastructure/config/database";
// import { error404Handler, errorHandler } from './middleware';
import cors from 'cors';

// Initializations
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger('combined'));

// app.use('/uploads', express.static('uploads'));
//app.use(express.static('public'));

// Routes
app.use('/api', router);

// Connect to database
connectDB();

// Error handlers
// app.use(error404Handler);
// app.use(errorHandler);

export default app;