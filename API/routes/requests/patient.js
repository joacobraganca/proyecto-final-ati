const router = require("express").Router();
const Patient = require("../models/patients");
const { contactsValidation } = require("../validation");
const axios = require("axios");

//Creacion de pacient
router.post("/patient", async (req, res) => {
  //Validacion de los datos
  const { err } = patientValidation(req.body);
  if (err) return res.status(400).send(err.details[0].message);

  const patient = new Patient({
    name: req.body.name,
    mutualist: req.body.mutualist,
    emergencyService: req.body.emergencyService,
    gpDoctor: req.body.gpDoctor,
    pathologies: req.body.pathologies,
    caresAndComments: req.body.caresAndComments,
    assignedHealthHome: req.body.assignedHealthHome,
  });
  try {
    await patient.save();
    res.status(200).send({ customError: false, message: patient });
  } catch (err) {
    res.status(400).send(err);
  }
});

//Delete de pacient
router.delete("/patient", async (req, res) => {
  try {
    await Patient.findByIdAndRemove(req.query._id);
    return res.status(200).send({
      customError: false,
      message: "El paciente se ha borrado correctamente",
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

//Update de pacient
router.patch("/patient", async (req, res) => {
  const { err } = patientValidation(req.body);
  if (err) return res.status(400).send(err.details[0].message);
  //Valido cedula
  await Patient.findOneAndUpdate(
    { _id: req.body._id },
    {
      name: req.body.name,
      mutualist: req.body.mutualist,
      emergencyService: req.body.emergencyService,
      gpDoctor: req.body.gpDoctor,
      pathologies: req.body.pathologies,
      caresAndComments: req.body.caresAndComments,
      assignedHealthHome: req.body.assignedHealthHome,
    },
    { new: true },
    (error) => {
      if (error) {
        return res.status(400).send(error);
      } else {
        return res.status(200).send({
          customError: false,
          message: "Paciente actualizado correctamente",
        });
      }
    }
  );
});

//Get de pacientes por homeHealthId
router.get("/patient/homeId", async (req, res) => {
  const patient = await Patient.find({ assignedHealthHome: req.query._id });
  if (!patient)
    return res
      .status(200)
      .send({ customError: true, message: "El paciente no es válido." });
  else return res.status(200).send({ customError: false, message: patient });
});

//Agrego contacto al paciente
router.post("/patient/contact", async (req, res) => {
  const { err } = contactsValidation(req.body);
  if (err) return res.status(400).send(err.details[0].message);
  try {
    //Busco si el paciente ya tiene un contacto con ese numero
    const results = await Patient.findOne({
      _id: req.body._id,
      "contacts.phone": req.body.phone,
    });
    if (!results) {
      await Patient.findOneAndUpdate(
        { _id: req.body._id },
        {
          $push: {
            contacts: [
              {
                name: req.body.name,
                phone: req.body.phone,
              },
            ],
          },
        }
      );
      res
        .status(201)
        .send({ customError: false, message: "Contacto añadido exitosamente" });
    } else
      return res
        .status(200)
        .send({ customError: true, message: "El contacto ya existe" });
  } catch (err) {
    //Envio el error
    res.status(400).send(err.message);
  }
});

//Get de pacientes por nombre
router.get("/patient/byname", async (req, res) => {
  const nameRegex = new RegExp(req.query.name);
  const patients = await Patient.find({
    name: { $regex: nameRegex, $options: "i" },
  });
  return res.status(200).send({ customError: false, message: patients });
});

module.exports = router;
