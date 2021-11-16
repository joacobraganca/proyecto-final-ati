const mongoose = require("mongoose");
const healthHomeSchema = require("./healthHome");
require("dotenv/config");

const HealthHome = mongoose.model("HealthHome", healthHomeSchema);

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
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
    pathologies: [
      {
        type: String,
        required: true,
      },
    ],
    partnerService: {
      type: String,
    },
    caresAndComments: {
      type: String,
    },
    assignedHealthHome: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "HealthHome",
    },
    contacts: [contactSchema],
  },
  { timestamps: true }
);

module.exports = patientSchema;
