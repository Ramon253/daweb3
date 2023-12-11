const express = require("express");
const app = express();
const routerConcesionario = require("./router/concesionario");
const routerGreidsla = require('./router/greidsla');
const helmet = require("helmet");
const swaggerUi = require("swagger-ui-express");
const swagerConf = require("./swagger.json");
app.use(express.json());
app.use(helmet());

require("./database");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swagerConf));

app.use('/greidsla', routerGreidsla);
app.use("/concesionarios", routerConcesionario);
module.exports = app;