const express = require("express");
require("dotenv").config();

const connectDB = require("./src/config/db");
const authRoutes = require("./src/routes/authRoutes");

const app = express();

connectDB();

app.use(express.json());

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("API running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
