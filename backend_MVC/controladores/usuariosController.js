let usuariosModel = require("../modelos/usuariosModel").usuariosModel
var nodemailer = require("nodemailer")
const { config } = require("../config")

let usuariosController = {}

usuariosController.Guardar = function(request,response){
    let post = {
        nombre: request.body.nombre,
        email:request.body.email,
        edad:request.body.edad,
        telefono:request.body.telefono,
        password:request.body.password,
    }

    if(post.nombre == undefined || post.nombre == null || post.nombre == "" ){
        response.json({state:false, mensaje: "el campo nombre es obligatorio"})
        return false // para parar la revision del codigo asia abajo 
    }

    if(post.email == undefined || post.email == null || post.email == "" ){
        response.json({state:false, mensaje: "el campo email es obligatorio"})
        return false 
    }
    if(post.edad == undefined || post.edad == null || post.edad == "" ){
        response.json({state:false, mensaje: "el campo edad es obligatorio"})
        return false 
    }
    if(post.telefono == undefined || post.telefono == null || post.telefono == "" ){
        response.json({state:false, mensaje: "el campo telefono es obligatorio"})
        return false 
    }
    if(post.password == undefined || post.password == null || post.password == "" ){
        response.json({state:false, mensaje: "el campo password es obligatorio"})
        return false 
    }
    const regex = /^(?=.*[A-Z])(?=(.*\d){2,}).{6,}$/;
    if(regex.test(post.password) == false){
        response.json({state:false, mensaje: "el campo password debe contener minimo 2 numeros y una mayuscula y debe ser de longitud de 6"})
        return false 
    }

    //$$$$$$$$$$$$$$$$ encriptacion de password utilizando metodo SHA256$$$$$$$$$$$$$$$$

    post.password = sha256(post.password + config.encriptado)


    //proceso de guaradar en el modelo
    usuariosModel.verificarEmail(post, function(verif){
        if(verif.continuar == "Si"){

            post.azar = "G-" + Math.floor(Math.random() * (9999 - 1000) + 1000);
            // proceso de enviar correos electornicos 

            const transportador= nodemailer.createTransport({
                host:config.email.host,
                port:config.email.port,
                secure:false,
                requireTLS:true,
                auth:{
                    user:"cesarquejuan@gmail.com",
                    pass:"ubbhveqdzwhaoecz"
                }
            })
            let mailOptions ={
                from:"",
                to:post.email,
                subject:"verifica tu cuenta con el codigo" + post.azar,
                html: `<body>

                            <div class="container">
                                <h1>Activación de Cuenta</h1>
                                <p>Gracias por registrarte. Por favor, haz clic en el botón de abajo para activar tu cuenta.</p>
                                <a href="http://localhost:3000/usuarios/activar/${post.email}/${post.azar}" class="activation-button">Activar Cuenta</a>
                                <div class="footer">
                                    <p>Si no solicitaste este registro, ignora este mensaje.</p>
                                </div>
                            </div>

                        </body>`
            }
            transportador.sendMail(mailOptions, (error, info)=>{
                if(error){
                    console.log(error)
                }
                else{
                    console.log(info)
                }
            })

            usuariosModel.Guardar(post,function(respuesta){
                response.json(respuesta)
            })
        }
        else{
            response.json({state:false, mensaje:"este email ya existe en la BD"})
        }
    })
    
    }

usuariosController.Listar = function(request,response){
    usuariosModel.Listar(null,function(respuesta){
        response.json(respuesta)
    })
    
}
usuariosController.Listarid = function(request,response){
    let post = {
        _id:request.body._id,
    }
    if(post._id == undefined || post._id == null || post._id == "" ){
        response.json({state:false, mensaje: "el campo _id es obligatorio"})
        return false 
    }   
    usuariosModel.Listarid(post,function(respuesta){
        response.json(respuesta)
    })
    
}

usuariosController.Actualizar = function(request,response){
    let post = {
        _id:request.body._id,
        nombre: request.body.nombre,
        edad:request.body.edad,
        telefono:request.body.telefono
    }
    if(post.nombre == undefined || post.nombre == null){
        response.json({state:false, mensaje: "el campo nombre es obligatorio"})
        return false 
        }  
    if(post.edad == undefined || post.edad == null){
        response.json({state:false, mensaje: "el campo edad es obligatorio"})
        return false 
        }
    if(post.telefono == undefined || post.telefono == null){
    response.json({state:false, mensaje: "el campo telefono es obligatorio"})
    return false 
    }
        usuariosModel.Actualizar(post, function(actualiza){
            if(actualiza.state === true){
                response.json({state:true, mensaje:"usuario actualizado correctamente"})
            }else{
                response.json({state:false, mensaje:"error al actualizar"})
            }
        })
}

usuariosController.Eliminar = function(request,response){
    let post = {
        _id:request.body._id,
    }
    if(post._id == undefined || post._id == null || post._id == "" ){
    response.json({state:false, mensaje: "el campo email es obligatorio"})
    return false 
    }   
    usuariosModel.Eliminar(post, function(actualiza){

    if(actualiza.state == true){
        response.json({state:true, mensaje:"usuario eliminado correctamente"})

    }else{
        response.json({state:false, mensaje:"error al eliminar"})
    }
    }) 
}

usuariosController.Login = function(request,response){
    let post = {
        email:request.body.email,
        password:request.body.password
    }
    if(post.email == undefined || post.email == null || post.email == "" ){
        response.json({state:false, mensaje: "el campo email es obligatorio"})
        return false 
    }
    if(post.password == undefined || post.password == null || post.password == "" ){
        response.json({state:false, mensaje: "el campo password es obligatorio"})
        return false 
    }
    
    post.password = sha256(post.password + config.encriptado)

    usuariosModel.Login(post,function(respuesta){
        if(respuesta.state == true){
            response.json(respuesta)
        }else{
            response.json(respuesta)
        }
    })


}

usuariosController.activar = function(request,response){
    let post = {
        email:request.params.email,
        azar:request.params.azar
    }
    if(post.email == undefined || post.email == null || post.email == "" ){
        response.json({state:false, mensaje: "el campo email es obligatorio"})
        return false 
    }
    if(post.azar == undefined || post.azar == null || post.azar == "" ){
        response.json({state:false, mensaje: "el campo azar es obligatorio"})
        return false 
    }
    

    usuariosModel.activar(post,function(respuesta){
        if(respuesta.state == true){
            response.json(respuesta)
        }else{
            response.json(respuesta)
        }
    })


}

usuariosController.ActualPass = function(request,response){
    let post = {
        email:request.body.email,
        password: request.body.password
    }
    if(post.email == undefined || post.email == null || post.email == "" ){
        response.json({state:false, mensaje: "el campo email es obligatorio"})
        return false 
    }   
    if(post.password == undefined || post.password == null || post.password == "" ){
        response.json({state:false, mensaje: "el campo password es obligatorio"})
        return false 
    }
    const regex = /^(?=.*[A-Z])(?=(.*\d){2,}).{6,}$/;

    if(regex.test(post.password) == false){
        response.json({state:false, mensaje: "el campo password debe contener minimo 2 numeros y una mayuscula y debe ser de longitud de 6"})
        return false 
    }
    usuariosModel.verificarEmail(post, function(existe){
        if(existe.continuar == "No"){

            usuariosModel.ActualPass(post, function(actualiza){

                if(actualiza.state == true){
                    response.json({state:true, mensaje:"password actualizado correctamente"})
                }else{
                    response.json({state:false, mensaje:"error al actualizar el password"})
                }
            })
        }else{
            response.json({state:false, mensaje:"No podemos actualizar un  email inexistente"})
        }
    }) 
}


module.exports.usuariosController = usuariosController