const express = require("express");
const router = express.Router();
express().use(express.json);
const middleware = require("../middleware/coche");
const mongoose = require("../models/concesionario");

router.put("/", (req, res, next) => {
	if (middleware.checkBodyCoche(req.body)) {
		next();
		return;
	}
	res.status(400).json({
		Message:
			"Debes enviar un cuerpo con la request, o el cuerpo de la request no es valido"
	});
});
router.post("/", (req, res, next) => {
	if (middleware.checkBodyCoche(req.body)) {
		next();
		return;
	}
	res.status(400).json({
		Message:
			"Debes enviar un cuerpo con la request, o el cuerpo de la request no es valido"
	});
});

router.get("/", (req, res) => {
	getCar(req.id)
		.then((cars) => {
			res.status(200).json(cars);
		})
		.catch((err) => res.status(500));
});
router.get("/:id", (req, res) => {
	getCar(req.id, req.params.id).then((coche) => {
		if (!coche) {
			res
				.status(400)
				.send(
					"no hay tantos coches en el concesionario, pruebe un id mas bajo"
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
	let coche = await getCar(req.id);
	if (!coche) res.status(400);

	coche.coches[req.params.id] = req.body;
	coche.save();
	res.status(200).json({message:"Coche agregado con exito"});
});

router.delete("/:id", async (req, res) => {
	let coche = await getCar(req.id, req.params.id);
	mongoose
		.updateOne(
			{ _id: req.id },
			{
				$pull: { coches: { _id: coche._id } }
			}
		)
		.then(() => res.status(200).send("Eliminado con exito"));
});

async function getCar(id, carId = -1) {
	if (carId === -1) {
		return mongoose.findOne({ _id: id }).select("coches");
	} else {
		let coches = await mongoose.findOne({ _id: id }).select("coches");
		if (coches.coches.length <= carId) {
			return false;
		}
		return coches.coches[carId];
	}
}

module.exports = router;
