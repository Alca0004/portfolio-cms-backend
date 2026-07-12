const cors = require("cors");
const express = require("express");
require("dotenv").config();

const connectDB = require("./src/config/db");
const authRoutes = require("./src/routes/authRoutes");
const projectRoutes = require("./src/routes/projectRoutes");
const userRoutes = require("./src/routes/userRoutes");

const app = express();

connectDB();

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://portfolio-cms-frontend-theta.vercel.app'
  ]
}));

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/user", userRoutes);

app.get("/", (req, res) => {
  res.send("API running");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
