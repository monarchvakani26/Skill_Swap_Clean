import express from "express";
import bcrypt from "bcryptjs";
import passport from "passport";
import User from "../models/User.js";
import multer from 'multer';
const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    req.login(user, (err) => {
      if (err) return res.status(500).json({ message: "Login after signup failed" });
      return res.status(201).json({ message: "Registered and logged in", user });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login
router.post("/api/auth/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return res.status(500).json({ message: "Something went wrong", error: err });
    if (!user) return res.status(400).json({ message: info.message });

    req.login(user, (err) => {
      if (err) return res.status(500).json({ message: "Login failed", error: err });
      return res.json({ message: "Logged in successfully", user });
    });
  })(req, res, next);
});


router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
// 🟢 Step 2: Google redirects here after auth (the callback)
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: true,
  }),
  (req, res) => {
    // Redirect or send JSON after successful login
    res.redirect("http://localhost:5173/dashboard"); // or send a token, session confirmation
  }
  );


  const ensureAuth = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.status(401).json({ message: "Unauthorized" });
  };
  
// Get current logged-in user
router.get("/me", (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Not logged in" });
  }

  res.json({
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      avatar: req.user.avatar, // optional if you store avatar
      skills: req.user.skills, // optional if you store skills
    },
  });
});
router.put("/users/:id", async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Update failed", error: err.message });
  }
});


const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });


// Update profile (requires user to be logged in)
router.put("/update-profile", upload.single("avatar"), async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { name, bio } = req.body;
  const avatarUrl = req.file ? `/uploads/${req.file.filename}` : req.user.avatar;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        name,
        bio,
        avatar: avatarUrl,
      },
      { new: true }
    );

    res.json({ message: "Profile updated", user: updatedUser });
  } catch (err) {
    console.error("Update Error:", err);
    res.status(500).json({ message: "Failed to update profile" });
  }
});


// Logout
router.post("/logout", (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ message: "Logout failed" });
    res.clearCookie("connect.sid");
    res.json({ message: "Logged out successfully" });
  });
});

export default router;
