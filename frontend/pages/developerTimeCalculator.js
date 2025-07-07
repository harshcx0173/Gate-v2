"use client";
import { useState } from "react";

export default function developerTimeCalculator() {
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [sessions, setSessions] = useState([]);

  const addSession = () => {
    const h = parseInt(hours) || 0;
    const m = parseInt(minutes) || 0;
    if (h === 0 && m === 0) return;

    setSessions([...sessions, { hours: h, minutes: m }]);
    setHours("");
    setMinutes("");
  };

  const getTotalTime = () => {
    let totalMinutes = 0;
    sessions.forEach((s) => {
      totalMinutes += s.hours * 60 + s.minutes;
    });
    const finalHours = Math.floor(totalMinutes / 60);
    const finalMinutes = totalMinutes % 60;
    return { finalHours, finalMinutes };
  };

  const { finalHours, finalMinutes } = getTotalTime();

  return (
    <div style={{ maxWidth: "500px", margin: "2rem auto", padding: "1rem" }}>
      <h1>🧮 Developer Time Calculator</h1>

      <div style={{ display: "flex", gap: "10px", marginBottom: "1rem" }}>
        <input
          type="number"
          placeholder="Hours"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
        />
        <input
          type="number"
          placeholder="Minutes"
          value={minutes}
          onChange={(e) => setMinutes(e.target.value)}
        />
        <button onClick={addSession}>Add</button>
      </div>

      <ul>
        {sessions.map((s, i) => (
          <li key={i}>
            ⏱️ Session {i + 1}: {s.hours}h {s.minutes}m
          </li>
        ))}
      </ul>

      <h3 style={{ marginTop: "1rem" }}>
        ✅ Total Time: {finalHours}h {finalMinutes}m
      </h3>
    </div>
  );
}
