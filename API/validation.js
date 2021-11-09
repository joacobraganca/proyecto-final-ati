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
    assignedHealthHome: Joi.string(),
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
module.exports.loginValidation = loginValidation;
