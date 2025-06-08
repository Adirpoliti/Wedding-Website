import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { env } from 'process';
import expressFileUpload from 'express-fileupload';
import { catchAll } from './middleware/catch-all';
import { loggedRequest } from './middleware/log-request';
import passport from './middleware/passportInit';
import authRoutes from './routes/auth';
import PhotoController from "./controllers/photoController";
import photoRoutes from './routes/photoRoutes';

const port = process.env.PORT || 3001;
const server = express();

server.use(express.json());

server.use(cors({
  origin: 'http://localhost:5173',
  methods: '*',
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Authentication'],
  credentials: true,
  exposedHeaders: ['Content-Disposition']
}));

server.use(expressFileUpload());
server.use(loggedRequest);

server.use(passport.initialize());

mongoose.connect(process.env.MONGO_URI!)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

server.use('/auth', authRoutes);
server.use("/api", PhotoController);
server.use('/api', photoRoutes);

server.use(catchAll);

server.listen(Number(port), () => { console.log(`server running on port ${port}`) });