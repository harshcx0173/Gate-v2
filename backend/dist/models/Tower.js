const mongoose = require('mongoose');
const towerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  apartments: {
    type: String,
    // <-- Make sure it's a string
    required: true,
    default: "0" // Default "0" if no value is provided
  }
});
const Tower = mongoose.model("Tower", towerSchema);
module.exports = Tower;