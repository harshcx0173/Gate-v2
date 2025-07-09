const mongoose = require("mongoose");

const TrackerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  trackerLog: [
    {
      time: Number,
      project: String,
    },
  ],
  durations: [
    {
      hr: Number,
      min: Number,
    },
  ],
  tasks: [
    {
      taskName: String,
      taskHours: String,
    },
  ],
  trackerLog: [
    {
      time: Number,
      project: String,
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  
});

module.exports = mongoose.model("Tracker", TrackerSchema);