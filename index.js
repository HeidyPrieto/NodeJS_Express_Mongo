const usuarios = require ('./controllers/usuarios');
const cursos = require ('./controllers/cursos');


const express = require('express');
const mongoose = require ('mongoose');

//Conexión a la base de daos mongodb
mongoose.connect('mongodb://localhost:27017/usercoursesdb', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('Conectando a MongoDB...'))
.catch(err => console.log('No se pudo conectar con MongoDB..', err));



//middleware
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//end points (recursos)

app.use('/api/usuarios', usuarios);
app.use('/api/cursos', cursos);


const port = process.env.PORT || 3006;
app.listen(port, () => {
    console.log('Api REST Ok, y ejecutándose...');
})