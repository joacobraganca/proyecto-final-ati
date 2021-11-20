const mongoose = require("mongoose");
const router = require("express").Router();
const Task = mongoose.model("Task", require("../../models/tasks"));
const { taskValidation } = require("../validation");
const verify = require("../verifyToken");

//Creacion de tarea
router.post("", verify, async (req, res) => {
  //Validacion de los datos
  const { err } = taskValidation(req.body);
  if (err) return res.status(400).send(err.details[0].message);

  const task = new Task({
    name: req.body.name,
    dateTime: req.body.dateTime,
    description: req.body.description,
    status: req.body.status,
    priority: req.body.priority,
    assignedUser: req.body.assignedUser,
    assignedHealthHome: req.body.assignedHealthHome,
  });
  try {
    await task.save();
    res.status(200).send(task);
  } catch (err) {
    res.status(400).send(err);
  }
});

//Delete de tarea
router.delete("", verify, async (req, res) => {
  try {
    if (await Task.findByIdAndRemove(req.query._id)) {
      return res.status(200).send("La tarea se ha borrado correctamente");
    }
    return res.status(404).send("La tarea no se ha encontrado");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//Get de pacientes por healthHomeId
router.get("/homeId", verify, async (req, res) => {
  const task = await Task.find({ assignedHealthHome: req.query._id });
  if (!task.length)
    return res.status(404).send("No existen tareas para esa casa de salud.");
  else return res.status(200).send(task);
});

module.exports = router;
