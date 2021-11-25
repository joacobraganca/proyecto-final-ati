const mongoose = require("mongoose");
const router = require("express").Router();
const EmergencyService = mongoose.model(
  "EmergencyService",
  require("../../../models/patients/emergencyService")
);
const { emergencyServiceValidation } = require("../../validation");
const verify = require("../../verifyToken");

//Creacion de servicio de emergencia
router.post("", verify, async (req, res) => {
  const { err } = emergencyServiceValidation(req.body);
  if (err) return res.status(400).send(err.details[0].message);

  const emergencyService = new EmergencyService({
    name: req.body.name,
  });
  try {
    await emergencyService.save();
    return res.status(200).send(emergencyService);
  } catch (err) {
    return res.status(400).send(err);
  }
});

//Delete de servicio de emergencia
router.delete("", verify, async (req, res) => {
  if (!req.query._id) {
    return res.status(400).send("El id es requerido.");
  }
  try {
    if (await EmergencyService.findByIdAndRemove(req.query._id)) {
      return res
        .status(200)
        .send("El servicio de emergencia se ha borrado correctamente");
    }
    return res
      .status(404)
      .send("No se ha encontrado ningún servicio de emergencia");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

//Update de servicio de emergencia
router.put("", verify, async (req, res) => {
  if (!req.query._id) {
    return res.status(400).send("El id es requerido.");
  }

  if (!(await EmergencyService.findById(req.query._id))) {
    return res
      .status(404)
      .send("No se ha encontrado ningún servicio de emergencia");
  }

  await EmergencyService.findByIdAndUpdate(
    { _id: req.query._id },
    { $set: req.body },
    { new: true },
    (error, results) => {
      if (error) {
        return res.status(400).send(error);
      } else {
        return res.status(200).send(results);
      }
    }
  );
});

//Get todas los servicios de emergencia
router.get("", async (req, res) => {
  const emergencyService = await EmergencyService.find({});
  if (!emergencyService)
    return res.status(404).send("No existen servicios de emergencia");
  else return res.status(200).send(emergencyService);
});

module.exports = router;
