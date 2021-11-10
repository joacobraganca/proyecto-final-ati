const mongoose = require("mongoose");
require("dotenv/config");

module.exports = mongoose.model("Users", userSchema);
module.exports = mongoose.model("HomeHealth", homeHealthSchema);

const tasksSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  assignedUser: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
  assignedHomeHealth: {
    type: Schema.Types.ObjectId,
    ref: "HomeHealth",
  },
});

module.exports = mongoose.model("Tasks", tasksSchema);
