import express from "express";
import dotenv from "dotenv";
const app = express();
import mongoose from "mongoose";
import { createServer } from "http";
import cors from "cors";
import { Server } from "socket.io";
const server = createServer(app);
import authRoute from "./routes/auth.js";
import chatRoute from "./routes/chat.js";
import messageRoute from "./routes/message.js";
import fileRoute from "./routes/file.js";
import authenticateUser from "./middleware/auth.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true, limit: '100mb' }));

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected!");
    
    // Routes
    app.use("/auth", authRoute);
    app.use("/chat", authenticateUser, chatRoute);
    app.use("/message", authenticateUser, messageRoute);
    app.use("/file", fileRoute);

    // Socket.io setup
    const io = new Server(server, {
      pingTimeout: 60000,
      cors: {
        origin: "*",
        methods: ["GET", "POST"]
      },
    });

    io.on("connection", (socket) => {
      console.log("Socket connected "+ socket.id)
      socket.on("setup", (userData) => {
        socket.join(userData._id);
        console.log(userData._id + " connected")
        socket.emit("connected");
      });
      
      socket.on("join-chat", (room) => {
        console.log(room+" joined")
        socket.join(room);
      });

      socket.on("typing", (room) => socket.in(room).emit("typing"));
      socket.on("stop-typing", (room) => socket.in(room).emit("stop-typing"));

      socket.on("new-message", (newMessageReceived) => {
        let chat = newMessageReceived.chat;

        if (!chat.users) return console.log(`chat.users not defined`);

        chat.users.forEach((user) => {
          if (user._id === newMessageReceived.sender._id) return;
          console.log("Hey got a message " + newMessageReceived)
          socket.in(user._id).emit("message-received", newMessageReceived);
        });
      });

      socket.off("setup", () => {
        console.log("Socket disconnected")
        socket.leave(userData._id);
      });
    });

    // Start server
    server.listen(PORT, '0.0.0.0', () => console.log(`Server is running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("Database connection error:", err);
    process.exit(1);
  });
