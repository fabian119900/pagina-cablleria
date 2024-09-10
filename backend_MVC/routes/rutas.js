var logueado = "administrador"

var validaesAdmin = function(request, response, next){
    if(logueado == "administrador"){
        next()
    }
    else
    {
        response.json({state:false, mensaje:"api solo para administradores"})
        return false
    }
}


// vamos a configurar todas las rutas de acceso en esta parte no se valida nada solo apunta hacia el controlador

let usuariosController = require("../controladores/usuariosController.js").usuariosController

//rutas esenciales para la creacion de un nuevo usuario metod crud resgistrar-actualizar-listar-eliminar

app.post("/usuarios/guardar", function(req, res){
    usuariosController.Guardar(req,res)
})

app.get("/usuarios/listar",validaesAdmin, function(request, response){
    usuariosController.Listar(request,response)
})
app.post("/usuarios/listarid", function(request, response){
    usuariosController.Listarid(request,response)
})
app.post("/usuarios/actualizar", function(request, response){
    usuariosController.Actualizar(request,response)
})
app.post("/usuarios/eliminar", function(request, response){
    usuariosController.Eliminar(request,response)
})

//login de usuario
app.post("/usuarios/login", function(request, response){
    usuariosController.Login(request,response)
})

app.get("/usuarios/activar/:email/:azar", function(request, response){
    usuariosController.activar(request,response)
})
// actualizacion de password

app.post("/usuarios/actualpass", function(request, response){
    usuariosController.ActualPass(request,response)
})

//rutas esenciales para la creacion CRUD de categorias

let categoriasController = require("../controladores/categoriasController.js").categoriasController


app.post("/categorias/guardar", function(req, res){
    categoriasController.Guardar(req,res)
})
app.get("/categorias/listar", function(request, response){
    categoriasController.Listar(request,response)
})
app.post("/categorias/listarid", function(request, response){
    categoriasController.Listarid(request,response)
})
app.post("/categorias/actualizar", function(request, response){
    categoriasController.Actualizar(request,response)
})
app.post("/categorias/eliminar", function(request, response){
    categoriasController.Eliminar(request,response)
})

/// Rutas para creacion de CRUD de elementos 
let elementosController = require("../controladores/elementosController.js").elementosController

app.post("/elementos/guardar", function(req, res){
    elementosController.Guardar(req,res)
})

app.get("/elementos/listar", function(request, response){
    elementosController.Listar(request,response)
})
app.post("/elementos/filtro", function(request, response){
    elementosController.Filtro(request,response)
})
app.post("/elementos/listarid", function(request, response){
    elementosController.Listarid(request,response)
})
app.post("/elementos/actualizar", function(request, response){
    elementosController.Actualizar(request,response)
})
app.post("/elementos/eliminar", function(request, response){
    elementosController.Eliminar(request,response)
})


// para cargar imagen al servidor 
var archivosController = require("../controladores/archivosController.js").archivosController

app.post("/upload", function(request,response){

    archivosController.Subir(request,response)
})

