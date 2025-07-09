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
    origin: "*", // 👈 adjust as needed
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
    console.log(`Server is running on port ${PORT}`)
  });
});



// const express = require("express");
// const http = require("http");
// const { Server } = require("socket.io");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const bcrypt = require("bcryptjs");
// const bodyParser = require("body-parser");
// const nodemailer = require("nodemailer");

// dotenv.config();

// const app = express();
// const server = http.createServer(app); // Wrap Express with HTTP server
// const io = new Server(server, {
//   cors: {
//     origin: "*", // Or restrict to your frontend domain
//     methods: ["GET", "POST"],
//   },
// });

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());

// // Example Socket.IO connection
// io.on("connection", (socket) => {
//   console.log("User connected:", socket.id);

//   socket.on("disconnect", () => {
//     console.log("User disconnected:", socket.id);
//   });
// });

// // Start the server
// const PORT = process.env.PORT || 5000;
// server.listen(PORT, "0.0.0.0", () => {
//   console.log(`Server running on port ${PORT}`);
// });
