const mongoose = require("mongoose")
const modelo = require("./nosql/elementos")

let elementosModel = {}


elementosModel.Guardar = function(post, callback) {
    const instancia = new modelo
    instancia.codigo = post.codigo
    instancia.nombre = post.nombre
    instancia.categoria = post.categoria
    instancia.imagen = post.imagen
    instancia.precio = post.precio
    instancia.descripcion = post.descripcion
    
    
    instancia.save().then((respuesta)=>{
        console.log(respuesta)
        return callback({state: true, mensaje: "elemento guardado en la db" });
    }).catch((error)=>{
        return callback({state: false, mensaje: "error al almacenar",error:error});
    })      
}

elementosModel.Listar = function(post, callback) {
    modelo.find({},{__v:0})
        .then(respuesta => {
            return callback({ state: true, informacion: respuesta});
        })
        .catch(error => {
            return callback({ state: false, mensaje: error.message });
        });
}

elementosModel.Filtro = function(post, callback) {

    modelo.find({categoria:post.filtro})
        .then(respuesta => {
            console.log(respuesta)
            return callback({ state: true, informacion: respuesta});
        })
        .catch(error => {
            return callback({ state: false, mensaje: error.message });
        });
}

elementosModel.Listarid = function(post, callback) {
    modelo.find({_id:post._id},{__v:0})
        .then(respuesta => {
            return callback({ state: true, informacion: respuesta});
        })
        .catch(error => {
            return callback({ state: false, mensaje: error.message });
        });
}

elementosModel.verificarCodigo =  function(post, callback) {
    modelo.find({codigo: post.codigo}, {})
        .then(res => {
            console.log(res.length)
            if (res.length > 0) {
                return callback({ existe: true})// el usuario lo encontro en la db 
                
            } else {
                return callback({ existe: false })
            }
        })
        .catch(error => {
            return callback({state: false, error:error });
        })
}

elementosModel.Actualizar = function(post, callback){

    modelo.findOneAndUpdate({_id:post._id },
        {nombre:post.nombre,
        categoria:post.categoria,
        imagen:post.imagen,
        precio:post.precio,
        descripcion:post.descripcion}) // el segundo dato es el parametro que le voy actualizar
        
    .then(respuesta => {
        return callback({state:true})
    })
    .catch(error => {
        return callback({state: false, error: error})
    })
}

elementosModel.Eliminar = function(post,callback){
    
    modelo.findOneAndDelete({_id: post._id }) 
    .then(respuesta => {
        return callback({state:true})
    })
    .catch(error => {
        return callback({state: false, error: error})
    })
}

module.exports.elementosModel = elementosModel
