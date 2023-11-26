const express = require('express');
express().use(express.json);
const router = express.Router();
const concesionarios = require('../listaConcesionarios');
const middlewareConcesioanario = require('../middleware/concesionario');
const middlewareCoches = require('../middleware/coche');
/*###############################################################*/
/*---------------------routerConcesionarios----------------------*/
/*______________Middleware_____________________________*/
router.use(middlewareConcesioanario.checkBody)
router.use('/:id', middlewareConcesioanario.hasConcesionario)
/*__________________________________________________*/
router.get('/', (req, res) => {
    res.status(200).json(concesionarios)
})

router.post('/', (req, res) => {
    concesionarios.push(req.body)
    res.status(201).json({message: "Concesionario agregado con exito"})
})
router.get('/:id', (req, res) => {
    res.json(concesionarios[req.id]);
})

router.put('/:id', (req, res) => {
    console.log(req.id)
    concesionarios[req.id] = req.body;

    res.json({message: "El concesionario ha sido actualizado con exito"})
})

router.delete('/:id', (req, res) => {
    concesionarios.splice(req.id, 1)
    res.json({message: "Archivo borrado con exito"})
})


/*###############################################################*/
/*---------------------ruta Coches------------------------------*/
/*Middleware*/
router.post('/:id/coches', middlewareCoches.checkBodyPost)
router.put('/:id/coches', middlewareCoches.checkBodyPut)
router.use('/:id/coches/:cocheid', (req, res, next) => {
    if (concesionarios[req.id].coches.length <= req.params.cocheid) {
        res.status(400).json('El id de coche dado es muy alto')
    } else next()
})
/*----------*/

router.get('/:id/coches', (req, res) => {
    res.status(200).json(concesionarios[req.id].coches)
})
router.get('/:id/coches/:cocheid', (req, res) => {
    res.status(200).json(concesionarios[req.id].coches[req.params.cocheid])
})

router.post('/:id/coches', (req, res) =>{
    concesionarios[req.id].coches.push(req.body)
    res.json({message:"Coche agregado con exito"})
})

router.put('/:id/coches/:cocheid', (req, res) =>{
    concesionarios[req.id].coches[req.params.cocheid] = req.body
    res.json({message:"Coche actualizado con exito"})
})

router.delete('/:id/coches/:cocheid',(req, res) =>{
    concesionarios[req.id].coches.splice(req.params.cocheid, 1)
    res.json({message:"Coche borrado con exito"})
})
module.exports = router
