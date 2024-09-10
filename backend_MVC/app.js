const express = require("express")
global.app = express() // se coloca global para que todos los archivos la puedan reconocer 
global.config = require("./config.js").config
let bodyParser = require('body-parser')
const init_DB =require("./db")
const cors = require ('cors')
global.sha256 = require('sha256') // libreria de encriptacion 
global.path = require('path')
global.appRoot = path.resolve(__dirname)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))


app.use(cors({
    origin:function(origin, callback){
        console.log(origin)
        if(!origin) return callback(null, true)
            console.log(origin)
        if(config.origins.indexOf(origin) === -1) {
            console.log('error')
            return callback('error de cors', false)
        }
        return callback(null, true)
    }
}));

require("./routes/rutas.js") // estamos comunicandonos con las rutas

app.use("/upload", express.static(__dirname + '/uploads'))

//para llamar al frontend desde el backend sin necesidad de levantar el frontend 
//app.use('/', express.static(dirname + '/dist/frontend/browser'));
//app.get('/*', function(req, res, next) {
   // res.sendFile(path.resolve(dirname + "/dist/frontend/browser/index.html"));
//});

init_DB()


app.listen(config.puerto, function(){
    console.log("servidor funcionando por el puerto"+ config.puerto)
})
