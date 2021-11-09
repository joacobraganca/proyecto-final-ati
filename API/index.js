const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
//Importar rutas
//const postsRoutes = require("./routes/posts");
const requestsRoute = require("./routes/requests");
const validateTokenRoute = require("./routes/validateToken");
const cors = require("cors");
mongoose.set("useFindAndModify", false);
require("dotenv/config");
app.listen(3000);
app.use(cors());
mongoose.set("useCreateIndex", true);

//Middlewares (Funciones)
app.use(bodyParser.json());
app.use(express.json());
//app.use("/posts", postsRoutes);
app.use("/api/user", requestsRoute);
app.use("/api/mapa", validateTokenRoute);

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
