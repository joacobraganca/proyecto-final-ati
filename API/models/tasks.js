const mongoose = require("mongoose");
const homeHealthSchema = require("./homeHealth");
const userSchema = require("./users");
require("dotenv/config");

const Users = mongoose.model("Users", userSchema);
const HomeHealth = mongoose.model('HomeHealth', homeHealthSchema);

const tasksSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  assignedUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  assignedHomeHealth: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "HomeHealth",
  },
});

module.exports = tasksSchema;
