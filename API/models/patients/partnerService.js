const mongoose = require("mongoose");
require("dotenv/config");


const partnerServiceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  }
);

module.exports = partnerServiceSchema;
