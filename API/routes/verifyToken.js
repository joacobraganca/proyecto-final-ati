const { func } = require("@hapi/joi");
const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("Authorization");
  if (!token) return res.status(401).send("Acceso Denegado");
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRETA);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send("Token inválido");
  }
};
