const { validateIdentificationNumber } = require("ciuy");
const { cleanIdNumber } = require("ciuy");

module.exports = {
  validCi: async function (ci, entity) {
    if (ci != null) {
      document = cleanIdNumber(ci);
      const validCI = validateIdentificationNumber(document);
      if (!validCI){
        return {
          status: 400,
          message: "La cédula no es valida."
        }
      }
      else if (await ciExist(document, entity)){
        return {
          status: 400,
          message: "La CI ya existe."
        }
      }
    }
  },
};

async function ciExist(ci, entity) {
  const user = await entity.findOne({ document: ci });
  if (user) return true;
  return false;
}
