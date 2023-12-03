const express = require('express');
const app = express();
const router = require('./router/concesionario');
const helmet = require('helmet');
app.use(express.json());
app.use(helmet());

require('./database');

app.use('/concesionarios', router);
module.exports = app;