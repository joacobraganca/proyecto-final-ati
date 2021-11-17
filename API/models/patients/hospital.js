const mongoose = require("mongoose");
require("dotenv/config");

const hospitalSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    }
  },
);

module.exports = hospitalSchema;
