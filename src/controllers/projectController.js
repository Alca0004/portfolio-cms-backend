const Project = require("../models/Project");

const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
const getProjectById = async (req, res) => {
  try {
    // req.params.id gets the id from the URL
    const project = await Project.findById(req.params.id);

    // If no project found with that id
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const createProject = async (req, res) => {
  try {
    const { title, description, techStack, githubUrl, liveUrl } = req.body;
    if (!title || !description || !techStack) {
      return res.status(400).json({ message: "Please fill in all required fields" });
    }
    const project = await Project.create({ title, description, techStack, githubUrl, liveUrl });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, { returnDocument: "after" });
    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const deletedProject = await Project.findByIdAndDelete(req.params.id, req.body);

    res.status(200).json(deletedProject);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { getAllProjects, getProjectById, createProject, updateProject, deleteProject };
