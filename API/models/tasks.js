const mongoose = require("mongoose");
require("dotenv/config");

module.exports = mongoose.model("Users", userSchema);
module.exports = mongoose.model("HealthHome", healthHomeSchema);

const tasksSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  assignedUser: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
  assignedHealthHome: {
    type: Schema.Types.ObjectId,
    ref: "HealthHome",
  },
});

module.exports = mongoose.model("Tasks", tasksSchema);
