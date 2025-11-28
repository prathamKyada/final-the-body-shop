import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String, // Change to String to store image path
    default: "https://res.cloudinary.com/ddn8dmawj/image/upload/v1741251085/user_profiles/lhqop9psjgxzn23rtmks.jpg",
  },
  contactNumber: {
    type: Number,
    required: true,
  },
  emailId: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cloudinaryPublicId: { type: String, default: "" },
});

export default mongoose.model("registration", registrationSchema);
