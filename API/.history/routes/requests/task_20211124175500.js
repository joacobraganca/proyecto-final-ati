const mongoose = require("mongoose");
const router = require("express").Router();
const Task = mongoose.model("Task", require("../../models/tasks"));
const { taskValidation } = require("../validation");
const verify = require("../verifyToken");
const { sendPushToOneUser } = require("./notifications");
const User = mongoose.model("User", require("../../models/users"));
//Creacion de tarea
router.post("", async (req, res) => {
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
    assignedPatient: req.body.assignedPatient,
    assignedHealthHome: req.body.assignedHealthHome,
  });
  try {
    await task.save();
    await sendNotification(req.body.assignedUser);
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

router.put("", verify, async (req, res) => {
  if (!req.query._id) {
    return res.status(400).send("El id es requerido.");
  }

  if (!(await Task.findById(req.query._id))) {
    return res.status(404).send("No se ha encontrado ninguna tarea");
  }

  await Task.findByIdAndUpdate(
    { _id: req.query._id },
    { $set: req.body },
    { new: true },
    (error, results) => {
      if (error) {
        return res.status(400).send(error);
      } else {
        return res.status(200).send(results);
      }
    }
  );
});

//Get de pacientes por healthHomeId
router.get("/homeId", verify, async (req, res) => {
  const task = await Task.find({ assignedHealthHome: req.query._id });
  if (!task.length)
    return res.status(404).send("No existen tareas para esa casa de salud.");
  else return res.status(200).send(task);
});

//Get de pacientes por usuario
router.get("/user", verify, async (req, res) => {
  const task = await Task.find({ assignedUser: req.query._id });
  if (!task.length)
    return res.status(404).send("No existen tareas para ese usuario.");
  else return res.status(200).send(task);
});

const sendNotification = async (nurse_id) => {
  if (nurse_id) {
    const nurse = await User.findById(nurse_id);
    if (nurse[0].tokenNotification) {
      const notification = {
        token: nurse.tokenNotification,
        data: {
          title: "Creación de Tarea",
          message: nurse.name + " se te ha asignado una nueva tarea.",
        },
      };
      sendPushToOneUser(notification);
    }
    console.log(nurse.tokenNotification);
  }
};

module.exports = router;
