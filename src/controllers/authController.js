const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Helper function to generate a JWT token
// Takes the user's ID and signs it with our secret key
// Token expires in 7 days
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// POST /api/auth/register
const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Make sure both fields were sent
    if (!email || !password) {
      return res.status(400).json({ message: "Please provide email and password" });
    }

    // Check if a user with that email already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the user in the database
    const user = await User.create({ email, password: hashedPassword });

    // Respond with the user info and a token
    res.status(201).json({
      message: "User registered successfully",
      token: generateToken(user._id),
      user: { id: user._id, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// POST /api/auth/login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Make sure both fields were sent
    if (!email || !password) {
      return res.status(400).json({ message: "Please provide email and password" });
    }

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare the sent password with the hashed one in the DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Respond with user info and a token
    res.status(200).json({
      message: "Login successful",
      token: generateToken(user._id),
      user: { id: user._id, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { registerUser, loginUser };
