const express = require("express");
const { getAllProjects, getProjectById, createProject, updateProject, deleteProject } = require("../controllers/projectController");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

const router = express.Router();

//Public routes
router.get("/", getAllProjects);
router.get("/:id", getProjectById);

//Protected Routes

router.post("/", protect, upload.single("image"), createProject);
router.put("/:id", protect, upload.single("image"), updateProject);
router.delete("/:id", protect, deleteProject);

module.exports = router;
