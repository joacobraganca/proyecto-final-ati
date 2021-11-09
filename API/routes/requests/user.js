const router = require("express").Router();
const User = require("../models/users");
const Tasks = require("../models/tasks");
const HealthHome = require("../models/healthHome");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  registerValidation,
  loginValidation,
  contactsValidation,
} = require("../validation");
const { validateIdentificationNumber } = require("ciuy");
const { cleanIdNumber } = require("ciuy");
const axios = require("axios");

router.post("/register", async (req, res) => {
  //Validacion de los datos
  const { err } = registerUserValidation(req.body);
  if (err) return res.status(400).send(err.details[0].message);

  //Valido cedula
  let ci = req.body.document;
  if (ci != null) {
    cleanIdNumber(ci);
    const validCI = validateIdentificationNumber(ci);
    if (!validCI)
      return res
        .status(200)
        .send({ customError: true, message: "La cédula no es valida." });
    if (await ciExist(ci))
      return res
        .status(200)
        .send({ customError: true, message: "La CI ya existe." });
  }

  //Encripto la contraseña
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(req.body.password, salt);

  //Creo usuario
  const user = new User({
    name: req.body.name,
    password: hashedPassword,
    document: validCI,
    roleAdmin: req.body.roleAdmin,
    assignedHealthHome: req.body.assignedHealthHome,
    tokenNotification: req.body.tokenNotification,
  });
  try {
    //Intento crear el usuario
    //const usuaurioGuardado =
    await user.save();
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRETA);
    res.header("auth-token", token);
    res.status(200).send({ customError: false, message: user });
  } catch (err) {
    //Envio el error
    res.status(400).send(err);
  }
});

//Login
router.post("/login", async (req, res) => {
  //Validadocumentón de los datos
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Valida documento de que el email esté registrado en la base
  const user = await User.findOne({ email: req.body.document });

  if (!user)
    return res.status(200).send({
      customError: true,
      message: "El email/contraseña no es correcto.",
    });

  //Corroboro si la contraseña es correcta
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(200).send({
      customError: true,
      message: "El email/contraseña no es correcto.",
    });

  try {
    if (user.tokenNotification !== req.body.tokenNotification) {
      await user.updateOne({
        tokenNotification: req.body.tokenNotification,
      });
    }
  } catch (err) {
    //Envio el error
    console.log("Login error");
    res.status(400).send(err);
  }

  //Creo y asigno el token
  const userSend = new User({
    name: req.body.name,
    roleAdmin: req.body.roleAdmin,
    assignedHealthHome: req.body.assignedHealthHome,
    tokenNotification: req.body.tokenNotification,
  });
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRETA);
  res.header("auth-token", token);
  res.send({ customError: false, message: userSend });
});

//!UPDATE DE PACIENTE
//TODO
router.patch("/update", async (req, res) => {
  const { err } = registerValidation(req.body);
  if (err) return res.status(400).send(err.details[0].message);
  //Valido cedula
  await User.findOneAndUpdate(
    { email: req.body.email.toLowerCase() },
    {
      name: req.body.name,
      gender: req.body.gender,
      roleUnder: req.body.roleUnder,
      roleElderly: req.body.roleElderly,
      tutorEmail: req.body.tutorEmail,
      physicalDisability: req.body.physicalDisability,
      physicalDisabilityConfig: req.body.physicalDisabilityConfig,
      visualDisability: req.body.visualDisability,
      visualDisabilityConfig: req.body.visualDisabilityConfig,
      alarmBtn: req.body.alarmBtn,
      birthDate: req.body.birthDate,
      contacts: req.body.contacts,
      location: {
        latitude: req.body.location.latitude,
        longitude: req.body.location.longitude,
      },
      tokenNotification: req.body.tokenNotification,
    },
    { new: true },
    (error) => {
      if (error) {
        console.log("update error");
        return res.status(400).send(error);
      } else {
        return res.status(200).send({
          customError: false,
          message: "Usuario actualizado correctamente",
        });
      }
    }
  );
});

router.post("/ci/exist", async (req, res) => {
  let ci = req.body.document;

  cleanIdNumber(ci);
  const validCI = validateIdentificationNumber(ci);
  if (!validCI)
    return res
      .status(200)
      .send({ customError: true, message: "La cédula no es valida." });
  if (await ciExist(ci))
    return res
      .status(200)
      .send({ customError: true, message: "La CI ya existe." });
  else
    return res
      .status(200)
      .send({ customError: false, message: "La CI no existe." });
});

async function ciExist(ci) {
  const user = await User.findOne({ document: ci });
  if (user) return true;
  return false;
}

//!CONTACTOS DE PACIENTE TODO
router.post("/add/contact", async (req, res) => {
  const { err } = contactsValidation(req.body);
  if (err) return res.status(400).send(err.details[0].message);
  try {
    //Busco si el usuario ya tiene ese contacto
    const results = await User.findOne({
      email: req.body.emailUsr,
      "contacts.email": req.body.email,
    });
    if (!results) {
      await User.findOneAndUpdate(
        { email: req.body.emailUsr },
        {
          $push: {
            contacts: [
              {
                email: req.body.email,
                name: req.body.name,
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
    console.log("add contact error");
    res.status(400).send(err.message);
  }
});

//!CONTACTOS DE PACIENTE TODO
router.get("/get/contacts", async (req, res) => {
  //Validacion de que el email esté registrado en la base
  const user = await Patients.findOne({ email: req.query.email });
  if (!user)
    return res
      .status(200)
      .send({ customError: true, message: "El usuario no es válido." });
  else
    return res.status(200).send({ customError: false, message: user.contacts });
});

//!CONTACTOS DE PACIENTE TODO
router.get("/get", async (req, res) => {
  //Validacion de que el email esté registrado en la base
  const user = await User.findOne({ email: req.query.email });
  if (!user)
    return res
      .status(200)
      .send({ customError: true, message: "El usuario no es válido." });
  else return res.status(200).send({ customError: false, message: user });
});

//*HECHO PARA PACIENTES ALREADY
router.get("/get/byname", async (req, res) => {
  const nameRegex = new RegExp(req.query.name);
  let patients = [];
  patients = await Patients.find({
    name: { $regex: nameRegex, $options: "i" },
  });
  return res.status(200).send({ customError: false, message: patients });
});

//!DELETE DE PACIENTES
router.delete("/delete", async (req, res) => {
  try {
    await User.findByIdAndRemove(req.body._id);
    return res.status(200).send({
      customError: false,
      message: "El usuario se ha borrado correctamente",
    });
  } catch (err) {
    console.log("get byname error");
    res.status(400).send(err.message);
  }
});

//!DELETE DE CONTACTOS DE PACIENTE TODO
router.delete("/delete/contact", async (req, res) => {
  try {
    await User.update(
      { email: req.query.email },
      {
        $pull: {
          contacts: {
            email: req.query.emailDel,
          },
        },
      }
    );
    return res.status(200).send({
      customError: false,
      message: "El contacto se ha borrado correctamente",
    });
  } catch (err) {
    console.log("delete contact error");
    res.status(400).send(err.message);
  }
});

//! NOTIFICATION
async function sendNotification(notifications) {
  let response = false;
  const axiosPostNotification = axios.create({
    mode: "cors",
    method: "post",
    headers: {
      host: "exp.host",
      accept: "application/json",
      "accept-encoding": "gzip, deflate",
      "content-type": "application/json",
    },
  });
  await axiosPostNotification
    .post("https://exp.host/--/api/v2/push/send", notifications)
    .then((resp) => {
      console.log(resp);
      response = true;
    })
    .catch((error) => {
      console.error(error);
      response = false;
    });
  return response;
}

module.exports = router;
