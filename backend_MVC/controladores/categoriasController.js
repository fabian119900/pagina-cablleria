let categoriasModel = require("../modelos/categoriasModel.js").categoriasModel

let categoriasController = {}

categoriasController.Guardar = function(request,response){
    let post = {
        codigo:request.body.codigo,
        nombre: request.body.nombre      
    }

    if(post.nombre == undefined || post.nombre == null || post.nombre == "" ){
        response.json({state:false, mensaje: "el campo nombre es obligatorio"})
        return false // para parar la revision del codigo asia abajo 
    }
    if(post.codigo == undefined || post.codigo == null || post.codigo == "" ){
        response.json({state:false, mensaje: "el campo email es obligatorio"})
        return false 
    }

    categoriasModel.verificarCodigo(post,function(verificar){
        if(verificar.existe == false){
            categoriasModel.Guardar(post,function(respuesta){
                response.json(respuesta)
            })
        }else {
            response.json({state:false,mensaje:"El codigo de la categoria ya existe en la DB"})
            return false
        }
    })

}

categoriasController.Listar = function(request,response){
    categoriasModel.Listar(null,function(respuesta){
        response.json(respuesta)
    })
    
}
categoriasController.Listarid = function(request,response){
    let post = {
        _id:request.body._id,
    }
    if(post._id == undefined || post._id == null || post._id == "" ){
        response.json({state:false, mensaje: "el campo _id es obligatorio"})
        return false 
    }   
    categoriasModel.Listarid(post,function(respuesta){
        response.json(respuesta)
    })
    
}

categoriasController.Actualizar = function(request,response){
    let post = {
        _id:request.body._id,
        nombre: request.body.nombre,
    }
    if(post.nombre == undefined || post.nombre == null){
        response.json({state:false, mensaje: "el campo nombre es obligatorio"})
        return false 
        }  
    if(post._id == undefined || post._id == null){
        response.json({state:false, mensaje: "el campo _id es obligatorio"})
        return false 
        }

        categoriasModel.Actualizar(post, function(actualiza){
            if(actualiza.state === true){
                response.json({state:true, mensaje:"elemento actualizado correctamente"})
            }else{
                response.json({state:false, mensaje:"error al actualizar"})
            }
        })
}

categoriasController.Eliminar = function(request,response){
    let post = {
        _id:request.body._id,
    }
    if(post._id == undefined || post._id == null || post._id == "" ){
    response.json({state:false, mensaje: "el campo email es obligatorio"})
    return false 
    }   
    categoriasModel.Eliminar(post, function(actualiza){

    if(actualiza.state == true){
        response.json({state:true, mensaje:"elemento eliminado correctamente"})

    }else{
        response.json({state:false, mensaje:"error al eliminar"})
    }
    }) 
}




module.exports.categoriasController = categoriasController