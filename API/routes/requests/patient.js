const mongoose = require("mongoose");
const {validCi} = require("../utils")
const { cleanIdNumber } = require("ciuy");
const router = require("express").Router();
const { patientValidation, contactsValidation } = require("../validation");
const Patient = mongoose.model("Patient", require("../../models/patients"));

//Creacion de pacient
router.post("", async (req, res) => {
  //Validacion de los datos
  const { err } = patientValidation(req.body);
  if (err) return res.status(400).send(err.details[0].message);

  //Valido cedula
  response = await validCi(req.body.document, Patient)
  if (response && response.status == 400){
    return res.status(400).send(response.message);
  };
  cleanCi = cleanIdNumber(req.body.document);

  const patient = new Patient({
    name: req.body.name,
    document: cleanCi,
    mutualist: req.body.mutualist,
    emergencyService: req.body.emergencyService,
    gpDoctor: req.body.gpDoctor,
    pathologies: req.body.pathologies,
    caresAndComments: req.body.caresAndComments,
    assignedHomeHealth: req.body.assignedHomeHealth,
  });
  try {
    await patient.save();
    return res.status(200).send({ customError: false, message: patient });
  } catch (err) {
    return res.status(400).send(err);
  }
});

//Delete de pacient
router.delete("", async (req, res) => {
  try {
    if(await Patient.findOneAndRemove(req.query.document)){
      return res.status(200).send({
        customError: false,
        message: "El paciente se ha borrado correctamente",
      });
    }
    return res.status(404).send({
      customError: false,
      message: "No se ha encontrado ningún paciente",
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

//Update de pacient
router.put("", async (req, res) => {
  const { err } = patientValidation(req.body);
  if (err) return res.status(400).send(err.details[0].message);

  //Valido cedula
  validCi(req.body.document);
  cleanCi = cleanIdNumber(req.body.document);

  const updateQuery = {};

  if (req.body.details) {
    updateQuery.details = req.body.details
  }
  
  if (req.body.completed) {
    updateQuery.completed = req.body.completed
  }

  await Patient.findOneAndUpdate(
    { document: req.body.document },
    {updateQuery},
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
router.get("/homeId", async (req, res) => {
  const patient = await Patient.find({ assignedHomeHealth: req.query._id });
  if (!patient)
    return res
      .status(200)
      .send({ customError: true, message: "El paciente no es válido." });
  else return res.status(200).send({ customError: false, message: patient });
});

//Agrego contacto al paciente
router.post("/contact", async (req, res) => {
  const { err } = contactsValidation(req.body);
  if (err) return res.status(400).send(err.details[0].message);
  try {
    //Busco si el paciente ya tiene un contacto con ese numero
    const results = await Patient.findOne({
      document: req.body.document,
      "contacts.phone": req.body.phone,
    });
    if (!results) {
      await Patient.findOneAndUpdate(
        { document: req.body.document },
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
router.get("/byname", async (req, res) => {
  const nameRegex = new RegExp(req.query.name);
  const patients = await Patient.find({
    name: { $regex: nameRegex, $options: "i" },
  });
  if(patients){
    return res.status(200).send({ customError: false, message: patients });
  }else{
    return res
        .status(404)
        .send({ customError: true, message: "No se encontro ningún paciente con ese nombre." });
  }
  
});

module.exports = router;
