const express = require('express');
const concesionarios = require("../listaConcesionarios");
express().use(express.json)
const bodyKeys = ["nombre", "direccion", "coches"]
const cochesKeys = ["modelo", "cv", "precio"]

module.exports = {
    checkBody: (req, res, next) => {
        if (req.method === "GET" || req.method === "DELETE") {
            next()
            return;
        }
        let reqBodyKeys = Object.keys(req.body)

        if (cochesKeys.includes(reqBodyKeys[0])){
            next()
            return;
        }

        reqBodyKeys = reqBodyKeys.filter(key => bodyKeys.includes(key))
        if (reqBodyKeys.length !== 3) {
            res.status(400).json({Message: "Debes enviar un cuerpo con la request, o el cuerpo de la request no es valido"})
            return;
        }


        for (let coche of req.body.coches) {
            let reqCochesKeys = Object.keys(coche)
            reqCochesKeys = reqCochesKeys.filter((key) => cochesKeys.includes(key))

            if (reqCochesKeys.length !== 3) {
                res.status(400).json({Message: "El campo de coches es incorrecto"})
                return;
            }
        }

        next()
    },
    hasConcesionario: (req, res, next) => {
        req.id = req.params.id
        if (req.id >= concesionarios.length) {
            res.status(404).json({message: "El id dado es muy grande"});
        } else next();
    },

}


