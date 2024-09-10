//const { response } = require("express")
const mongoose = require("mongoose")
const modelo = require("./nosql/user.js")

let usuariosModel = {}


usuariosModel.Guardar = function(post, callback) {
    const instancia = new modelo
    instancia.nombre = post.nombre
    instancia.email = post.email
    instancia.edad = post.edad
    instancia.telefono = post.telefono
    instancia.password = post.password
    instancia.rol = "administrador" // cliente, administrador, facturador
    instancia.estado = "0"
    instancia.azar = post.azar

    instancia.save().then((respuesta)=>{
        console.log(respuesta)
        return callback({state: true, mensaje: "usuario guardado en la db" });
    }).catch((error)=>{
        return callback({state: false, mensaje: "error al almacenar" });
    })      
}

usuariosModel.Listar = function(post, callback) {
    modelo.find({},{password:0,__v:0})
        .then(respuesta => {
            return callback({ state: true, informacion: respuesta});
        })
        .catch(error => {
            return callback({ state: false, mensaje: error.message });
        });
}
usuariosModel.Listarid = function(post, callback) {
    modelo.find({_id:post._id},{password:0,__v:0})
        .then(respuesta => {
            return callback({ state: true, informacion: respuesta});
        })
        .catch(error => {
            return callback({ state: false, mensaje: error.message });
        });
}


usuariosModel.verificarEmail =  function(post, callback) {
    modelo.find({email: post.email}, {})
        .then(res => {
            console.log(res.length)
            if (res.length >= 1) {
                return callback({ continuar: "No" })// el usuario lo encontro en la db 
                
            } else {
                return callback({ continuar: "Si" })
            }
        })
        .catch(error => {
            return callback({state: false, error:error });
        })
}

usuariosModel.Actualizar = function(post, callback){

    modelo.findOneAndUpdate({_id:post._id },{nombre:post.nombre, edad:post.edad, telefono:post.telefono}) // el segundo dato es el parametro que le voy actualizar
    .then(respuesta => {
        return callback({state:true})
    })
    .catch(error => {
        return callback({state: false, error: error})
    })
}

usuariosModel.Eliminar = function(post,callback){
    
    modelo.findOneAndDelete({_id: post._id }) 
    .then(respuesta => {
        return callback({state:true})
    })
    .catch(error => {
        return callback({state: false, error: error})
    })
}

usuariosModel.Login = function(post, callback){
    modelo.find({email:post.email, password:post.password, estado:"1"},{}).then((respuesta) =>{
    if(respuesta.length == 1){
        return callback({state:true, mensaje:"bienvenido: " + respuesta[0].nombre})
    }
    else{
        return callback({state:false, mensaje:"credenciales invalidas, verifique que su cuenta este activa "})
    }
    }).catch((error) =>{
        return callback({state:false, error:error})
    })
}


usuariosModel.ActualPass = function(post, callback){
    modelo.findOneAndUpdate({email: post.email },
        {password:post.password}) 
    .then(respuesta => {
        return callback({state:true})
    })
    .catch(error => {
        return callback({state: false, error: error})
    })
    
}


usuariosModel.activar = function(post, callback){

    modelo.findOneAndUpdate({ email:post.email,azar:post.azar},{estado:"1", edad:30

    }) // el segundo dato es el parametro que le voy actualizar
    .then(respuesta => {

        if(respuesta == undefined){
            return callback({state:false, mensaje:"su codigo no es valido"})
        }
        else{

        console.log('----->');
        console.log(respuesta);
        return callback({state:true, mensaje:"su cuenta fue activada"})
    }

    })
    .catch(error => {
        return callback({state: false, error: error})
    })
}

module.exports.usuariosModel = usuariosModel