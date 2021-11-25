const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

//RUTAS
const requestsRouteUser = require("./routes/requests/user");
const requestsRouteTask = require("./routes/requests/task");
const requestsRoutePatient = require("./routes/requests/patient/patient");
const requestsRouteHealthHome = require("./routes/requests/healthHome");
const requestsRouteEmergencyService = require("./routes/requests/patient/emergencyService");
const requestsRouteHospital = require("./routes/requests/patient/hospital");
const requestsRoutePartnerService = require("./routes/requests/patient/partnerService");
const requestsRoutePathologies = require("./routes/requests/patient/pathologies");

const cors = require("cors");
mongoose.set("useFindAndModify", false);
require("dotenv/config");

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Our app is running on port ${PORT}`);
});

app.use(
  cors({
    exposedHeaders: ["Authorization", "Content-type"],
  })
);

mongoose.set("useCreateIndex", true);

//Middlewares (Funciones)
app.use(bodyParser.json());
app.use(express.json());
//app.use("/posts", postsRoutes);
app.use("/api/user", requestsRouteUser);
app.use("/api/task", requestsRouteTask);
app.use("/api/patient", requestsRoutePatient);
app.use("/api/healthHome", requestsRouteHealthHome);
app.use("/api/emergencyService", requestsRouteEmergencyService);
app.use("/api/hospital", requestsRouteHospital);
app.use("/api/partnerService", requestsRoutePartnerService);
app.use("/api/pathologies", requestsRoutePathologies);

//Rutas
app.get("/", (req, res) => {
  res.send("Funciona");
});

//Conectar con BD
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Conectado con la base");
  }
);
