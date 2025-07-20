// skill-swap-backend/index.js
import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import authRoutes from "./routes/authRoutes.js";
import Message from "./models/Message.js";
import "./config/passport.js";

dotenv.config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "https://skill-swap-clean.vercel.app", // Your deployed frontend URL
    credentials: true,
  },
});

// Real-time chat handling
io.on("connection", (socket) => {
  console.log("🔌 New user connected:", socket.id);

  socket.on("send-message", (data) => {
    io.emit("receive-message", data);
  });

  socket.on("disconnect", () => {
    console.log("🔌 User disconnected:", socket.id);
  });
});

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: ['https://skill-swap-clean.vercel.app', 'http://localhost:5173'], // Add your local dev URL
  credentials: true,
}));

app.use(session({
  secret: process.env.SESSION_SECRET || "yoursecret", // Use a strong secret from .env
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    collectionName: "sessions",
  }),
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24, // 1 day
    sameSite: "none", // Changed from "lax" to "none" for cross-site cookies
    secure: true // Must be true when sameSite is "none"
  }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use("/uploads", express.static("uploads"));
app.use("/api/auth", authRoutes); // All auth routes are prefixed with /api/auth

const PORT = process.env.PORT || 8080;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
    server.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));
