import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import expressFileUpload from 'express-fileupload';
import { catchAll } from './middleware/catch-all';
import { loggedRequest } from './middleware/log-request';
import passport from './middleware/passportInit';
import mongoose from 'mongoose';
import authRoutes from './routes/auth';
import PhotoController from "./controllers/photoController";
import { env } from 'process';

const port = env.port;
const server = express();

server.use(express.json());

server.use(cors({
  origin: '*',
  methods: '*',
  allowedHeaders: '*',
  credentials: true,
}));

server.use(expressFileUpload());
server.use(loggedRequest);

server.use(passport.initialize());

mongoose.connect(process.env.MONGO_URI!)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

server.use('/auth', authRoutes);
server.use("/api", PhotoController);

server.use(catchAll);

server.listen(port, () => console.log(`server running on port ${port}`));
