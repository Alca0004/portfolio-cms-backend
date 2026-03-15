const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    techStack: {
      type: [String],
      required: true,
    },
    githubUrl: {
      type: String,
      default: "",
    },
    liveUrl: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default: "",
    },
    featured: {
      type: Boolean,
      default: false,
    },
    published: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Project", projectSchema);
