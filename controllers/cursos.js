const express = require('express');
const Curso = require('../models/curso_model');
const Joi = require('@hapi/joi');
const ruta = express.Router();


ruta.get('/', (req,res)=>{
    res.json('respuesta a petición GET de CURSOS funcionando correctamente...');

});


module.exports = ruta;