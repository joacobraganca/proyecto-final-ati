const mongoose = require("mongoose");
require("dotenv/config");

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
      required: true,
    },
    pathologies: {
      type: String,
      required: true,
    },
    caresAndComments: {
      type: String,
      required: true,
    },
    assignedHomeHealth: {
      type: Schema.Types.ObjectId,
      ref: "HomeHealth",
    },
    contacts: [contactSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Patients", patientSchema);
