const router = require("express").Router();
const verify = require("./verifyToken");

//Ruteo privado que necesita token para ser accedido, es meramente un ejemplo.
router.get("/", verify, (req, res) => {
  //req.user aca tengo el id del usuario
  res.json({
    mapa: {
      name: "Soy un mapa",
      description: "Que haces mirando esto rey",
    },
  });
});

module.exports = router;
