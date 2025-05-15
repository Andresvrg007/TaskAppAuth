import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  username: { type: String, unique: true },
  correo: { type: String, unique: true },
  password: String,
  tasks: []
});

const User = mongoose.model("User", userSchema, "tasksApp");

export default User;
