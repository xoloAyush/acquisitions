import express from 'express';
// import logger from './config/logger.js';
// relative import system

import logger from '#config/logger.js';
// absolute import system

import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
// popular HTTP request logger middleware for Node.js

import authRoutes from './routes/auth.routes.js';
import securityMiddleware from './middleware/security.middleware.js';
// import { timestamp } from 'drizzle-orm/gel-core';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookieParser());

app.use(morgan('combined', {stream: {write:(message) => logger.info(message.trim())}}));

app.use(securityMiddleware);

app.get('/', (req, res) => {
  logger.info('Hello from Acquisitions!');
  // logger.info('Server started');
  // logger.warn('Low disk space');
  // logger.error('Database connection failed');

  res.status(200).send('Hello from Acquisitions!');
});

app.get('/health', (req,res)=>{
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

app.get('/api',(req,res)=>{
  res.status(200).json({message: 'Acquisitions API is running!'});
});

app.use('/api/auth', authRoutes);

export default app;

// npm install eslint @eslint/js prettier eslint-config-prettier eslint-plugin-prettier globals -D

// npm run lint
// npm run lint:fix
// npm run format
// npm run format:check
