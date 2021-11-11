const mongoose = require("mongoose");
const homeHealthSchema = require("./homeHealth");
require("dotenv/config");

const HomeHealth = mongoose.model('HomeHealth', homeHealthSchema);

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
      type: mongoose.Schema.Types.ObjectId,
      ref: "HomeHealth",
    },
    tokenNotification: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = userSchema;
