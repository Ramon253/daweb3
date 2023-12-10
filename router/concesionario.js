const express = require("express");
const router = express.Router();
const routerCoche = require("./coche");
const middlewareConcesioanario = require("../middleware/concesionario");
const mongoose = require("../models/concesionario");
express().use(express.json);

/*###############################################################*/
/*---------------------routerConcesionarios----------------------*/
/*______________Middleware_____________________________*/

router.use(middlewareConcesioanario.checkBody);
router.use("/:id", middlewareConcesioanario.hasConcesionarioId);

/*__________________________________________________*/
router.get("/", async (req, res) => {
  mongoose
    .find()
    .select("-__v")
    .then((concesionarios) => res.status(200).json(concesionarios))
    .catch((err) => {
      res.status(500);
      console.error(err);
    });
});

router.post("/", (req, res) => {
  mongoose
    .insertMany(req.body)
    .then(() =>
      res.status(201).json({ message: "Concesionario creado con exito" }),
    );
});

router.get("/:id", (req, res) => {
  mongoose
    .findOne({ _id: req.id })
    .select("-__v")
    .then((concesionario) => res.status(200).json(concesionario))
    .catch((err) => console.error(err));
});

router.put("/:id", async (req, res) => {
  mongoose
    .findOneAndUpdate({ _id: req.id }, { $set: req.body, $inc: { __v: 1 } })
    .then(() =>
      res.status(200).json({ message: "Concesionari actualizado con esxito" }),
    )
    .catch((err) => res.status(500).send("Errror inesperado" + err));
});

router.delete("/:id", async (req, res) => {
  mongoose
    .findOneAndDelete({ _id: req.id })
    .then(() => {
      res.status(200).json({ message: "Concesionario eliminado con exito" });
    })
    .catch((err) => res.status(500).send("Errror inesperado" + err));
});

router.use("/:id/coches", routerCoche);

module.exports = router;
