const Joi = require("@hapi/joi");

//Validacion de registro
const registerUserValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    password: Joi.string()
      .required()
      .min(8)
      .max(20)
      .regex(/^[a-zA-Z0-9]{8,20}$/)
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.code) {
            case "any.required":
              err.message = `La contraseña debe de ser obligatoria`;
              break;
            case "string.min":
              err.message = `La contraseña debe de tener minimo ${err.local.limit} caracteres!`;
              break;
            case "string.max":
              err.message = `La contraseña debe de tener maximo ${err.local.limit} caracteres!`;
              break;
            case "string.regex":
              err.message = `La contraseña tiene caracteres inválidos!`;
              break;
            default:
              break;
          }
        });
        return errors;
      }),
    document: Joi.string().required(),
    roleAdmin: Joi.boolean().required(),
    assignedHealthHome: Joi.string().required(),
  });
  return schema.validate(data);
};

//Validacion de login
const loginValidation = (data) => {
  const schema = Joi.object({
    document: Joi.string().required(),
    password: Joi.string()
      .required()
      .min(8)
      .max(20)
      .regex(/^[a-zA-Z0-9]{8,20}$/)
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "any.required":
              err.message = `La contraseña debe de ser obligatoria`;
              break;
            case "string.min":
              err.message = `La contraseña debe de tener minimo ${err.context.limit} caracteres!`;
              break;
            case "string.max":
              err.message = `La contraseña debe de tener maximo ${err.context.limit} caracteres!`;
              break;
            case "string.regex":
              err.message = `La contraseña tiene caracteres inválidos!`;
              break;
            default:
              break;
          }
        });
        return errors;
      }),
  });
  return schema.validate(data);
};

//Validacion de los pacientes
const patientValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    mutualist: Joi.string().required(),
    emergencyService: Joi.string().required(),
    gpDoctor: Joi.string().required(),
    partnerService: Joi.string(),
    pathologies: Joi.string(),
    caresAndComments: Joi.string(),
    assignedHealthHome: Joi.string().required(),
    admissionDate: Joi.date().required(),
  });
  return schema.validate(data);
};

//Validacion de los contactos
const contactsValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required().required(),
    document: Joi.string().required(),
    phone: Joi.number().required(),
  });
  return schema.validate(data);
};

//Validacion de las tareas
const taskValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    assignedUser: Joi.string().required(),
    assignedHealthHome: Joi.string().required(),
  });
  return schema.validate(data);
};

//Validacion de los healthHome
const healthHomeValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    address: Joi.string().required(),
    phone: Joi.number().required(),
  });
  return schema.validate(data);
};

//Validacion de los healthHome
const emergencyServiceValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
  });
  return schema.validate(data);
};

//Validacion de los healthHome
const hospitalValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
  });
  return schema.validate(data);
};

//Validacion de los healthHome
const pathologiesValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
  });
  return schema.validate(data);
};

//Validacion de los healthHome
const partnerServiceValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
  });
  return schema.validate(data);
};

module.exports.loginValidation = loginValidation;
module.exports.registerUserValidation = registerUserValidation;
module.exports.patientValidation = patientValidation;
module.exports.contactsValidation = contactsValidation;
module.exports.taskValidation = taskValidation;
module.exports.healthHomeValidation = healthHomeValidation;
module.exports.partnerServiceValidation = partnerServiceValidation;
module.exports.pathologiesValidation = pathologiesValidation;
module.exports.hospitalValidation = hospitalValidation;
module.exports.emergencyServiceValidation = emergencyServiceValidation;
