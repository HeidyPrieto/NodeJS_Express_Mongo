const express = require('express');
const Usuario = require('../models/usuario_model');
const ruta = express.Router();
const Joi = require('@hapi/joi');


// Endpoint de tipo GET para el recurso usuarios. Lista todos los usuarios
ruta.get('/',(req, res) =>{
    let resultado = listarUsuarioActivos();
    resultado.then(usuarios => {
    res.json(usuarios)
    }).catch(err => {
    res.status(400).json(
        {
            err
        }
    )
    })
});


//Validaciones para el objeto usuario
const schema = Joi.object({
    nombre: Joi.string()
    .min(3)
    .max(30)
    .required()
    .pattern(/^[A-Za-záéíóú ]{3,30}$/),

password: Joi.string()
.pattern(/^[a-zA-Z0-9]{3,30}$/),

email:Joi.string()
.email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'edu', 'co']}})
});

module.exports = ruta;

//Endpoint de tipo POST para el recurso USUARIOS
ruta.post('/', (req, res) => {
    let body = req.body;

    const {error, value} = schema.validate({nombre: body.nombre, email: body.email});
    if(!error){
    let resultado = crearUsuario(body);

    resultado.then( user => {
    res.json({
    valor: user
    })
    }).catch( err  => {
    res.status(400).json({
        err
    })
});
    }else{
    res.status(400).json({
    error
    })
}
});
    
//Función asincrona para crear un objeto de tipo usuario
async function crearUsuario(body){
    let usuario = new Usuario({
email : body.email,
nombre : body.nombre,
password : body.password
    });
    return await usuario.save();
}












//endpoint de tipo DELETE para  el recurso USUARIOS
ruta.delete('/:email',(req, res)=> {
    let resultado = desactivarUsuario(req.params.email);
    resultado.then(valor => {
        res.json({
            usuario: valor
        })
    }).catch(err => {
        res.status(400).json({
            err
        })
    });
});









//Funcion asincrona para inactivar un usuario 
async function desactivarUsuario(email){
    let usuario = await  Usuario.findOneAndUpdate({"email": email},{
        $set: {
            estado:false
        } 
    },{new: true});
    return usuario;
}














// Función asíncrona para listar todos los usuarios activos
async function listarUsuarioActivos(){
    let usuarios = await Usuario.find({"estado": true});
    return usuarios;
}