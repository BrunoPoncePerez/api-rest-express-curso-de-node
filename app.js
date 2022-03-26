const express = require('express');

const Joi = require('@hapi/joi');
const { func, exist } = require('@hapi/joi');


//instanciamos el elemento

const app = express();


/* Le indicamos cuales son los metodos que podemos implementar y cada uno de 
estos elementos tiene una ruta asignada... */

//app.get(); //peticion
//app.post(); //envio de datos hacia el servidor
/* 
envio de datos, se refiere que desde el cliente, vamos a tener que llamar a
este metodo de mi aplicacion con expres para poder enviarle informacion y por
lo tanto va a recibir informacion con el metodo post y esos datos va a servir
para hacer un registro en la base de datos o en cualquier componente dentro
de mi aplicacion
*/
//app.put(); //actualizacion
//app.delete(); //eliminacion

//por ahora solo utilizaremos GET

/*app.get('/', (req, res)=>{
     daremos una respuesta(res) con una propiedad de express
    que es (send = enviar) 
    res.send('Bienvenido Sr. R desde EXPRESS');
});*/

/* app.get('/api/usuarios', (req, res) =>{
    res.send( ['Virgil', 'Dr. Stark','Zimmerman', 'katzen', 'Hemingway']);
}) */

/* si ejecutamos acá, no pasará nada, ya que express no habilita la forma 
en la que nos va a responder y para ello tenemos que indicarle a travez de 
otra propiedad sobre que puerto va a escuchar la peticion de
este pequeño servidor web*/

/* app.listen(3000, ()=>{
    console.log('escuchando en el puerto 3000');
}) */


/**************************************************************************/


//VARIABLES DE ENTORNO O DEL SISTEMA

/* Supongamos que express esta escuchando unas peticiones a travez del 
puerto 3000, pero este puerto esta ocupado. Entonces tenemos que modificar
el script pero para evitar tocar o modificar codigo, lo que podemos hacer 
es generar una variable de entorno que pueda ser llamada por nuestra
aplicacion y que pueda tomar un puerto que nosotros le indiquemos como valor
de la variable*/

//creamos una constante

//const port = process.env.PORT || 3000;
/*lo que estamos haciendo aca es que el valor de esta constante va a ser 
igual al valor de la variable de entorno PORT, si no existe esta variable
de entorno entonces que tome uno que nosotros le vamos a asignar */

/* app.listen(port, ()=>{
    console.log(`escuchando en el puerto ${port}...`);
}) */

//CONSOLA 

/* 
C:\Users\Ponce\Desktop\nodeJs\06-Express-parte1>set PORT=5000
C:\Users\Ponce\Desktop\nodeJs\06-Express-parte1>nodemon app.js
[nodemon] 2.0.15
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node app.js`
escuchando en el puerto 5000... ==>VEMOS QUE CAMBIO DE PUERTO SIN MODIFICAR EL CODIGO
*/


/**************************************************************************/

//PARÁMETROS DE RUTAS


/*  app.get('/api/usuarios', (req, res) =>{
    res.send( ['Virgil', 'Dr. Stark','Zimmerman', 'katzen', 'Hemingway']);
})  */

/* esta ruta nos devuelve todos los usuarios que tenemos en nuestra aplicacion,
pero como hariamos para que nos devuelva solo un usuario. Para ello
tenemos que crearnos parámetros que luego nos servirian para hacer alguna 
operacion para obtener el dato de ese parámetro.

Usaremos un identificador de usuario para que nos devuelva ese usuario,
para que express reconozca que ese es un parametro le colocamos (:) detras
del id
 */

/* app.get('/api/usuarios/:id', (req, res) =>{
    res.send( req.params.id);
}) */

/**************************************************************************/

//manejo de solicitudes HTTP GET

/* const usuarios = [
    {id:1, nombre:'Bruno'},
    {id:2, nombre: 'Pedro'},
    {id:3, nombre: 'Json'}
]; */

/*app.get('/', (req, res)=>{
     daremos una respuesta(res) con una propiedad de express
   que es (send = enviar)  
   res.send('Bienvenido Sr. R desde EXPRESS');
})*/

/* app.get('/api/usuarios', (req, res) =>{
    res.send( ['Virgil', 'Dr. Stark','Zimmerman', 'katzen', 'Hemingway']);
}) 
 */
//app.get('/api/usuarios/:id', (req, res) =>{
    //let usuario = usuarios.find(u => u.id === parseInt(req.params.id));
    /* find nos permite buscar informacion en un arreglo
    de acuerdo a un valor que le vamos a indicar, pero a su vez esta funcion
    recibe una funcion interna que me va a permitir hacer esa busqueda y esta
    funcion recibe un parametro.
    
    Las peticiones get siempre vienen con un valor de tipo string y nostros le 
    indicamos un valor entero, por ende tenemos que convertirlo con un parse

    luego nos preguntamos...
    */
   //if(!usuario) res.status(404).send('El usuario no fue encontrado');
   //res.send(usuario);
//})

/* const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`escuchando en el puerto ${port}...`);
}) */

/**************************************************************************/

//MANEJO DE SOLICITUDES HTTP POST

/*Para las peticiones de tipo post hacemos uso de un 
middleboard para enviar datos con el formato JSON, para ello debemos decirle
a experess que parsee ese tipo de informacion cuando la recibe y para ello 
nos valemos de los middleboards que se conocen dentro de la arquitectura de express
 */

app.use(express.json()); /* despues de esto creamos una peticion de tipo post */

/* const usuarios = [
    {id:1, nombre:'Bruno'},
    {id:2, nombre: 'Pedro'},
    {id:3, nombre: 'Json'}
];

app.get('/', (req, res)=>{
    
   res.send('Bienvenido Sr. R desde EXPRESS');
})

app.get('/api/usuarios', (req, res) =>{
    res.send( ['Virgil', 'Dr. Stark','Zimmerman', 'katzen', 'Hemingway']);
}) 

app.get('/api/usuarios/:id', (req, res) =>{
    let usuario = usuarios.find(u => u.id === parseInt(req.params.id));
    
   if(!usuario) res.status(404).send('El usuario no fue encontrado');
   res.send(usuario);
}) */

/*****PETICION POST******/

//nos permite ingresar un usuario

/* app.post('/api/usuarios', (req, res)=>{
    const usuario = {
        id: usuarios.length + 1,
        nombre: req.body.nombre
    };
    usuario.push(usuario);
}) */

/*************************/

/* const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`escuchando en el puerto ${port}...`);
}) */


/**************************************************************************/

//PROBANDO PETICIONES CON POSTMAN

/* const usuarios = [
    {id:1, nombre:'Bruno'},
    {id:2, nombre: 'Pedro'},
    {id:3, nombre: 'Json'}
];

app.get('/', (req, res)=>{
    
   res.send('Bienvenido Sr. R desde EXPRESS');
})

app.get('/api/usuarios', (req, res) =>{
    res.send( ['Virgil', 'Dr. Stark','Zimmerman', 'katzen', 'Hemingway']);
}) 

app.get('/api/usuarios/:id', (req, res) =>{
    let usuario = usuarios.find(u => u.id === parseInt(req.params.id));
    
   if(!usuario) res.status(404).send('El usuario no fue encontrado');
   res.send(usuario);
}) */

/*****PETICION POST******/

//nos permite ingresar un usuario

/* app.post('/api/usuarios', (req, res)=>{
    const usuario = {
        id: usuarios.length + 1,
        nombre: req.body.nombre
    }
    usuarios.push(usuario);
    res.send(usuario);
}); */

/*************************/

/* const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`escuchando en el puerto ${port}...`);
}) */

/******************************************************************************/

//VALIDACION SENCILLA DE ENTRADA DE DATOS

/* ¿qué pasaria si no enviamos datos a travez del parametro nombre? */

/* const usuarios = [
    {id:1, nombre:'Bruno'},
    {id:2, nombre: 'Pedro'},
    {id:3, nombre: 'Json'}
];

app.get('/', (req, res)=>{
    
   res.send('Bienvenido Sr. R desde EXPRESS');
})

app.get('/api/usuarios', (req, res) =>{
    res.send( ['Virgil', 'Dr. Stark','Zimmerman', 'katzen', 'Hemingway']);
}) 

app.get('/api/usuarios/:id', (req, res) =>{
    let usuario = usuarios.find(u => u.id === parseInt(req.params.id));
    
   if(!usuario) res.status(404).send('El usuario no fue encontrado');
   res.send(usuario);
}) */

/*****PETICION POST******/

//nos permite ingresar un usuario

/* app.post('/api/usuarios', (req, res)=>{
    //VALIDACION!!
    if(!req.body.nombre || req.body.nombre.length <= 2){
        //400 BAD REQUEST = requerimiento no valido
        res.status(400).send('Debe ingresar un nombre y que tenga minimo tres letras')
        return;
        //importante!! darle un return por que se creará un usuario vacio 
    }
    //FIN DE VALIDACION

    const usuario = {
        id: usuarios.length + 1,
        nombre: req.body.nombre
    }
    usuarios.push(usuario);
    res.send(usuario);
}); */

/*************************/

/* const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`escuchando en el puerto ${port}...`);
}) */


/******************************************************************************/

//VALIDACION CON EL METODO JOI

/* el detalle con la validacion anterior es que tenemos que hacer una por
cada valor que deseemos validar. 
Utilizaremos joi que es un esquema para hacer validaciones, tenemos que 
instalar @hapi/joi */

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
    //let usuario = usuarios.find(u => u.id === parseInt(req.params.id));
    let usuario = existeUsuario(req.params.id);
   if(!usuario) res.status(404).send('El usuario no fue encontrado');
   res.send(usuario);
})

/*****PETICION POST******/

//nos permite ingresar un usuario

app.post('/api/usuarios', (req, res)=>{
    //definimos un squema
    const schema = Joi.object({
        nombre: Joi.string().min(3).required()
                               /*que sea dato requerido */
    })
    
    /* const resultado = schema.validate({nombre: req.body.nombre});
    console.log(resultado); */

/* recibimos el resultado en un destructuracion de datos */
    //const {error, value} = schema.validate({nombre: req.body.nombre});
     
    const {error, value} = validarUsuario(req.body.nombre)

    //validamos

    if(!error){
        const usuario = {
            id: usuarios.length + 1,
            nombre: value.nombre
        }
        usuarios.push(usuario);
        res.send(usuario);
    }else{
        /* para acceder directamente al arreglo de mensaje */
        const mensaje = error.details[0].message;
        res.status(400).send(mensaje)
    }

    /* CONSOLA de POSTMAN 
    {
    "_original": {
        "nombre": "BP"
    },
    "details": [
        {
            "message": "\"nombre\" length must be at least 3 characters long",
            "path": [
                "nombre"
            ],
            "type": "string.min",
            "context": {
                "limit": 3,
                "value": "BP",
                "label": "nombre",
                "key": "nombre"
            }
        }
    ]
}
    */



   /*  if(!req.body.nombre || req.body.nombre.length <= 2){
        res.status(400).send('Debe ingresar un nombre y que tenga minimo tres letras')
        return;
        }
    const usuario = {
        id: usuarios.length + 1,
        nombre: req.body.nombre
    }
    usuarios.push(usuario);
    res.send(usuario); */
})


/*************************/

/* const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`escuchando en el puerto ${port}...`);
}) */

/******************************************************************************/

//MANEJO DE SOLICITUDES PUT

/* es un metodo que se utiliza para actualizar la informacion */

app.put('/api/usuarios/:id',(req, res)=>{
    //encontrar si existe el objeto usuario que revisaremos
    //let usuario = usuarios.find(u => u.id === parseInt(req.params.id));
    let usuario = existeUsuario(req.params.id);
    if(!usuario) {
    res.status(404).send('El usuario no fue encontrado');
        return;
    }

    /* const schema = Joi.object({
        nombre: Joi.string().min(3).required()
                               //que sea dato requerido
    }) */

    const {error, value} = validarUsuario(req.body.nombre);
     
    if(error){
        const mensaje = error.details[0].message;
        res.status(400).send(mensaje);
        return;
    }

    usuario.nombre = value.nombre;
    res.send(usuario);
})



/* const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`escuchando en el puerto ${port}...`);
}) */

/**************************************************************************/

//FUNCIONES DE VALIDACION

/* function existeUsuario(id) { 
   return (usuarios.find(u => u.id === parseInt(id)));
}

function validarUsuario(nom) {
    const schema = Joi.object({
        nombre: Joi.string().min(3).required()
     })
    return(schema.validate({nombre: nom}));                     
} */

/* hasta acá tendriamos un metodo tanto para ver si existe y para
validar al usuario */


/**************************************************************************/

//MANEJO DE SOLICITUDES HTTP DELETE

app.delete('/api/usuarios/:id', (req, res) =>{
//a tener en cuenta antes de una eliminacion
//saber si un id existe dentro del arreglo usuarios
let usuario = existeUsuario(req.params.id);
if(!usuario){
    res.status(404).send('El usuario no fue encontrado');
    return;
}
//encontrar el indice del usuario seleccionado para luego hacer la eliminacion con el metodo splice

const index = usuarios.indexOf(usuario);//obtenemos el usuario
usuarios.splice(index, 1);//eliminamos...
/* eliminamos del index un elemento, si no le ponemos el 1 nos eliminaria todos los
elementos que estan en el arreglo */

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