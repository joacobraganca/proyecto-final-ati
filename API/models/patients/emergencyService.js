const mongoose = require("mongoose");
require("dotenv/config");


const emergencyServiceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  }
);

module.exports = emergencyServiceSchema;
