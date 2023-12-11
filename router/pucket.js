const express = require("express");
const router = express.Router();
const mongoose = require("../models/greidsla");

router.get("/", (req, res) => {
  mongoose
    .findOne({ _id: req.id })
    .select("puckets")
    .then((puckets) => res.status(200).json(puckets));
});

router.get("/:id", (req, res) => {
  mongoose
    .findOne({ _id: req.id })
    .select("puckets")
    .then((pucket) => {
      if (isNaN(req.params.id)) {
        for (const pucketElement of pucket.puckets) {
          if (pucketElement._id.valueOf() === req.params.id) {
            res.status(200).json(pucketElement);
            return;
          }
        }
      } else res.status(200).json(pucket.puckets[req.params.id]);
    });
});

router.post("/", (req, res) => {
  mongoose
    .findOneAndUpdate(
      { _id: req.id },
      {
        $push: {
          puckets: req.body,
        },
      },
    )
    .then((element) => {
      res
        .status(200)
        .json({ Message: "Pucket Agregado con exito", pucket: element });
    });
});

router.put("/:id", async (req, res) => {
  const doc = await mongoose.findOne({ _id: req.id });
  if (isNaN(req.params.id)) {
    for (const pucketKey in doc.puckets) {
      if (doc.puckets[pucketKey]._id.valueOf() === req.params.id) {
        doc.puckets[pucketKey] = req.body;
        res.status(200).json({ message: "Pucket actualizado con exito" });
        doc.save();
        return;
      }
    }
  } else doc.puckets[req.params.id] = req.body;
  res.status(200).json({ message: "Pucket actualizado con exito" });
});

router.delete("/:id", async (req, res) => {
  const doc = await mongoose.findOne({ _id: req.id });
  if (isNaN(req.params.id)) {
    for (const pucketKey in doc.puckets) {
      if (doc.puckets[pucketKey]._id.valueOf() === req.params.id) {
        doc.puckets.splice(pucketKey, 1);
        res.status(200).json({ message: "Pucket eliminado con exito" });
        doc.save();
        return;
      }
    }
  } else doc.puckets.splice(req.params.id, 1);
  res.status(200).json({ message: "Pucket actualizado con exito" });
});

module.exports = router;
