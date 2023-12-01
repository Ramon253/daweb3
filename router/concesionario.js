const express = require("express");
express().use(express.json);
const router = express.Router();
const middlewareConcesioanario = require("../middleware/concesionario");
const middlewareCoches = require("../middleware/coche");
const mongoose = require("../models/concesionario");
/*###############################################################*/
/*---------------------routerConcesionarios----------------------*/
/*______________Middleware_____________________________*/
router.use("/:id/coches", middlewareCoches.checkBody);
router.use(middlewareConcesioanario.checkBody);
router.use("/:id", middlewareConcesioanario.hasConcesionario);

/*__________________________________________________*/
router.get("/", async (req, res) => {
  mongoose
    .find()
    .select("-__v")
    .then((concesionarios) => res.status(200).json(concesionarios))
    .catch((err) => {
      res
        .status(500)
        .json({ message: "Error inesperado con la base de datos" });
      console.error(err);
    });
});

router.post("/", (req, res) => {
  mongoose
    .insertMany(req.body)
    .then((dbResponse) =>
      res.status(201).json({ message: "Concesionario agregado con exito" }),
    )
    .catch((err) => res.status(500).json({ message: "error inesperado" }));
});
router.get("/:id", (req, res) => {
  mongoose
    .findOne()
    .select("-__v")
    .skip(req.id)
    .then((concesionario) => res.status(200).json(concesionario))
    .catch((err) => console.error(err));
});

router.put("/:id", async (req, res) => {
  let mongoId = await mongoose.findOne({}, { _id: 1 }).skip(req.id);
  mongoose
    .findOneAndUpdate({ _id: mongoId }, { $set: req.body, $inc: { __v: 1 } })
    .then(() =>
      res.status(200).json({ message: "Concesionari actualizado con esxito" }),
    )
    .catch((err) => res.status(500).send("Errror inesperado", err));
});

router.delete("/:id", (req, res) => {
  concesionarios.splice(req.id, 1);
  res.json({ message: "Archivo borrado con exito" });
});

/*###############################################################*/
/*---------------------ruta Coches------------------------------*/
/*Middleware*/
router.use("/:id/coches/:cocheid", (req, res, next) => {
  if (concesionarios[req.id].coches.length <= req.params.cocheid) {
    res.status(400).json("El id de coche dado es muy alto");
  } else next();
});
/*----------*/

router.get("/:id/coches", (req, res) => {
  res.status(200).json(concesionarios[req.id].coches);
});
router.get("/:id/coches/:cocheid", (req, res) => {
  res.status(200).json(concesionarios[req.id].coches[req.params.cocheid]);
});

router.post("/:id/coches", (req, res) => {
  concesionarios[req.id].coches.push(req.body);
  res.json({ message: "Coche agregado con exito" });
});

router.put("/:id/coches/:cocheid", (req, res) => {
  concesionarios[req.id].coches[req.params.cocheid] = req.body;
  res.json({ message: "Coche actualizado con exito" });
});

router.delete("/:id/coches/:cocheid", (req, res) => {
  concesionarios[req.id].coches.splice(req.params.cocheid, 1);
  res.json({ message: "Coche borrado con exito" });
});
module.exports = router;
