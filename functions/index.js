//Creacion de array post

/*****************************************
 *                                       *
 * Ej. Post                              *
 *                                       *
 ****************************************/
//********COMENTAR POST***********
let posts = [
    {
        id: 1,
        title: "Un titulo 1",
        content: "Un contenido 1",
        momento: "Probando 1"
    }, {
        id: 2,
        title: "Un titulo 2",
        content: "Un contenido 2",
        momento: "Probando 2"
    }]
//Closure, function generadora de id.
//********Comenzar en 000000***********
const idGenerator = function () {
    let id = 2;
    return () => {
        return ++id;//id = id + 1;
    }
}();

//Postear, crear un post nuevo
const postf = (title, content) => {
    if(!title)return "Titulo esta vacio"
    if(!content)return "content esta vacio"
    const post = {
        id: idGenerator(),
        title,
        content
    }
    posts.push(post);
    return post;
};
//Obtener posters
const getPostsf = () => {
    if(posts.length)return "No hay post para mostrar"
    return posts;
}
//Modificar un post por el id del post.
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
//Borrar un post por el id del post.
const deletePostf = (id=1) => posts = posts.filter(post=>post.id != id)

// console.log("funcion", getPostsf("primero","contenido"));

// console.log("POSTS antes", posts);
// console.log("funcion", deletePostf(2));
// console.log("POSTS despues", posts);
module.exports = { posts, postf, putPostf, deletePostf, getPostsf}