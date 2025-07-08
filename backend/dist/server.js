"use strict";

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
var authRoutes = require("./routes/auth");
var trackerRoutes = require("./routes/tracker");
var towerRoutes = require("./routes/towerRoutes");
var dashboard = require("./routes/dashboard");
var app = express();
var server = http.createServer(app);

// ✅ CORS config (update your frontend URL if needed)
var corsOptions = {
  origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
  methods: ["GET", "POST"],
  credentials: false
};

// ✅ Apply CORS to Express
app.use(cors(corsOptions));
app.use(express.json());

// ✅ Handle OPTIONS preflight
app.options("*", cors(corsOptions));

// ✅ Socket.IO server with CORS
var io = new Server(server, {
  cors: corsOptions
});

// ✅ Make io global
global._io = io;

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/tracker", trackerRoutes);
app.use("/api/towers", towerRoutes);
app.use("/api/dashboard", dashboard);

// ✅ Connect DB and Start Server
mongoose.connect(process.env.MONGO_URI).then(function () {
  console.log("MongoDB connected");
  server.listen(8000, '0.0.0.0', function () {
    console.log("Server running on http://localhost:8000");
  });
})["catch"](function (err) {
  console.error("MongoDB connection failed:", err);
});