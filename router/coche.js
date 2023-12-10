const express = require("express");
const router = express.Router();
express().use(express.json);
const middleware = require("../middleware/coche");
const mongoose = require("../models/concesionario");

router.put("/", (req, res, next) => {
  if (middleware.checkBodyCoche(Object.keys(req.body))) {
    next();
    return;
  }
  res.status(400).json({
    Message:
      "Debes enviar un cuerpo con la request, o el cuerpo de la request no es valido",
  });
});
router.post("/", (req, res, next) => {
  if (middleware.checkBodyCoche(Object.keys(req.body))) {
    next();
    return;
  }
  res.status(400).json({
    Message:
      "Debes enviar un cuerpo con la request, o el cuerpo de la request no es valido",
  });
});

router.get("/", (req, res) => {
  getCar(req.id)
    .then((cars) => {
      res.status(200).json(cars);
    })
});
router.get("/:id", (req, res) => {
  getCar(req.id, req.params.id).then((coche) => {
    if (!coche) {
      res
        .status(404)
        .send(
          "El ID del coche dado es incorrecto",
        );
    } else res.status(200).json(coche);
  });
});

router.post("/", (req, res) => {
  mongoose
    .findOneAndUpdate({ _id: req.id }, { $push: { coches: req.body } })
    .then(() => res.json({ message: "Coche agregado con exito" }));
});

router.put("/:id", async (req, res) => {
  let coches = await getCar(req.id);
  if (isNaN(req.params.id)){
    for (const cochesKey in coches.coches) {
      if(coches.coches[cochesKey]._id.valueOf() === req.params.id) {
        coches.coches[cochesKey] = req.body
        res.status(200).json({ message: "Coche actualizado con exito" });
        coches.save();
        return;
      }
    }
    res.status(404).json({Message:"El ObjectID del coche dado no existe"})
    return;
  }
  if (req.params.id >= coches.coches.length){
    res.status(404).json({Message: "El indice del coche dado es muy alto"})
  }
  coches.coches[req.params.id] = req.body;
  coches.save();
  res.status(200).json({ message: "Coche actualizado con exito" });
});

router.delete("/:id", async (req, res) => {
  let coche = await getCar(req.id, req.params.id);
  if (!coche){
    res.status(404).json({ Message: "El id dado no existe" });
    return;
  }
  mongoose
    .updateOne(
      { _id: req.id },
      {
        $pull: { coches: { _id: coche._id } },
      },
    )
    .then(() => {
      res.status(200).json({ Message: "Coche eliminado con exito" });
    });
});

async function getCar(id, carId = -1) {
  if (carId === -1) return mongoose.findOne({ _id: id }).select("coches");

  let coches = await mongoose.findOne({ _id: id }).select("coches");
  if (isNaN(carId)) {
    for (const coche of coches.coches) {
        if (coche._id.valueOf() === carId) return coche
    }
    return false;
  }
  if (coches.coches.length <= carId) {
    return false;
  }
  return coches.coches[carId];
}

module.exports = router;
