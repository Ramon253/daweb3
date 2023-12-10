const express = require("express");
const { checkBodyCoche } = require("./coche");
express().use(express.json);
const bodyKeys = ["nombre", "direccion", "coches"];
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
        Message: "El cuerpo de la request no es valido",
      });
    }

    for (let coche of req.body.coches) {
      if (!checkBodyCoche(Object.keys(coche))) {
        res
          .status(400)
          .json({ Message: "El campo de coches de la request no es valido" });
        return;
      }
    }
    next();
  },
  hasConcesionarioId: async function (req, res, next) {
    if (isNaN(req.params.id)) {
      mongoose.findOne({ _id: req.params.id }).then((element) => {
          req.id = req.params.id;
          next();
      }).catch(err => {
        console.error(err);
        res.status(404).json({ Message: "El ObjectID del concesionario dado no existe" });
      });
    }else
      mongoose
      .findOne()
      .select("_id")
      .skip(req.params.id)
      .then((id) => {
        if (id !== null) {
          req.id = id;
          next();
        } else res.status(404).json({ message: "El indice del concesionario dado es muy alto" });
      });
  },
};
