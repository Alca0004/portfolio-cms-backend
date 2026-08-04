const express = require("express");
const { updateProfile, getProfile } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

//Protected Route

router.put("/profile", protect, updateProfile);
router.get("/profile", getProfile);

module.exports = router;
