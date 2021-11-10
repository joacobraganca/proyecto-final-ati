const router = require("express").Router();
const Task = require("../models/tasks");

//Creacion de tarea
router.post("/task", async (req, res) => {
  //Validacion de los datos
  const { err } = taskValidation(req.body);
  if (err) return res.status(400).send(err.details[0].message);

  const task = new Task({
    name: req.body.name,
    assignedUser: req.body.assignedUser,
    assignedHomeHealth: req.body.assignedHomeHealth,
  });
  try {
    await task.save();
    res.status(200).send({ customError: false, message: task });
  } catch (err) {
    res.status(400).send(err);
  }
});

//Delete de tarea
router.delete("/task", async (req, res) => {
  try {
    await Task.findByIdAndRemove(req.query._id);
    return res.status(200).send({
      customError: false,
      message: "La tarea se ha borrado correctamente",
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

//Get de pacientes por homeHealthId
router.get("/task/homeId", async (req, res) => {
  const task = await Task.find({ assignedHomeHealth: req.query._id });
  if (!task)
    return res
      .status(200)
      .send({ customError: true, message: "La tarea no es válido." });
  else return res.status(200).send({ customError: false, message: task });
});

module.exports = router;
