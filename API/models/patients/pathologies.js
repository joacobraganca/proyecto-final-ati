const mongoose = require("mongoose");
require("dotenv/config");


const pathologiesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  }
);

module.exports = pathologiesSchema;
