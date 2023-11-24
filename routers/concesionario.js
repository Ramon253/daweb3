const express = require('express');
express().use(express.json);
const router = express.Router();
const concesionarios = require('../listaConcesionarios')
const middleware = require('../middleware/concesionarioMWare')

/*______________Middleware_____________________________*/
router.use(middleware.checkBody)
router.use('/:id', middleware.hasID)
/*__________________________________________________*/
router.get('/', (req, res) => {
    res.json(concesionarios)
})

router.post('/', (req, res) => {
    concesionarios.push(req.body)
    res.status(201).json({message: "Concesionario agregado con exito"})
})
router.get('/:id', (req, res) => {
    res.json(concesionarios[req.id]);
})

router.put('/:id', (req, res) => {
        concesionarios[req.id] = req.body;
        res.json({message: "El concesionario ha sido actualizado con exito"})
})

router.delete('/:id', (req, res) => {
    concesionarios.splice(req.id, 1)
    res.json({message: "Archivo borrado con exito"})
})


module.exports = router
