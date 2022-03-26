const express = require('express');
const config = require('config');
/* llamamos a la funcion que creamos en otra carpeta */
//const logger = require('./app2-logger');
const morgan = require('morgan');
/* en algun momento vamos a querer guardar un registro de todas las peticiones
http de nuestro servidor en otra caarpeta, y para ello morgan nos facilitará 
mucho */
const Joi = require('@hapi/joi');
const { func, exist } = require('@hapi/joi');
const app = express();
app.use(express.json());//este es un MW que recibe las peticiones del body de la peticion del usuario
app.use(express.urlencoded({extended:true}));
/* muchas aplicaciones no utilizan los json al momento de hacer peticiones
o recibirlas, usan querystring para ello, y para esto utilizamos la 
propiedad de URLENCODE de expres, para poder leer los datos en otro formato
 */
app.use(express.static('public'));

/* en algun momento vamos a querer guardar un registro de todas las peticiones
http de nuestro servidor en otra caarpeta, y para ello morgan nos facilitará 
mucho */

//configuracion de entorno 
console.log('aplicacion: ' + config.get('nombre'));
console.log('BD server: ' + config.get('configDB.host'));

/* SET NODE_ENV=production utilizar ese comando en la consola */

/* FUNCIONES DE MIDDLEwARE

dentro de NODE, un middleware es un bloque de codigo que se va a ejecutar
entre la peticion del usuario(REQUEST), hasta la peticion que llega al
servidor. Es decir, desde el momento en que el usuario hace la peticion
hasta que llega al servidor, puede haber una funcion middleware entre ese
enlace hasta que el servidor pueda dar una respuesta. Hemos estado usando 
middleware dentro de la estructura de EXPERESS ya que este es una infraestructura
web de direccionamiento de middleware para que pueda tener una funcionalidad
minima propia. Una aplicacion de EXPRESS es una serie de llamadas de este tipo.
Son funciones que tienen acceso al objeto de solicitud request y al de respuesta que puede
ser que envie ese objeto de respuesta al cliente o en todo caso puede llamar
a otra funcion middleware
*/

//SOLICITUDES DE PROCESAMIENTO CANALIZADOS

/*              funcion de EXPRESS
           ╔═════════════════════════════╗
REQUEST  =======> jason() ----> route() =======> RESPONSE
           ╚═════════════════════════════╝

json() que es una funcion MW envia una respuesta a otra funcion MWque 
seria en este caso route(), route() analiza es request y envia una 
respuesta al cliente.
la funcion json tiene un response pero este es enviado a otra funcion
route que puede ser GET, POST, PUT, DELETE, recibe ese request y envia una
respuesta hacia el usuario, de esta forma se canaliza el procesamiento
de estas solicitudes a travez de varias funciones MW.
Las funciones MW pueden realizar diferentes tareas:
-pueden ejecutar cualquier tipo de codigo
-pueden realizar cambios en las solicitudes y objetos de respuesta
-pueden finalizar el ciclo de solicitudes y respuesta
-invocan a otras funciones mw dentro de la pila de funciones
 */

/* habiamos dicho que la funcion mw se ejecuta en el momento en el que se 
hace la peticion del cliente */

/*app.use((req,res,next)=>{
  //next para que siga la siguiente funcion 
  console.log('logging...');  
  next();
})*/

/* app.use((req,res,next)=>{
    console.log('autenticando');
    next();
}) */

/* ahora hacemos referencia a la funcion del archivo logger */
//app.use(logger);

/* entonces estos tres elementos se invocan antes de llamar a las funciones
de tipo ruta de express */

//USO DE UN MW DE TERCEROS
app.use(morgan('tiny'));
console.log('morgan habilitado')


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
    /* const schema = Joi.object({
        nombre: Joi.string().min(3).required()
    })
    
    const {error, value} = validarUsuario(req.body.nombre)

    if(!error){
        const usuario = {
            id: usuarios.length + 1,
            nombre: value.nombre
        }
        usuarios.push(usuario);
        res.send(usuario);
    }else{
        const mensaje = error.details[0].message;
        res.status(400).send(mensaje)
    } */
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