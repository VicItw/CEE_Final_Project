import mongoose from "mongoose";
import { type } from "os";

const groupSchema = new mongoose.Schema({
  group: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
});

const Group = mongoose.model("Group", groupSchema);

export default Group;