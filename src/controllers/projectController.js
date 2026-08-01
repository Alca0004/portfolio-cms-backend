const Project = require("../models/Project");
const cloudinary = require("../config/cloudinary");

const uploadImageToCloudinary = async (file) => {
  const base64 = file.buffer.toString("base64");
  const dataUri = `data:${file.mimetype};base64,${base64}`;
  const result = await cloudinary.uploader.upload(dataUri, {
    folder: "portfolio-projects",
  });
  return result.secure_url;
};

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

    let imageUrl = "";
    if (req.file) {
      imageUrl = await uploadImageToCloudinary(req.file);
    }

    const project = await Project.create({
      title,
      description,
      techStack,
      githubUrl,
      liveUrl,
      image: imageUrl,
    });

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

    if (req.file) {
      req.body.image = await uploadImageToCloudinary(req.file);
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
