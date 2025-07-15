const User = require('../models/User'); // Adjust the path as needed
const validator = require('validator'); // npm install validator

const register = async (req, res) => {
  const { name, email, password } = req.body;

  // 1. Check for missing fields
  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required." });
  }

  // 2. Validate email format
  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: "Invalid email address." });
  }

  // 3. Validate password strength
  if (password.length < 6) {
    return res.status(400).json({ error: "Password must be at least 6 characters long." });
  }

  try {
    // 4. Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "Email already registered." });
    }

    // 5. Create user
    const newUser = new User({ name, email, password }); // Hashing should be done in User model with pre-save
    await newUser.save();

    res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error. Please try again." });
  }
};

module.exports = { register };
