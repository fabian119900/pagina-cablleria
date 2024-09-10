let elementosModel = require("../modelos/elementosModel.js").elementosModel

let elementosController = {}

elementosController.Guardar = function(request,response){
    let post = {
        codigo:request.body.codigo,
        nombre: request.body.nombre,
        categoria: request.body.categoria,
        imagen: request.body.imagen,
        precio: request.body.precio,
        descripcion: request.body.descripcion            
    }

    if(post.codigo == undefined || post.codigo == null || post.codigo == "" ){
        response.json({state:false, mensaje: "el campo codigo es obligatorio"})
        return false 
    }
    if(post.nombre == undefined || post.nombre == null || post.nombre == "" ){
        response.json({state:false, mensaje: "el campo nombre es obligatorio"})
        return false // para parar la revision del codigo asia abajo 
    }

    if(post.categoria == undefined || post.categoria == null || post.categoria == "" ){
        response.json({state:false, mensaje: "el campo categoria es obligatorio"})
        return false 
    }
    if(post.imagen == undefined || post.imagen == null || post.imagen == "" ){
        response.json({state:false, mensaje: "el campo imagen es obligatorio"})
        return false 
    }
    if(post.precio == undefined || post.precio == null || post.precio == "" ){
        response.json({state:false, mensaje: "el campo precio es obligatorio"})
        return false 
    }
    if(post.descripcion == undefined || post.descripcion == null || post.descripcion == "" ){
        response.json({state:false, mensaje: "el campo descripcion es obligatorio"})
        return false 
    }

    elementosModel.verificarCodigo(post,function(verificar){
        if(verificar.existe == false){
            elementosModel.Guardar(post,function(respuesta){
                response.json(respuesta)
            })
        }else {
            response.json({state:false,mensaje:"El codigo de la categoria ya existe en la DB"})
            return false
        }
    })

}

elementosController.Listar = function(request,response){
    elementosModel.Listar(null,function(respuesta){
        response.json(respuesta)
    })
    
}
elementosController.Filtro = function(request,response){
    let post = {
        filtro:request.body.filtro
    }
    elementosModel.Filtro(post,function(respuesta){
        response.json(respuesta)
    })
    
}
elementosController.Listarid = function(request,response){
    let post = {
        _id:request.body._id,
    }
    if(post._id == undefined || post._id == null || post._id == "" ){
        response.json({state:false, mensaje: "el campo _id es obligatorio"})
        return false 
    }   
    elementosModel.Listarid(post,function(respuesta){
        response.json(respuesta)
    })
    
}

elementosController.Actualizar = function(request,response){
    let post = {
        _id:request.body._id,
        nombre: request.body.nombre,
        categoria: request.body.categoria,
        imagen: request.body.imagen,
        precio: request.body.precio,
        descripcion: request.body.descripcion
    }
    if(post._id == undefined || post._id == null){
        response.json({state:false, mensaje: "el campo _id es obligatorio"})
        return false 
        }
    if(post.nombre == undefined || post.nombre == null){
        response.json({state:false, mensaje: "el campo nombre es obligatorio"})
        return false 
        }  
    if(post.categoria == undefined || post.categoria == null){
        response.json({state:false, mensaje: "el campo categoria es obligatorio"})
        return false 
        }  
    if(post.imagen == undefined || post.imagen == null){
        response.json({state:false, mensaje: "el campo imagen es obligatorio"})
        return false 
        } 
    if(post.precio == undefined || post.precio == null){
        response.json({state:false, mensaje: "el campo precio es obligatorio"})
        return false 
        }
    if(post.descripcion == undefined || post.descripcion == null){
        response.json({state:false, mensaje: "el campo descripcion es obligatorio"})
        return false 
        }

        elementosModel.Actualizar(post, function(actualiza){
            if(actualiza.state === true){
                response.json({state:true, mensaje:"elemento actualizado correctamente"})
            }else{
                response.json({state:false, mensaje:"error al actualizar"})
            }
        })
}

elementosController.Eliminar = function(request,response){
    let post = {
        _id:request.body._id,
    }
    if(post._id == undefined || post._id == null || post._id == "" ){
    response.json({state:false, mensaje: "el campo _id es obligatorio"})
    return false 
    }   
    elementosModel.Eliminar(post, function(actualiza){

    if(actualiza.state == true){
        response.json({state:true, mensaje:"elemento eliminado correctamente"})

    }else{
        response.json({state:false, mensaje:"error al eliminar"})
    }
    }) 
}

module.exports.elementosController = elementosController
