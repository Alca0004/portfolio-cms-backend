const express = require("express");
const { getAllProjects, getProjectById, createProject, updateProject, deleteProject } = require("../controllers/projectController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

//Public routes
router.get("/", getAllProjects);
router.get("/:id", getProjectById);

//Protected Routes

router.post("/", protect, createProject);
router.put("/:id", protect, updateProject);
router.delete("/:id", protect, deleteProject);

module.exports = router;
