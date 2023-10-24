import mongoose from "mongoose";
const User = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: Number, default: 0 },
});
const UserModel = mongoose.model("users", User);

export default UserModel;
