import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String }, // optional for OAuth users
  bio: { type: String, default: "" },
  skills: { type: [String], default: [] },
  avatar: { type: String, default: "" },
  googleId: String,
  facebookId: String,
  linkedinId: String,
});

const User = mongoose.model("User", userSchema);

export default User;