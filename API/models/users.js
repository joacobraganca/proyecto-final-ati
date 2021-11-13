const mongoose = require("mongoose");
const healthHomeSchema = require("./healthHome");
require("dotenv/config");

const HealthHome = mongoose.model("HealthHome", healthHomeSchema);

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
    assignedHealthHome: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "HealthHome",
    },
    tokenNotification: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = userSchema;
