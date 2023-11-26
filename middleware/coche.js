const express = require('express');
express().use(express.json())
const cochesKeys = ["modelo", "cv", "precio"]

module.exports = {
    checkBodyPost: (req, res, next) => {
        for (let coche of req.body.coches) {
            let cochesKeys = Object.keys(coche)
            cochesKeys = cochesKeys.filter((key) => cochesKeys.includes(key))
            if (cochesKeys.length === 3) {
                next()
                return;
            }
        }
        res.status(400).json({message: "EL cuerpo con los coches "})
    }, checkBodyPut: (req, res, next) => {
        let keys = Object.keys(req.body)
        keys = keys.filter(key => cochesKeys.includes(key))
        if (keys.length !== 3)
            res.status(400).json({message: "El cuerpo de la requesta esta mal formado"})
        else next()
    }
}