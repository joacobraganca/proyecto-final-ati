const mongoose = require("mongoose");
const healthHomeSchema = require("./healthHome");
const userSchema = require("./users");
require("dotenv/config");

const Users = mongoose.model("Users", userSchema);
const HealthHome = mongoose.model("HealthHome", healthHomeSchema);

const tasksSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  dateTime: {
    type: Date,
  },
  status: {
    type: String,
    enum: ["pendiente", "enCurso", "cerrado"],
    default: "pendiente",
  },
  assignedUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  assignedHealthHome: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "HealthHome",
  },
});

module.exports = tasksSchema;
