// $$$$$$$$$$$$$$$$$$$esa para conectar nuestra base de datos$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

const mongoose = require('mongoose') // declaracion de paquete mondgoose


//$$$$$$$$$$$$$$$CONEXION A LA BASE DE DATOS DB $$$$$$$$$$$$$$$$$$$$$$$$$$$
const DB_URI =`mongodb://localhost:27017/usuarios`
const dbConnect = function(){
    mongoose.connect(DB_URI).then((respuesta)=>{
        console.log('**** CONEXION CORRECTA A LA DB****')
    }).catch((error)=>{
        console.log('***** ERROR DE CONEXION A LA DB ****');
        console.error(error);
    
    })
} 

module.exports = dbConnect