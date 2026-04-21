const express = require("express");
const { updateProfile } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

//Protected Route

router.put("/profile", protect, updateProfile);

module.exports = router;
