const mongoose = require("mongoose");
const router = require("express").Router();
const PartnerService = mongoose.model("PartnerService", require("../../../models/patients/partnerService"));
const { partnerServiceValidation } = require("../../validation");
const verify = require("../../verifyToken");

//Creacion de servicios de acompañante
router.post("", verify, async (req, res) => {
  const { err } = partnerServiceValidation(req.body);
  if (err) return res.status(400).send(err.details[0].message);
  
  const partnerService = new PartnerService({
    name: req.body.name,
  });
  try {
    await partnerService.save();
    return res.status(200).send(partnerService);
  } catch (err) {
    return res.status(400).send(err);
  }
});

//Delete de servicios de acompañante
router.delete("", verify, async (req, res) => {
  if (!req.query._id) {
    return res.status(400).send("El id es requerido.");
  }
  try {
    if (await PartnerService.findByIdAndRemove(req.query._id)) {
      return res.status(200).send("El servicio de acompañante se ha borrado correctamente");
    }
    return res.status(404).send("No se ha encontrado ningún servicio de acompañante");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

//Update de servicios de acompañante
router.put("", verify, async (req, res) => {
  if (!req.query._id) {
    return res.status(400).send("El id es requerido.");
  }

  await PartnerService.findByIdAndUpdate(
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

//Get de los servicios de acompañante
router.get("", async (req, res) => {
  const partnerService = await PartnerService.find({});
  if (!partnerService) return res.status(404).send("No existen servicios de acompañante");
  else return res.status(200).send(partnerService);
});

module.exports = router;
