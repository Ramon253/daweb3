const express = require("express");
const router = express.Router();
const pucketsRouter = require('./pucket')
const mongoose = require("../models/greidsla");
const middleware = require("../middleware/greidsla");

router.use(middleware.checkGreidslaBody);
router.use("/:id", middleware.checkId);
router.get("/", (req, res) => {
  mongoose
    .find()
    .select("-__v")
    .then((element) => {
      res.status(200).json(element);
    });
});

router.post("/", (req, res) => {
  mongoose
    .insertMany(req.body)
    .then(() => {
      res.status(200).json({ Message: "Greidsla agregado con exito" });
    })
    .catch((err) => {
      res.status(400).send(err.errors);
    });
});

router.get("/:id", (req, res) => {
  mongoose
    .findOne({ _id: req.id })
    .select("-__v")
    .then((greidsla) => {
      console.log(greidsla);
      res.status(200).json(greidsla);
    });
});

router.put("/:id", (req, res) => {
  mongoose
    .findOneAndUpdate(
      { _id: req.id },
      { $set: req.body, $inc: { __v: 1 } },
      { runValidators: true },
    )
    .then((element) => {
      res.status(200).json({ Message: "greidsla actualizado con exito" });
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});
router.delete("/:id", (req, res) => {
  mongoose.findOneAndDelete({ _id: req.id }).then((element) => {
    res
      .status(200)
      .json({ Message: "Greidsla eliminado con exito", greidsla: element });
  });
});

router.use('/:id/puckets',pucketsRouter)
module.exports = router;
