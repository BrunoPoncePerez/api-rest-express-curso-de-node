const debug = require('debug')('app:inicio');
//const dbDebug= require('debug')('app:db');
/* el parametro app:inicio sera como un entorno para la depuracion */
const express = require('express');
const config = require('config');

const morgan = require('morgan');
const Joi = require('@hapi/joi');
const { func, exist } = require('@hapi/joi');
const app = express();
app.use(express.json());//este es un MW que recibe las peticiones del body de la peticion del usuario
app.use(express.urlencoded({extended:true}));

app.use(express.static('public'));

//configuracion de entorno 
console.log('aplicacion: ' + config.get('nombre'));
console.log('BD server: ' + config.get('configDB.host'));


/*lo ideal seria que morgan se muestre cuando estemos en modo desarrollo,
ya que nos interesa saber cuales son los loops que vamos a utilizar en 
nuestra aplicacion*/
if(app.get('env') === 'development'){
    app.use(morgan('tiny'));
    //console.log('Morgan habilitado...')
    debug('Morgan está habilitado');
}//esto funciona siempre y cuando estemos en un entorno de desarrollo
/* existe un modulo que nos permite trabjar la depuracion de una forma más sencilla, es
el modulo DEBUG */

//supongamos que estamos trabando con  la base de datos
debug('conectando con la db...');

const usuarios = [
    {id:1, nombre:'Bruno'},
    {id:2, nombre: 'Pedro'},
    {id:3, nombre: 'Json'}
];

app.get('/', (req, res)=>{
    
   res.send('Bienvenido Sr. R desde EXPRESS');
})

app.get('/api/usuarios', (req, res) =>{
    res.send(usuarios);
}) 

app.get('/api/usuarios/:id', (req, res) =>{
    let usuario = existeUsuario(req.params.id);
   if(!usuario) res.status(404).send('El usuario no fue encontrado');
   res.send(usuario);
})


app.post('/api/usuarios', (req, res)=>{

    let body = req.body;
    console.log(body.nombre);
    res.json({
        body
    })
})
app.put('/api/usuarios/:id',(req, res)=>{
    let usuario = existeUsuario(req.params.id);
    if(!usuario) {
    res.status(404).send('El usuario no fue encontrado');
        return;
    }

    const {error, value} = validarUsuario(req.body.nombre);
     
    if(error){
        const mensaje = error.details[0].message;
        res.status(400).send(mensaje);
        return;
    }

    usuario.nombre = value.nombre;
    res.send(usuario);
})

app.delete('/api/usuarios/:id', (req, res) =>{
let usuario = existeUsuario(req.params.id);
if(!usuario){
    res.status(404).send('El usuario no fue encontrado');
    return;
}

const index = usuarios.indexOf(usuario);//obtenemos el usuario
usuarios.splice(index, 1);//eliminamos...
res.send(usuario);
})

const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`escuchando en el puerto ${port}...`);
})


function existeUsuario(id) { 
   return (usuarios.find(u => u.id === parseInt(id)));
}

function validarUsuario(nom) {
    const schema = Joi.object({
        nombre: Joi.string().min(3).required()
     })
    return(schema.validate({nombre: nom}));                     
}