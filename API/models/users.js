const mongoose = require("mongoose");
const advancedEncryption = require("mongoose-advanced-encryption");
require("dotenv/config");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      timestamps: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 20,
    },
    document: {
      type: String,
      required: true,
    },
    roleAdmin: {
      type: Boolean,
      required: true,
    },
    assignedHomeHealth: {
      type: Schema.Types.ObjectId,
      ref: "homeHealth",
    },
    tokenNotification: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
