const express = require("express");
const { checkBodyCoche } = require("./coche");
express().use(express.json);
const bodyKeys = ["nombre", "direccion", "coches"];
const cochesKeys = ["modelo", "cv", "precio"];
const mongoose = require("../models/concesionario");

module.exports = {
  checkBody: (req, res, next) => {
    if (req.method === "GET" || req.method === "DELETE") {
      next();
      return;
    }
    let reqBodyKeys = Object.keys(req.body);
    if (checkBodyCoche(reqBodyKeys)) {
      next();
      return;
    }

    reqBodyKeys = reqBodyKeys.filter((key) => bodyKeys.includes(key));
    if (reqBodyKeys.length !== 3) {
      res.status(400).json({
        Message:
          "Debes enviar un cuerpo con la request, o el cuerpo de la request no es valido"
      });
    }


    for (let coche of req.body.coches) {

      if (!checkBodyCoche(Object.keys(coche))) {
        res.status(400).json({ Message: "El campo de coches es incorrecto" });
        return;
      }
    }
    next();
  },
  hasConcesionario: async function(req, res, next) {
    let length = await mongoose.countDocuments()
    if (req.params.id >= length) {
      res.status(404).json({ message: "El id dado es muy grande" });
      return;
    }
    req.id = await mongoose.findOne().select("_id").skip(req.params.id)
    next()
  }
};
