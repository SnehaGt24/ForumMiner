const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Test Route
router.get("/", (req, res) => {
  res.send("Auth Route Working");
});

// Register
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

     // Validation
    if (!username || !email || !password) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

const usernameRegex = /^[A-Za-z0-9_]{3,20}$/;

if (!usernameRegex.test(username)) {
  return res.status(400).json({
    message:
      "Username must be 3-20 characters and contain only letters, numbers, and underscore."
  });
}

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.com$/;

if (!emailRegex.test(email)) {
  return res.status(400).json({
    message: "Please enter a valid email address."
  });
}

const passwordRegex =
/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#]).{8,}$/;

if (!passwordRegex.test(password)) {
  return res.status(400).json({
    message:
      "Password must be at least 8 characters and contain uppercase, lowercase, number and special character."
  });
}

    // Check if user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = new User({
      username,
      email,
      password: hashedPassword
    });

    await user.save();

    res.status(201).json({
      message: "User registered successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

      // Validation
    if (!email || !password) {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.com$/;

if (!emailRegex.test(email)) {
  return res.status(400).json({
    message: "Please enter a valid .com email address."
  });
}
      return res.status(400).json({
        message: "Email and password are required"
      });
    }
    // Check user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials"
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials"
      });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
  message: "Login successful",
  token,
  user: {
    _id: user._id,
    username: user.username,
    email: user.email,
  },
});

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

// Protected Profile Route
router.get("/profile", authMiddleware, (req, res) => {
  res.json({
    message: "Protected Route Accessed",
    user: req.user
  });
});

module.exports = router;