const User = require("../models/User");
const bcrypt = require("bcryptjs");

const registerUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: "Please provide email and password",
    });
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({
      message: "User already exists",
    });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await User.create({
    email,
    password: hashedPassword,
  });
  res.status(201).json({
    message: "User registered successfully",
    user: {
      email: user.email,
    },
  });
};

module.exports = {
  registerUser,
};
