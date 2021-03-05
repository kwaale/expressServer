let { posts, postf, putPostf, deletePostf, getPostsf } = require('../functions')
//var bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const app = express();
const port = 3001;

app.use(morgan(':url :status :response-time ms'))
app.use(express.json());
app.listen(port, () => {
    console.log(`Ejemplo app listening at http://localhost:${port}`)
})
//Retorna los todos los post existentes
app.get('/', (req, res) => {
    let arr = getPostsf()//.map(e=><li>${e}</li>)
    return res.send(arr)
})
app.post('/post', (req, res) => {
    const {title, content} = req.body
    res.send(postf(title, content))
})
app.put('/post/:id', (req, res) => {
    const {title,content} = req.body;
    const {id} = req.params
    res.send(putPostf(id,title,content))
})
app.delete('/post/:id', (req, res) => {
    
    const id = parseInt(req.params.id)
    console.log("id",id)
    res.send(deletePostf(id))
})

