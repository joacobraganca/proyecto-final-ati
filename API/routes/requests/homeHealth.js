const router = require("express").Router();
const HomeHealth = require("../models/homeHealth");

//Creacion de tarea
router.post("/homeHealth", async (req, res) => {
  //Validacion de los datos
  const { err } = homeHealthValidation(req.body);
  if (err) return res.status(400).send(err.details[0].message);

  const homeHealth = new HomeHealth({
    name: req.body.name,
    address: req.body.address,
    phone: req.body.phone,
  });
  try {
    await homeHealth.save();
    res.status(200).send({ customError: false, message: homeHealth });
  } catch (err) {
    res.status(400).send(err);
  }
});

//Get de casas de salud por id
router.get("/homeHealth", async (req, res) => {
  const homeHealth = await HomeHealth.find({ _id: req.query._id });
  if (!homeHealth)
    return res
      .status(200)
      .send({ customError: true, message: "La casa de salud no existe." });
  else return res.status(200).send({ customError: false, message: homeHealth });
});

module.exports = router;
