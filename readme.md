Inicar el package json npm init
Instalar dependencias
<li>npm i express --save (--save para que se guarde en json)</li>
<li>npm i -D nodemon (-D para que sea dependencia de desarrollo)</li>
<li>npm i morgan --save (Esta es para ver en consola datos de cada consulta, url, medotodo usado, tiempo, etc).</li>

Armar servidor
```
const express = require('express');
//require('./functions')
const morgan = require('morgan');
const app = express();
const port = 3001;

app.use(morgan(':url :status :response-time ms'))
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
//Debe mostrar en el browser "Hola mundo"
//Puede haber problemas con el puerto, si esta en uso por otra app.
//Lo deben cambiar.
app.get('/', (req, res) => {
    res.send("Hola mundo")
})
```

Con esto ya se debe poder visualizar en el puerto del localhost, en mi caso en el puerto 3001.
```
http://localhost:3001/
```
<h3>Archivo "Functions"</h3>
En el caso de este proyecto cree un archivo "functions" con un "index.js", donde coloque las funciones que voy a utilizar en las rutas. Declare un array de posts que contenga en cada caso un objeto post, tambien cree una funcion generadora de "id" que cada ves que se llama genera un "++id".

<h3>Codigo functions</h3>


```
/*****************************************
 * Ej. Post                              *
 ****************************************/
//Creacion de array post
let posts = [
    {
        id: 1,
        title: "Un titulo 1",
        content: "Un contenido 1",
    }, {
        id: 2,
        title: "Un titulo 2",
        content: "Un contenido 2",
    }]
/**********************************************
 * Closure, function generadora de id.Ej. Post*
 *********************************************/
const idGenerator = function () {
    let id = 2;
    return () => {
        return ++id;//id = id + 1;
    }
}();
/*********************************************
 * Postear, crear un post nuevo y agregarlo al
 array*
 *********************************************/

const postf = (title, content) => {
    const post = {
        id: idGenerator(),
        title,
        content
    }
    posts.push(post);
    return post;
};
/**********************************************
 * Get post, obtener el todo el array con los posts*
 *********************************************/
const getPostsf = () => {
    return posts;
}
/**********************************************
 * Put post, modificar un post, un objeto del array*
 *********************************************/
const putPostf = (id, title = "no title", content = "no content") => {
    const index = posts.findIndex(post => post.id == id)
    const post = {
        id,
        title,
        content
    }
    posts.splice(index, 1, post)
    return post;
}
/**********************************************
 * Delete post, obtener el todo el array con los posts*
 *********************************************/
const deletePostf = (id=1) => posts = posts.filter(post=>post.id != id)

/**********************************************
 * exporto los modulos para usarlos en otro archivo*
 *********************************************/
module.exports = { posts, postf, putPostf, deletePostf, getPostsf}
```
<h3>Servidor</h3>

Despues de esto, hago la carpeta "Server" con un "index.js" para importar mi modulo de "functions", "express" y "morgan"(no es necesario, morgan), luego creamos los Middlewares necesarios y las rutas que se van a usar.

<h3>Archivo "server"</h3>

```
/**********************************************
 *Importaciones importantes*
 *********************************************/

let { posts, postf, putPostf, deletePostf, getPostsf } = require('../functions')
const express = require('express');
const morgan = require('morgan');
const app = express();
const port = 3001;

/**********************************************
 *Middlewares   *
 *********************************************/
//Morgan retorna url de consulta, estatus de respuesta y tiempo de respuesta
//en la consola cada vez que hay consulta al server.

app.use(morgan(':url :status :response-time ms'))
app.use(express.json());

/**********************************************
 *Listen, es un metodo de express para escuchar el puerto.   *
 *********************************************/
app.listen(port, () => {
    console.log(`Ejemplo app listening at http://localhost:${port}`)
})
/**********************************************
 *Get, retorna todos los post.   *
 *********************************************/
app.get('/', (req, res) => {
    let arr = getPostsf()
    return res.send(arr)
})
/**********************************************
 *Post, crea un post nuevo.   *
 *********************************************/
app.post('/post', (req, res) => {
    const {title, content} = req.body
    res.send(postf(title, content))
})
/**********************************************
 *Modifica un post existente   *
 *********************************************/
app.put('/post/:id', (req, res) => {
    const {title,content} = req.body;
    const {id} = req.params
    res.send(putPostf(id,title,content))
})

/**********************************************
 *app.delete('/post/:id', (req, res) => {
    const id = parseInt(req.params.id)
    res.send(deletePostf(id))
})   *
 *********************************************/

```
