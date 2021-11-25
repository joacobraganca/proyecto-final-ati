require("dotenv/config");
const mongoose = require("mongoose");
const healthHomeSchema = require("../healthHome");
const hospitalSchema = require("./hospital");
const emergencyServiceSchema = require("./emergencyService");
const pathologiesSchema = require("./pathologies");
const partnerServiceSchema = require("./partnerService");
const HealthHome = mongoose.model("HealthHome", healthHomeSchema);
const Hospital = mongoose.model("Hospital", hospitalSchema);
const EmergencyService = mongoose.model(
  "EmergencyService",
  emergencyServiceSchema
);
const Pathologies = mongoose.model("Pathologies", pathologiesSchema);
const PartnerService = mongoose.model("PartnerService", partnerServiceSchema);

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
    hospital: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hospital",
      required: true,
    },
    emergencyService: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "EmergencyService",
      required: true,
    },
    gpDoctor: {
      type: String,
      required: true,
    },
    pathologies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pathologies",
      },
    ],
    partnerService: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PartnerService",
    },
    caresAndComments: {
      type: String,
    },
    assignedHealthHome: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "HealthHome",
      required: true,
    },
    admissionDate: {
      type: Date,
      required: true,
    },
    contacts: [contactSchema],
  },
  { timestamps: true }
);

module.exports = patientSchema;
