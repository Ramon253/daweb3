const express = require('express');
express().use(express.json())
const cochesKeys = ["modelo", "cv", "precio"]

module.exports = {
    checkBody: (req, res, next) => {
        if (req.method === 'GET' || req.method === 'DELETE') {
            next()
            return;
        }

        let keys = Object.keys(req.body)
        keys = keys.filter(key => cochesKeys.includes(key))
        if (keys.length !== 3)
            res.status(400).json({message: "El cuerpo de la requesta esta mal formado"})
        else next()
    }
}