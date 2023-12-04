const mongoose = require("mongoose");

const concesionariosSchema = new mongoose.Schema({
  nombre: { type: String, require: true },
  direccion: { type: String, require: true },
  coches: {
    type: [
      {
        modelo: { type: String, require: true },
        cv: { type: Number, require: true },
        precio: { type: Number, require: true },
      },
    ],
    require: true,
  },
});

module.exports = mongoose.model("concesionarios", concesionariosSchema);
