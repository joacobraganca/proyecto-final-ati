const mongoose = require("mongoose");
require("dotenv/config");

const healthHomeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
    min: 6,
    max: 20,
  },
  phone: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("HealthHome", healthHomeSchema);
