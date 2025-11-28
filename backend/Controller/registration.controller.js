import registrationSchema from "../Model/registration.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cloudinary from "../Config/cloudinary.js";

let registrationControllers = {};

// **User Registration**
registrationControllers.userRegistration = async (req, res) => {
  try {
    const { fullName, contactNumber, emailId, password, confirmPassword } =
      req.body;

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ msg: "Passwords do not match" });
    }

    // Check if user already exists
    let user = await registrationSchema.findOne({ emailId });
    if (user) return res.status(400).json({ msg: "User already exists" });

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    let profileImage = "";
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "user_profiles",
      });
      profileImage = result.secure_url;
    }

    // Create new user
    user = new registrationSchema({
      fullName,
      contactNumber,
      emailId,
      password: hashedPassword,
      profileImage: profileImage || undefined,
    });

    await user.save();
    res.status(201).json({ msg: "User registered successfully", data: user });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

registrationControllers.userLogin = async (req, res) => {
  try {
    const { emailId, password } = req.body;

    // Check if user exists
    const user = await registrationSchema.findOne({ emailId });
    if (!user) {
      return res.status(400).json({ msg: "Invalid email or password" });
    }

    // Compare hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid email or password" });
    }

    // Successful login response
    res.status(200).json({ msg: "Login successful", userId: user._id, data: user });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

registrationControllers.updateUserImageById = async (req, res) => {
  try {
    const { userId } = req.params;

    // Check if file exists
    if (!req.file) {
      return res.status(400).json({ msg: "No file uploaded" });
    }

    // Find user in the database
    let user = await registrationSchema.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    if (user.cloudinaryPublicId) {
      await cloudinary.uploader.destroy(user.cloudinaryPublicId);
    }

    // Upload new image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "user_images",
      use_filename: true,
      unique_filename: false,
    });

    // Update image URL and public ID in MongoDB
    user.profileImage = result.secure_url;
    user.cloudinaryPublicId = result.public_id;

    await user.save();

    res.status(200).json({
      msg: "Profile image updated successfully",
      imageUrl: user.imageUrl,
    });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

registrationControllers.getAllRegisteredUser = async (req, res) => {
  try {
    const userData = await registrationSchema.find({}, "-password")
    res.status(200).json({
      success: true,
      count: userData.length,
      userData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Server error",
      error: error.message,
    });
  }
}

registrationControllers.updateUserDetailsById = async (req, res) => {
  try {
    const { userId } = req.params;
    const { fullName, emailId, contactNumber } = req.body;

    // Find the user by ID
    let user = await registrationSchema.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }

    // Update user details
    user.fullName = fullName || user.fullName;
    user.emailId = emailId || user.emailId;
    user.contactNumber = contactNumber || user.contactNumber;

    // Save updated user
    await user.save();

    res.status(200).json({
      success: true,
      msg: "User details updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Server error",
      error: error.message,
    });
  }
}

registrationControllers.deleteUserDataById = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find the user by ID and delete
    const user = await registrationSchema.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }

    res.status(200).json({
      success: true,
      msg: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Server error",
      error: error.message,
    });
  }
}


export default registrationControllers;
