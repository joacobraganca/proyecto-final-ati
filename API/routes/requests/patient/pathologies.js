const mongoose = require("mongoose");
const router = require("express").Router();
const Pathologies = mongoose.model("Pathologies", require("../../../models/patients/pathologies"));
const { pathologiesValidation } = require("../../validation");
const verify = require("../../verifyToken");

//Creacion de servicios de acompañante
router.post("", verify, async (req, res) => {
  const { err } = pathologiesValidation(req.body);
  if (err) return res.status(400).send(err.details[0].message);
  
  const pathologies = new Pathologies({
    name: req.body.name,
  });
  try {
    await pathologies.save();
    return res.status(200).send(pathologies);
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
    if (await Pathologies.findByIdAndRemove(req.query._id)) {
      return res.status(200).send("La patología se ha borrado correctamente");
    }
    return res.status(404).send("No se ha encontrado ningúna patología");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

//Update de servicios de acompañante
router.put("", verify, async (req, res) => {
  if (!req.query._id) {
    return res.status(400).send("El id es requerido.");
  }
  
  if(!Pathologies.findById(req.query._id)){
    return res.status(404).send("No se ha encontrado ningúna patología");
  }

  await Pathologies.findByIdAndUpdate(
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
  const pathologies = await Pathologies.find({});
  if (!pathologies) return res.status(404).send("No existen patologías");
  else return res.status(200).send(pathologies);
});

module.exports = router;
