const mongoose = require("mongoose");

const greidslaSchema = new mongoose.Schema({
    nombre: { type: String, require: true },
    fecha: { type: Date, require: true },
    ciudad: { type: String, require: true },
    puckets: {
      type : [
        {
          descripcion: { type: String, require: true },
          precio: { type: Number, require: true },
          cantidad: { type: Number, require: true }
        }
        ],
      require: false
    }
  });

const greidslaModel = mongoose.model("greidsla",greidslaSchema)

module.exports = greidslaModel;