import Message from "../models/message.js";
import User from "../models/user.js";
import Chat from "../models/chat.js";

const sendMessage = async (req, res) => {
  const { message, chatId } = req.body;

  if (!chatId) {
    console.log("Invalid data passed into request");
    return res.status(400).json({ error: "Please Provide Chat ID" });
  }

  var newMessage = {
    sender: req.user._id,
    chat: chatId,
  };

  if (message) {
    newMessage.message = message;
  }

  if (req.file) {
    newMessage.file = {
      filename: req.file.filename,
      path: req.file.path,
      mimetype: req.file.mimetype,
      size: req.file.size
    };
  }

  try {
    let m = await Message.create(newMessage);
    
    m = await m.populate("sender", "name");
    m = await m.populate("chat");
    m = await User.populate(m, {
      path: "chat.users",
      select: "name email _id",
    });
    
    await Chat.findByIdAndUpdate(chatId, { latestMessage: m }, { new: true });
    
    res.status(200).json(m);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const allMessages = async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name email")
      .populate("chat");
    res.json(messages);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

export { allMessages, sendMessage };
