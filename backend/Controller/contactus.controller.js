// const Contact = require("../Model/contactus.model.js");
import Contact from "../Model/contactus.model.js";

const contactController = {};

// Contact Form Submission
contactController.submitContactForm = async (req, res) => {
  try {
    const { firstName, lastName, email, message } = req.body;

    // Validate input
    if (!firstName || !lastName || !email || !message) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    // Save contact details in the database
    const newContact = new Contact({ firstName, lastName, email, message });
    await newContact.save();

    res.status(201).json({ msg: "Message sent successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

// Fetch All Contact Messages
contactController.getAllMessages = async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

contactController.deleteContact = async (req, res) => {
  try {
    const { contactId } = req.params;

    const contact = await Contact.findByIdAndDelete(contactId);

    if (!contact) {
      return res.status(404).json({ success: false, msg: "Contact not found" });
    }

    res.status(200).json({
      success: true,
      msg: "Contact message deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Server error",
      error: error.message,
    });
  }
};

// contactController.updateUserContactusById = async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const { fullName, email, message } = req.body;

//     // Find the user by ID
//     let user = await Contact.findById(userId);
//     console.log("user ? ", user);
//     if (!user) {
//       return res.status(404).json({ success: false, msg: "User not found" });
//     }

//     // Update user details
//     user.fullName = fullName || user.fullName;
//     user.email = email || user.email;
//     user.message = message || user.message;

//     // Save updated user
//     await user.save();

//     res.status(200).json({
//       success: true,
//       msg: "User updated updated successfully",
//       user,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       msg: "Server error",
//       error: error.message,
//     });
//   }
// }

contactController.updateUserContactusById = async (req, res) => {
  try {
    const { contactId } = req.params;
    const { fullName, email, message } = req.body;
    console.log("Received userId:", contactId);

    // Update user contact using findByIdAndUpdate
    const updatedUser = await Contact.findByIdAndUpdate(
      contactId,
      { fullName, email, message },
      { new: true, runValidators: true }
    );

    // If user is not found
    if (!updatedUser) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }

    res.status(200).json({
      success: true,
      msg: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Server error",
      error: error.message,
    });
  }
};


export default contactController;
