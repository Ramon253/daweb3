const express = require("express");
const app = express();
const router = require("./router/concesionario");
const helmet = require("helmet");
const swaggerUi = require("swagger-ui-express");
const swagerConf = require("./swagger.json");
app.use(express.json());
app.use(helmet());

require("./database");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swagerConf));

app.use("/concesionarios", router);
module.exports = app;