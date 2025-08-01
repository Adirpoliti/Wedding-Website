import dotenv from "dotenv";
dotenv.config();


import path from "path";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { env } from "process";
import expressFileUpload from "express-fileupload";
import { catchAll } from "./middleware/catch-all";
import passport from "./middleware/passportInit";
import authRoutes from "./routes/auth";
import PhotoController from "./controllers/photoController";
import photoRoutes from "./routes/photoRoutes";

const port = process.env.PORT || 3001;
const server = express();

server.use(express.json({ limit: '200mb' }));
server.use(express.urlencoded({ extended: true, limit: '200mb' }));
server.use(expressFileUpload({
  parseNested: true,
  limits: { fileSize: 200 * 1024 * 1024 } 
}));

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost",
  "http://192.168.1.13",
  "https://wedding-frontend-f6rv.onrender.com",
];


server.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: "*",
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    exposedHeaders: ["Content-Disposition"],
  })
);


server.use(passport.initialize());

mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));

server.use('/uploads', express.static(path.join(__dirname, 'uploads')));

server.use("/auth", authRoutes);
server.use("/api", PhotoController);
server.use("/api", photoRoutes);

server.use(catchAll);

server.listen(Number(port), () => {
  console.log(`server running on port ${port}`);
});
