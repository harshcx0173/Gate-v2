const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const Tracker = require("../models/Tracker");

// ✅ GET Tracker
router.get("/", auth, async (req, res) => {
  try {
    const tracker = await Tracker.findOne({
      userId: req.user.id
    });
    res.json(tracker || {
      trackerLog: [],
      durations: [],
      tasks: []
    });
  } catch (err) {
    console.error("Tracker GET error:", err);
    res.status(500).json({
      msg: "Something went wrong"
    });
  }
});

// ✅ POST Tracker (Safe Merge)
router.post("/", auth, async (req, res) => {
  const {
    trackerLog = [],
    durations = [],
    tasks = []
  } = req.body;
  try {
    let tracker = await Tracker.findOne({
      userId: req.user.id
    });
    if (!tracker) {
      tracker = await Tracker.create({
        userId: req.user.id,
        trackerLog,
        durations,
        tasks
      });
    } else {
      if (trackerLog.length) {
        tracker.trackerLog.push(...trackerLog);
      }
      if (durations.length) {
        tracker.durations.push(...durations);
      }
      if (tasks.length) {
        tracker.tasks.push(...tasks);
      }
      await tracker.save();
    }
    res.json({
      msg: "Tracker updated successfully"
    });
  } catch (err) {
    console.error("Tracker POST error:", err);
    res.status(500).json({
      msg: "Something went wrong"
    });
  }
});
// 🧠 Utility: convert timestamp to week string
const getWeekKey = date => {
  const d = new Date(date);
  const start = new Date(d.setDate(d.getDate() - d.getDay())); // Sunday
  const end = new Date(d.setDate(start.getDate() + 6)); // Saturday
  return `${start.toDateString()} - ${end.toDateString()}`;
};

// 🆕 Summary Route
router.get("/summary", auth, async (req, res) => {
  try {
    const tracker = await Tracker.findOne({
      userId: req.user.id
    });
    if (!tracker) return res.json({
      projects: {},
      weekly: {}
    });
    const projectTotals = {};
    const weeklyTotals = {};
    tracker.trackerLog.forEach(log => {
      const project = log.project || "Unknown";
      const time = Number(log.time || 0);

      // 🧮 Project total
      if (!projectTotals[project]) projectTotals[project] = 0;
      projectTotals[project] += time;

      // 📅 Weekly total (by project)
      const weekKey = getWeekKey(log.createdAt || Date.now());
      if (!weeklyTotals[weekKey]) weeklyTotals[weekKey] = {};
      if (!weeklyTotals[weekKey][project]) weeklyTotals[weekKey][project] = 0;
      weeklyTotals[weekKey][project] += time;
    });
    res.json({
      projects: projectTotals,
      weekly: weeklyTotals
    });
  } catch (err) {
    console.error("Summary error:", err);
    res.status(500).json({
      msg: "Something went wrong"
    });
  }
});
module.exports = router;