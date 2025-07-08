const Tower = require("../models/Tower");

// Get all towers
exports.getTowers = async (req, res) => {
  try {
    const towers = await Tower.find();
    res.json(towers);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Create new tower
exports.createTower = async (req, res) => {
  const {
    name,
    apartments
  } = req.body;
  const towerData = {
    name: name,
    apartments: apartments // Save apartments as string
  };
  try {
    const newTower = await Tower.create(towerData); // Save to DB
    res.status(201).json(newTower); // Send response with saved data
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Failed to create tower"
    });
  }
};

// Update tower
exports.updateTower = async (req, res) => {
  const {
    id
  } = req.params;
  const {
    name,
    apartments
  } = req.body;
  try {
    const tower = await Tower.findByIdAndUpdate(id, {
      name,
      apartments
    }, {
      new: true
    } // Important: return updated doc
    );
    if (!tower) {
      return res.status(404).json({
        message: "Tower not found"
      });
    }
    res.status(200).json(tower);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error
    });
  }
};

// Update deleteTower method
exports.deleteTower = async (req, res) => {
  const {
    id
  } = req.params;
  try {
    const deletedTower = await Tower.findByIdAndDelete(id);
    if (!deletedTower) return res.status(404).json({
      message: "Tower not found"
    });

    // ✅ Emit socket event
    if (global._io) {
      global._io.emit("towerDeleted", {
        id: deletedTower._id,
        name: deletedTower.name
      });
    }
    res.json({
      message: "Tower deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};