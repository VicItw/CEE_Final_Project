import mongoose from "mongoose";
import { type } from "os";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  group: {
    type: String,
    required: true,
  }
});

const User = mongoose.model("User", userSchema);

export default User;
