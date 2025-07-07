"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import API from "../utils/api";
import { saveAs } from "file-saver";

export default function DevTools() {
  const router = useRouter();

  const [trackerTime, setTrackerTime] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [trackerLog, setTrackerLog] = useState([]);
  const [durations, setDurations] = useState([]);
  const [tasks, setTasks] = useState([]);

  const [h, setH] = useState("");
  const [m, setM] = useState("");
  const [taskName, setTaskName] = useState("");
  const [taskHours, setTaskHours] = useState("");
  const [selectedProject, setSelectedProject] = useState("");

  // Auth & Data Load
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    if (!token || !user) {
      router.push("/login");
      return;
    }

    const savedStart = localStorage.getItem("startTime");
    const savedProject = localStorage.getItem("activeProject");
    if (savedProject) setSelectedProject(savedProject);

    if (savedStart) {
      const diff = Math.floor((Date.now() - Number(savedStart)) / 1000);
      setTrackerTime(diff);
      const id = setInterval(() => {
        setTrackerTime((prev) => prev + 1);
      }, 1000);
      setIntervalId(id);
    }

    API.get("/tracker", {
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => {
      const { trackerLog = [], durations = [], tasks = [] } = res.data || {};
      setTrackerLog(trackerLog);
      setDurations(durations);
      setTasks(tasks);
    });
  }, []);

  // Format Time
  const formatTime = (s) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${h}h ${m}m ${sec}s`;
  };

  // Save only new data
  // ✅ Safe saveTracker
  const saveTracker = async ({
    newLog = [],
    newDurations = [],
    newTasks = [],
  }) => {
    const token = localStorage.getItem("token");
    try {
      const body = {};
      if (newLog.length) body.trackerLog = newLog;
      if (newDurations.length) body.durations = newDurations;
      if (newTasks.length) body.tasks = newTasks;

      if (Object.keys(body).length === 0) return; // nothing to save

      await API.post("/tracker", body, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (err) {
      console.error("Save Tracker failed:", err);
    }
  };

  // Timer
  const startTimer = () => {
    if (!selectedProject) {
      alert("Please select a project");
      return;
    }
    if (intervalId) return;
    const id = setInterval(() => {
      setTrackerTime((prev) => prev + 1);
    }, 1000);
    setIntervalId(id);
    localStorage.setItem("startTime", Date.now());
    localStorage.setItem("activeProject", selectedProject);
  };

  const stopTimer = () => {
    clearInterval(intervalId);
    setIntervalId(null);
    localStorage.removeItem("startTime");
    localStorage.removeItem("activeProject");

    if (trackerTime > 0) {
      const logEntry = { time: trackerTime, project: selectedProject };
      setTrackerLog((prev) => [...prev, logEntry]);
      saveTracker({ newLog: [logEntry] });

      // ✅ Auto add missing project to tasks
      const exists = tasks.some((t) => t.taskName === selectedProject);
      if (!exists && selectedProject) {
        const newTask = { taskName: selectedProject, taskHours: "0" };
        const updatedTasks = [...tasks, newTask];
        setTasks(updatedTasks);
        saveTracker({ newTasks: [newTask] }); // ✅ send only new task
      }
    }

    setTrackerTime(0);
    setTimeout(() => setSelectedProject(""), 300);
  };

  // Duration
  const addDuration = () => {
    const hr = parseInt(h) || 0;
    const min = parseInt(m) || 0;
    if (hr === 0 && min === 0) return;
    const newDur = { hr, min };
    setDurations((prev) => [...prev, newDur]);
    saveTracker({ newDurations: [newDur] });
    setH("");
    setM("");
  };

  const getTotalManualTime = () => {
    const total = durations.reduce(
      (acc, curr) => acc + curr.hr * 60 + curr.min,
      0
    );
    return `${Math.floor(total / 60)}h ${total % 60}m`;
  };

  // Task
  const addTask = () => {
    if (!taskName || !taskHours) return;
    const newTask = { taskName, taskHours };
    setTasks((prev) => [...prev, newTask]);
    saveTracker({ newTasks: [newTask] });
    setTaskName("");
    setTaskHours("");
  };

  const totalTaskHours = tasks.reduce((sum, t) => sum + Number(t.taskHours), 0);

  // Export CSV
  const exportCSV = () => {
    let csv = "Section,Label,Value\n";

    trackerLog.forEach((entry, i) => {
      csv += `Time Tracker,${entry.project} - Session ${i + 1},${formatTime(
        entry.time
      )}\n`;
    });

    durations.forEach((d, i) => {
      csv += `Manual Duration,Entry ${i + 1},${d.hr}h ${d.min}m\n`;
    });

    tasks.forEach((t, i) => {
      csv += `Task,${t.taskName},${t.taskHours}h\n`;
    });

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const timestamp = new Date().toLocaleString().replace(/[\s/:]/g, "_");
    saveAs(blob, `dev_time_log_${timestamp}.csv`);
  };

  const resetAll = () => {
    setTrackerLog([]);
    setDurations([]);
    setTasks([]);
    setSelectedProject("");
    setTrackerTime(0);
    clearInterval(intervalId);
    setIntervalId(null);
    localStorage.clear();
    saveTracker();
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  const navigateToSummary = () => {
    // Navigates to '/viewSummary' when the ViewSummary button is clicked
    router.push("/viewSummary");
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1>🧰 Developer Time Utility</h1>

      {/* Project Selection */}
      <div style={{ marginBottom: "1rem" }}>
        <label>🎯 Select Project:</label>
        <select
          value={selectedProject}
          onChange={(e) => setSelectedProject(e.target.value)}
          disabled={intervalId !== null}
          style={{ marginLeft: "10px", padding: "5px" }}
        >
          <option value="">-- Select a task/project --</option>
          {tasks.map((t, i) => (
            <option key={i} value={t.taskName}>
              {t.taskName}
            </option>
          ))}
        </select>
        {selectedProject && (
          <p>
            ⏳ Tracking: <strong>{selectedProject}</strong>
          </p>
        )}
      </div>

      {/* Time Tracker */}
      <section>
        <h2>⏱️ Time Tracker</h2>
        <p>Current: {formatTime(trackerTime)}</p>
        <button onClick={startTimer} disabled={intervalId !== null}>
          Start
        </button>
        <button
          onClick={stopTimer}
          disabled={intervalId === null}
          style={{ marginLeft: "10px" }}
        >
          Stop
        </button>
        <ul>
          {trackerLog.map((entry, i) => (
            <li key={i}>
              {entry.project} – Session {i + 1}: {formatTime(entry.time)}
            </li>
          ))}
        </ul>
      </section>

      {/* Manual Durations */}
      {/* <section style={{ display: "none" }}> */}
      <section>
        <h2>➕ Duration Calculator</h2>
        <input
          type="number"
          value={h}
          onChange={(e) => setH(e.target.value)}
          placeholder="Hours"
        />
        <input
          type="number"
          value={m}
          onChange={(e) => setM(e.target.value)}
          placeholder="Minutes"
          style={{ marginLeft: "5px" }}
        />
        <button onClick={addDuration} style={{ marginLeft: "10px" }}>
          Add
        </button>
        <ul>
          {durations.map((d, i) => (
            <li key={i}>
              Entry {i + 1}: {d.hr}h {d.min}m
            </li>
          ))}
        </ul>
        <p>
          <strong>Total:</strong> {getTotalManualTime()}
        </p>
      </section>

      {/* Tasks */}
      <section>
        <h2>📋 Project Estimator</h2>
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Task name"
        />
        <input
          type="number"
          value={taskHours}
          onChange={(e) => setTaskHours(e.target.value)}
          placeholder="Hours"
          style={{ marginLeft: "5px" }}
        />
        <button onClick={addTask} style={{ marginLeft: "10px" }}>
          Add
        </button>
        <ul>
          {tasks.map((t, i) => (
            <li key={i}>
              {t.taskName}: {t.taskHours}h
            </li>
          ))}
        </ul>
        <p>
          <strong>Total Estimated:</strong> {totalTaskHours}h
        </p>
      </section>

      {/* Bottom Buttons */}
      <div style={{ marginTop: "2rem" }}>
        <button onClick={exportCSV}>📤 Export CSV</button>
        <button onClick={resetAll} style={{ marginLeft: "10px", color: "red" }}>
          ❌ Reset All
        </button>
        <button onClick={logout} style={{ marginLeft: "10px" }}>
          🚪 Logout
        </button>
        <button onClick={navigateToSummary} style={{ marginLeft: "10px" }}>
          ViewSummary
        </button>
      </div>
    </div>
  );
}
