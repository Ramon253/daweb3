const express = require('express');
express().use(express.json);
const router = express.Router();

const concesionarios = [
    {
        nombre: "Atalaya Motor Audi",
        direcion: "free zone, C. Chiclana, 0 s/n, 11011 Cádiz",
        coches: [
            {modelo: "A1", cv: 110, precio: 30000},
            {modelo: "A3 Sedan", cv: 116, precio: 40000},
            {modelo: "A6", cv: 204, precio: 50000}
        ]
    },
    {
        nombre: "Nimauto El Puerto de Sta María",
        direccion: "Ctra. Madrid-Cadiz. Km 650, 11500 El Puerto de Sta María, Cádiz",
        coches: [
            {modelo: "Yaris", cv: 116, precio: 20000},
            {modelo: "Mirai", cv: 182, precio: 75000},
            {modelo: "GR Supra", cv: 340, precio: 61000}
        ]
    },
    {
        nombre: "Automoción Terry | Concesionario y Servicio Oficial SEAT en Cádiz",
        direcion: "C. Villa de Rota, S/N, 11011 Cádiz",
        coches: [
            {modelo: "Arona", cv: 95, precio: 18000},
            {modelo: "Ibiza", cv: 80, precio: 15000},
            {modelo: "Leon", cv: 110, precio: 21000}
        ]
    }
]
router.get('/', (req, res) => {
    res.json(concesionarios)
})

router.post('/', (req, res) => {
    concesionarios.push(req.body)
})

module.exports = {
    "router": router,
    "concesionarios": concesionarios
}
router.use('/:id', (req, res, next) => {
    req.id = req.params.id
    if (req.id >= concesionarios.length) {
        res.status(204);
    }else next();
})

router.get('/:id', (req, res) => {
    res.json(concesionarios[req.id]);
})

router.put('/:id', (req, res) => {

})


/*
DELETE /concesionarios/:id → borra un concesionario
*/
