const mongoose = require("mongoose");
const router = require("express").Router();
const Hospital = mongoose.model("Hospital", require("../../../models/patients/hospital"));
const { hospitalValidation } = require("../../validation");
const verify = require("../../verifyToken");

//Creacion de hospital
router.post("", verify, async (req, res) => {
  const { err } = hospitalValidation(req.body);
  if (err) return res.status(400).send(err.details[0].message);

  const hospital = new Hospital({
    name: req.body.name,
  });
  try {
    await hospital.save();
    return res.status(200).send(hospital);
  } catch (err) {
    return res.status(400).send(err);
  }
});

//Delete de hospital
router.delete("", verify, async (req, res) => {
  if (!req.query._id) {
    return res.status(400).send("El id es requerido.");
  }
  try {
    if (await Hospital.findByIdAndRemove(req.query._id)) {
      return res.status(200).send("El hospital se ha borrado correctamente");
    }
    return res.status(404).send("No se ha encontrado ningún hospital");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

//Update de hospital
router.put("", verify, async (req, res) => {
  if (!req.query._id) {
    return res.status(400).send("El id es requerido.");
  }
  
  if(!Hospital.findById(req.query._id)){
    return res.status(404).send("No se ha encontrado ningún hospital");
  }

  await Hospital.findByIdAndUpdate(
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
  )
});

//Get de todos los hospital
router.get("", async (req, res) => {
  const hospital = await Hospital.find({});
  if (!hospital) return res.status(404).send("No existen hospitales");
  else return res.status(200).send(hospital);
});

module.exports = router;
