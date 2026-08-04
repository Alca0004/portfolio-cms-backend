const User = require("../models/User");
const bcrypt = require("bcryptjs");

const getProfile = async (req, res) => {
  try {
    const user = await User.findOne().select("-password -email");
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { password, profileImage, bio } = req.body;

    const updatedFields = {};

    if (profileImage) {
      updatedFields.profileImage = profileImage;
    }
    
    if (bio) {
      updatedFields.bio = bio;
    }


    if (password) {
      const salt = await bcrypt.genSalt(10);
      updatedFields.password = await bcrypt.hash(password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(req.user._id, updatedFields, { returnDocument: "after" }).select("-password");

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
module.exports = { updateProfile, getProfile };
