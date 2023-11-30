const mongoose = require("mongoose").default;
const URI =
  process.env.CONCESIONARIOS_DB_URI || "mongodb://127.0.0.1/concesionarios";

mongoose
  .connect(URI)
  .then(db => console.log("Conexion exitosa con la base de datos"))
  .catch((err) => console.error("Fallo en la conexion con la db", err));
