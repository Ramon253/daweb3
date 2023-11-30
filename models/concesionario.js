const mongoose = require("mongoose");

const concesionariosSchema = new mongoose.Schema({
  nombre: { type: String, require: true },
  direccion: { type: String, require: true },
  coches: {
    type: [
      {
        modelo: { type: String , require},
        cv: { type: String , require},
        precio: { type: String , require},
      },
    ],
    require: false,
  },
});

module.exports = mongoose.model("concesionarios", concesionariosSchema);
