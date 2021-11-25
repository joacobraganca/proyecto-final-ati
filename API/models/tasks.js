const mongoose = require("mongoose");
const healthHomeSchema = require("./healthHome");
const userSchema = require("./users");
const patientsSchema = require("./patients/patients");
require("dotenv/config");

const Users = mongoose.model("Users", userSchema);
const HealthHome = mongoose.model("HealthHome", healthHomeSchema);
const Patients = mongoose.model("Patients", patientsSchema);

const tasksSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  dateTime: {
    type: Date,
  },
  priority:{
    type: Boolean,
    required: true,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ["pendiente", "enCurso", "cerrado"],
    default: "pendiente",
    message: '{VALUE} no es un status permitido.'
  },
  assignedPatient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patients",
  },
  assignedUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  assignedHealthHome: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "HealthHome",
    required: true,
  },
});

module.exports = tasksSchema;
