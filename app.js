const express = require('express');
const app = express();
const router = require('./router/concesionario')
app.use(express.json());
require('./database');
app.use('/concesionarios', router);
module.exports = app;