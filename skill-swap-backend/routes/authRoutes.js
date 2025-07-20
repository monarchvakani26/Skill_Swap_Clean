import express from "express";
import bcrypt from "bcryptjs";
import passport from "passport";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import multer from 'multer';

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || '99d6e10c4ea8c33c77cba5952cff99b5490cda2b8103680be73b333442303d85';

// --- Local Authentication Routes ---

// POST /register - This will be accessible at /api/auth/register
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    // Automatically log in the user after registration
    req.login(user, (err) => {
      if (err) {
        console.error("Login after signup failed:", err);
        return res.status(500).json({ message: "Login after signup failed" });
      }
      // If using JWT for client-side authentication, generate and send token
      const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1d' });
      return res.status(201).json({ message: "Registered and logged in", user: { id: user._id, name: user.name, email: user.email }, token });
    });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ error: error.message || "Server error during registration" });
  }
});

// POST /login (Using Passport.js local strategy) - This will be accessible at /api/auth/login
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error("Passport authentication error:", err);
      return res.status(500).json({ message: "Something went wrong during authentication", error: err.message });
    }
    if (!user) {
      return res.status(400).json({ message: info.message || "Invalid email or password" });
    }

    req.login(user, (err) => {
      if (err) {
        console.error("Login failed after authentication:", err);
        return res.status(500).json({ message: "Login failed", error: err.message });
      }
      // If using JWT for client-side authentication, generate and send token
      const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1d' });
      return res.json({ message: "Logged in successfully", user: { id: user._id, name: user.name, email: user.email }, token });
    });
  })(req, res, next);
});

// --- OAuth Routes (Google) ---

// GET /google - This will be accessible at /api/auth/google
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// 🟢 Google redirects here after auth (the callback) - This will be accessible at /api/auth/google/callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login", // Redirect to login on failure
    session: true, // Maintain session (Passport.js usually handles this)
  }),
  (req, res) => {
    // Redirect to your frontend dashboard after successful Google login
    // Use process.env.FRONTEND_URL for dynamic redirection in production
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173"; // Fallback for local development
    res.redirect(`${frontendUrl}/dashboard`);
  }
);

// --- User Management Routes ---

// Middleware to ensure user is authenticated for protected routes
const ensureAuth = (req, res, next) => {
  console.log("ensureAuth: Checking authentication status...");
  console.log("req.isAuthenticated():", req.isAuthenticated());
  console.log("req.user:", req.user); // Check if req.user is populated

  if (req.isAuthenticated()) {
    console.log("ensureAuth: User is authenticated, proceeding.");
    return next();
  }
  console.log("ensureAuth: User is NOT authenticated, sending 401.");
  res.status(401).json({ message: "Unauthorized: Please log in" });
};

// GET /me - Get current logged-in user - This will be accessible at /api/auth/me
router.get("/me", ensureAuth, (req, res) => {
  console.log("GET /api/auth/me: Route reached.");
  res.json({
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      avatar: req.user.avatar,
      skills: req.user.skills,
    },
  });
});

// PUT /users/:id - This will be accessible at /api/auth/users/:id
router.put("/users/:id", ensureAuth, async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    console.error("User update failed:", err);
    res.status(500).json({ message: "User update failed", error: err.message });
  }
});

// Multer storage configuration for file uploads
const storage = multer.diskStorage({
  destination: "uploads/", // Ensure this directory exists and is accessible
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

// PUT /update-profile (requires user to be logged in and handles avatar upload) - This will be accessible at /api/auth/update-profile
router.put("/update-profile", ensureAuth, upload.single("avatar"), async (req, res) => {
  const { name, bio } = req.body;
  const avatarUrl = req.file ? `/uploads/${req.file.filename}` : req.user.avatar; // Use existing avatar if no new file

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id, // Use req.user._id from the authenticated user
      {
        name,
        bio,
        avatar: avatarUrl,
      },
      { new: true }
    );

    res.json({ message: "Profile updated", user: updatedUser });
  } catch (err) {
    console.error("Profile Update Error:", err);
    res.status(500).json({ message: "Failed to update profile", error: err.message });
  }
});

// POST /logout - This will be accessible at /api/auth/logout
router.post("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error("Logout failed:", err);
      return res.status(500).json({ message: "Logout failed", error: err.message });
    }
    // Clear the session cookie
    res.clearCookie("connect.sid");
    res.json({ message: "Logged out successfully" });
  });
});

export default router;
