const Joi = require("@hapi/joi");

//Validacion de registro
const registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    password: Joi.string()
      .required()
      .min(8)
      .max(20)
      .regex(/^[a-zA-Z0-9]{8,20}$/),
    document: Joi.string(),
    roleAdmin: Joi.boolean().required(),
    assignedHealthHome: Joi.string().required(),
    tokenNotification: Joi.string(),
  });
  return schema.validate(data);
};

//Validacion de login
const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().min(6),
    password: Joi.string().required().min(8).max(20),
    tokenNotification: Joi.string(),
  });
  return schema.validate(data);
};

const patientValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    mutualist: Joi.string().required(),
    emergencyService: Joi.string().required(),
    gpDoctor: Joi.string().required(),
    partnerService: Joi.string().required(),
    pathologies: Joi.string().required(),
    caresAndComments: Joi.string().required(),
    pathologies: Joi.string().required(),
    assignedHealthHome: Joi.string().required(),
  });
  return schema.validate(data);
};

//Validacion de los contactos
const contactsValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required().required(),
    email: Joi.string().email().required(),
    phone: Joi.number().required(),
  });
  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.contactsValidation = contactsValidation;
module.exports.createPacientValidation = createPacientValidation;
module.exports.loginValidation = loginValidation;
