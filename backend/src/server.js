const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const http = require("http"); // ✅ Add this
const { Server } = require("socket.io"); // ✅ Add this

const authRoutes = require("./routes/auth");
const trackerRoutes = require("./routes/tracker");
const towerRoutes = require("./routes/towerRoutes");
const dashboard = require("./routes/dashboard");

const app = express();
const server = http.createServer(app); // ✅ Use HTTP server
const io = new Server(server, {
  cors: {
    origin: "*", 
  },
});

// ✅ Store io globally for access in controllers
global._io = io;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tracker", trackerRoutes);
app.use("/api/towers", towerRoutes);
app.use("/api/dashboard", dashboard);

// ✅ CONNECT DB + START
mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("MongoDB connected");

  server.listen(8000, '0.0.0.0', () => {
    console.log("Server running on http://localhost:8000");
  });
});
