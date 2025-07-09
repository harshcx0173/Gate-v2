import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    message: {
      type: String,
      trim: true,
    },
    chat: {
      type: mongoose.Types.ObjectId,
      ref: "Chat",
    },
    file: {
      filename: String,
      path: String,
      mimetype: String,
      size: Number
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Message", messageSchema);