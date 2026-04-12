const express = require("express");
require("dotenv").config();

const connectDB = require("./src/config/db");
const authRoutes = require("./src/routes/authRoutes");
const { protect } = require("./src/middleware/authMiddleware");

const app = express();

connectDB();

app.use(express.json());
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("API running");
});

// Temporary test route 👇
app.get("/api/test-protected", protect, (req, res) => {
  res.json({ message: "You are authorized!", user: req.user });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
