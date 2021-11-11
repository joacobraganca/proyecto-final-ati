const mongoose = require("mongoose");
const router = require("express").Router();
const Task = mongoose.model("Task", require("../../models/tasks"));
const { taskValidation } = require("../validation");

//Creacion de tarea
router.post("", async (req, res) => {
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
    res.status(200).send({ message: task });
  } catch (err) {
    res.status(400).send(err);
  }
});

//Delete de tarea
router.delete("", async (req, res) => {
  try {
    if(await Task.findByIdAndRemove(req.query._id)){
      return res.status(200).send({
         
      message: "La tarea se ha borrado correctamente",
      });
    };
    return res.status(404).send({
       
    message: "La tarea no se ha encontrado",
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//Get de pacientes por homeHealthId
router.get("/homeId", async (req, res) => {
  const task = await Task.find({ assignedHomeHealth: req.query._id });
  if (!task.length)
    return res
      .status(404)
      .send({ message: "No existen tareas para esa casa de salud." });
  else return res.status(200).send({ message: task });
});

module.exports = router;
