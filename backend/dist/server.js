"use strict";

var _process$env$CLIENT_O;
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// require("dotenv").config();

// const http = require("http"); // ✅ Add this
// const { Server } = require("socket.io"); // ✅ Add this

// const authRoutes = require("./routes/auth");
// const trackerRoutes = require("./routes/tracker");
// const towerRoutes = require("./routes/towerRoutes");
// const dashboard = require("./routes/dashboard");

// const app = express();
// const server = http.createServer(app); // ✅ Use HTTP server
// const io = new Server(server, {
//   cors: {
//     origin: "*", 
//   },
// });

// // ✅ Store io globally for access in controllers
// global._io = io;

// app.use(cors());
// app.use(express.json());

// app.use("/api/auth", authRoutes);
// app.use("/api/tracker", trackerRoutes);
// app.use("/api/towers", towerRoutes);
// app.use("/api/dashboard", dashboard);

// // ✅ CONNECT DB + START
// mongoose.connect(process.env.MONGO_URI).then(() => {
//   console.log("MongoDB connected");

//   server.listen(8000, '0.0.0.0', () => {
//     console.log("Server running on http://localhost:8000");
//   });
// });

var express = require("express");
var mongoose = require("mongoose");
var cors = require("cors");
require("dotenv").config();
var http = require("http");
var _require = require("socket.io"),
  Server = _require.Server;

// Import Routes
var authRoutes = require("./routes/auth");
var trackerRoutes = require("./routes/tracker");
var towerRoutes = require("./routes/towerRoutes");
var dashboardRoutes = require("./routes/dashboard");

// Create Express app and HTTP server
var app = express();
var server = http.createServer(app);

// CORS Configuration
var corsOptions = {
  origin: ((_process$env$CLIENT_O = process.env.CLIENT_ORIGIN) === null || _process$env$CLIENT_O === void 0 ? void 0 : _process$env$CLIENT_O.split(",")) || ["http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
};
app.use(cors(corsOptions));
app.use(express.json());
app.options("*", cors(corsOptions));

// Initialize Socket.IO with CORS
var io = new Server(server, {
  cors: corsOptions
});
global._io = io;

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/tracker", trackerRoutes);
app.use("/api/towers", towerRoutes);
app.use("/api/dashboard", dashboardRoutes);

// 404 Handler
app.use(function (req, res) {
  res.status(404).json({
    message: "Route not found"
  });
});

// Connect to MongoDB and start the server
var PORT = process.env.PORT || 8000;
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(function () {
  console.log("✅ MongoDB connected");
  server.listen(PORT, '0.0.0.0', function () {
    console.log("\uD83D\uDE80 Server running on http://localhost:".concat(PORT));
  });
})["catch"](function (err) {
  console.error("❌ MongoDB connection failed:", err.message);
  process.exit(1);
});