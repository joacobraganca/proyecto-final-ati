const { validateIdentificationNumber } = require("ciuy");
const { cleanIdNumber } = require("ciuy");

module.exports = {
  validCi: async function (ci) {
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
  },
};

async function ciExist(ci) {
  const user = await User.findOne({ document: ci });
  if (user) return true;
  return false;
}
