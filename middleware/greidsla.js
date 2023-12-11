const greidslaKeys = ["nombre", "fecha", "ciudad"];
const pucketKeys = ["descripcion", "precio", "cantidad"]
const mongoose = require("../models/greidsla");
const checkGreidslaBody = (req, res, next) => {
  if (req.method === "GET" || req.method === "DELETE") {
    next();
    return;
  }

  let reqKeys = Object.keys(req.body);
  reqKeys = reqKeys.filter((key) => pucketKeys.includes(key));
  if (reqKeys.length === 3){
    next();
    return;
  }

  reqKeys = Object.keys(req.body);
  reqKeys = reqKeys.filter((key) => greidslaKeys.includes(key));
  if (reqKeys.length < 3) {
    res.status(200).json({ Message: "Cuerpo de la request mal formado" });
    return;
  }
  next();
};

const checkId = (req, res, next) => {
  if (isNaN(req.params.id)) {
    mongoose.findOne({ _id: req.params.id }).then(() =>{
      req.id = req.params.id;
      next();
    }).catch(err =>{
      res.status(400).json({Message : "El id introducido de greidsla no existe"})
    });
  }
};

module.exports = { checkGreidslaBody, checkId };
