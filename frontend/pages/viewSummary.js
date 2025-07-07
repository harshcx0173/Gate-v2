"use client";

import React, { useEffect, useState } from "react";
import API from "../utils/api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { useRouter } from "next/navigation";

export default function ViewSummary() {
  const router = useRouter();
  const [projectTotals, setProjectTotals] = useState({});
  const [weeklyData, setWeeklyData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    if (!token || !user) {
      router.push("/login");
      return;
    }

    API.get("/tracker/summary", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        setProjectTotals(res.data.projects || {});

        // Convert weekly object to array for chart
        const formatted = Object.entries(res.data.weekly || {}).map(
          ([week, projects]) => {
            return { week, ...projects };
          }
        );
        setWeeklyData(formatted);
      })
      .catch((err) => console.error("Summary Fetch Error:", err));
  }, []);

  const formatHMS = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}h ${m}m ${s}s`;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };
  const navigateToBack = () => {
    router.push("/devtools");
  };

  return (
    <div style={{ padding: "2rem" }}>
        <button onClick={navigateToBack}>Back to Project Section</button>
      <h1>📊 Summary View</h1>

      <h2>📌 Total Time per Project</h2>
      <ul>
        {Object.entries(projectTotals).map(([project, seconds]) => (
          <li key={project}>
            <strong>{project}</strong>: {formatHMS(seconds)}
          </li>
        ))}
      </ul>

      {/* 🔹 Weekly Time Chart */}
      <h2 style={{ marginTop: "2rem" }}>🗓 Weekly Time Chart</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={weeklyData}
          margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
          barCategoryGap={weeklyData.length > 3 ? "20%" : "40%"}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="week" tick={{ fontSize: 10 }} />
          <YAxis />
          <Tooltip />
          <Legend />
          {/* Dynamic bars based on projects */}
          {weeklyData.length > 0 &&
            Object.keys(weeklyData[0])
              .filter((key) => key !== "week")
              .map((key, i) => (
                <Bar key={i} dataKey={key} fill={`hsl(${i * 60}, 70%, 50%)`} />
              ))}
        </BarChart>
      </ResponsiveContainer>
      <button onClick={logout} style={{ marginLeft: "10px" }}>
        🚪 Logout
      </button>
    </div>
  );
}
