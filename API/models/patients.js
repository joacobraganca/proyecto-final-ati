const mongoose = require("mongoose");
const homeHealthSchema = require("./homeHealth");
require("dotenv/config");

const HomeHealth = mongoose.model('HomeHealth', homeHealthSchema);

const contactSchema = new mongoose.Schema({
  name: String,
  phone: Number,
});

const patientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    document: {
      type: String,
      required: true,
    },
    mutualist: {
      type: String,
      required: true,
    },
    emergencyService: {
      type: String,
      required: true,
    },
    gpDoctor: {
      type: String,
      required: true,
    },
    partnerService: {
      type: String,
    },
    pathologies: {
      type: String,
    },
    caresAndComments: {
      type: String,
    },
    assignedHomeHealth: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "HomeHealth",
    },
    contacts: [contactSchema],
  },
  { timestamps: true }
);

module.exports = patientSchema;
