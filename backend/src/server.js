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

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const http = require("http");
const { Server } = require("socket.io");

// Import Routes
const authRoutes = require("./routes/auth");
const trackerRoutes = require("./routes/tracker");
const towerRoutes = require("./routes/towerRoutes");
const dashboardRoutes = require("./routes/dashboard");

// Create Express app and HTTP server
const app = express();
const server = http.createServer(app);

// CORS Configuration
const corsOptions = {
  origin: process.env.CLIENT_ORIGIN?.split(",") || ["http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.options("*", cors(corsOptions));

// Initialize Socket.IO with CORS
const io = new Server(server, {
  cors: corsOptions,
});
global._io = io;

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/tracker", trackerRoutes);
app.use("/api/towers", towerRoutes);
app.use("/api/dashboard", dashboardRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Connect to MongoDB and start the server
const PORT = process.env.PORT || 8000;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("✅ MongoDB connected");

  server.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error("❌ MongoDB connection failed:", err.message);
  process.exit(1);
});
