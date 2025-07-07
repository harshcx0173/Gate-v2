"use strict";

var express = require("express");
var mongoose = require("mongoose");
var cors = require("cors");
require("dotenv").config();
var http = require("http"); // ✅ Add this
var _require = require("socket.io"),
  Server = _require.Server; // ✅ Add this

var authRoutes = require("./routes/auth");
var trackerRoutes = require("./routes/tracker");
var towerRoutes = require("./routes/towerRoutes");
var dashboard = require("./routes/dashboard");
var app = express();
var server = http.createServer(app); // ✅ Use HTTP server
var io = new Server(server, {
  cors: {
    origin: "*" // 👈 adjust as needed
  }
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
mongoose.connect(process.env.MONGO_URI).then(function () {
  console.log("MongoDB connected");
  server.listen(8000, '0.0.0.0', function () {
    console.log("Server running on http://localhost:8000");
  });
});