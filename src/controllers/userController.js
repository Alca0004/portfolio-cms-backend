const User = require("../models/User");
const bcrypt = require("bcryptjs");

const updateProfile = async (req, res) => {
  try {
    const { password, profileImage } = req.body;

    const updatedFields = {};

    // Only update profileImage if it was sent
    if (profileImage) {
      updatedFields.profileImage = profileImage;
    }

    // Only update password if it was sent
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updatedFields.password = await bcrypt.hash(password, salt);
    }

    // Now update the user using their id from the token
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id, // which user to update
      updatedFields, // what to update
      { new: true }, // return updated version
    ).select("-password"); // don't return the password

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
module.exports = { updateProfile };
