const mongoose = require("mongoose")
const modelo = require("./nosql/categorias.js")

let categoriasModel = {}


categoriasModel.Guardar = function(post, callback) {
    const instancia = new modelo
    instancia.nombre = post.nombre
    instancia.codigo = post.codigo
    
    instancia.save().then((respuesta)=>{
        console.log(respuesta)
        return callback({state: true, mensaje: "elemento guardado en la db" });
    }).catch((error)=>{
        return callback({state: false, mensaje: "error al almacenar" });
    })      
}

categoriasModel.Listar = function(post, callback) {
    modelo.find({},{__v:0})
        .then(respuesta => {
            return callback({ state: true, informacion: respuesta});
        })
        .catch(error => {
            return callback({ state: false, mensaje: error.message });
        });
}
categoriasModel.Listarid = function(post, callback) {
    modelo.find({_id:post._id},{__v:0})
        .then(respuesta => {
            return callback({ state: true, informacion: respuesta});
        })
        .catch(error => {
            return callback({ state: false, mensaje: error.message });
        });
}

categoriasModel.verificarCodigo =  function(post, callback) {
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

categoriasModel.Actualizar = function(post, callback){

    modelo.findOneAndUpdate({_id:post._id },{nombre:post.nombre}) // el segundo dato es el parametro que le voy actualizar
    .then(respuesta => {
        return callback({state:true})
    })
    .catch(error => {
        return callback({state: false, error: error})
    })
}

categoriasModel.Eliminar = function(post,callback){
    
    modelo.findOneAndDelete({_id: post._id }) 
    .then(respuesta => {
        return callback({state:true})
    })
    .catch(error => {
        return callback({state: false, error: error})
    })
}

module.exports.categoriasModel = categoriasModel