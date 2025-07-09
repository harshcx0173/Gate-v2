import express from "express";
import { allMessages, sendMessage } from "../controllers/message.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.route("/:chatId").get(allMessages);
router.route("/").post(upload.single('file'), sendMessage);

export default router;