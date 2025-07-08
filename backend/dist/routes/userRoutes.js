const express = require("express");
const router = express.Router();
const User = require("../models/user");

// Create User
router.post("/", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
});

// Read Users
router.get("/", async (req, res) => {
  const {
    page = 1,
    limit = 5,
    search
  } = req.query;
  const query = search ? {
    name: new RegExp(search, "i")
  } : {};
  const users = await User.find(query).skip((page - 1) * limit).limit(Number(limit));
  const totalUsers = await User.countDocuments(query);
  res.json({
    users,
    totalUsers
  });
  try {
    if (search) {
      // Search Users
      const searchUsers = await User.find({
        name: new RegExp(search, "i")
      });
      return res.json({
        allUsers: [],
        searchUsers
      });
    }

    // Get All Users
    const allUsers = await User.find();
    res.json({
      allUsers,
      searchUsers: []
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error"
    });
  }
});

// router.get('/users', async (req, res) => {
//     const { page = 1, search = "" } = req.query;
//     const limit = 5;
//     const skip = (page - 1) * limit;

//     try {
//         const users = await User.find({ name: new RegExp(search, 'i') })
//             .skip(skip)
//             .limit(limit);

//         const totalUsers = await User.countDocuments({ name: new RegExp(search, 'i') });

//         res.json({ users, totalUsers });
//     } catch (error) {
//         res.status(500).json({ message: "Server error" });
//     }
// });

// Update User
router.put("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    res.json(user);
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
});

// Delete User
router.delete("/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({
      message: "User deleted"
    });
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
});
module.exports = router;