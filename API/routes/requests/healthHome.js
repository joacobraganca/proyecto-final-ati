const router = require("express").Router();
const mongoose = require("mongoose");
const { healthHomeValidation } = require("../validation");
const HealthHome = mongoose.model(
  "HealthHome",
  require("../../models/healthHome")
);
const verify = require("../verifyToken");

//Creacion de tarea
router.post("", verify, async (req, res) => {
  //Validacion de los datos
  const { err } = healthHomeValidation(req.body);
  if (err) return res.status(400).send(err.details[0].message);

  const healthHomeExist = await HealthHome.findOne({ phone: req.body.phone });
  if (healthHomeExist) {
    return res
      .status(400)
      .send("Ya existe una casa de salud con ese número de teléfono");
  }
  const healthHome = new HealthHome({
    name: req.body.name,
    address: req.body.address,
    phone: req.body.phone,
  });
  try {
    await healthHome.save();
    res.status(200).send(healthHome);
  } catch (err) {
    res.status(400).send(err);
  }
});

//Get de casas de salud por id
router.get("", verify, async (req, res) => {
  const healthHome = await HealthHome.findOne({ _id: req.query._id });
  if (!healthHome) return res.status(404).send("La casa de salud no existe.");
  else return res.status(200).send(healthHome);
});

//Get todas las casas de salud
router.get("/all", async (req, res) => {
  const healthHome = await HealthHome.find({});
  if (!healthHome) return res.status(404).send("No existen casas de salud.");
  else return res.status(200).send(healthHome);
});

module.exports = router;
