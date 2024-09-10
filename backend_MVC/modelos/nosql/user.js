const mongoose = require("mongoose")


const UsarioEsquema = new mongoose.Schema(
    {
        nombre:{
            type: String
        },
        email:{
            type: String,
        },
        edad:{
            type: Number,
        },
        telefono:{
            type: String,
        },
        password:{
            type:String
        },
        rol:{
            type:String
        },
        estado:{
            type:String
        },
        azar:{
            type:String
        }
        
    },
)

module.exports = mongoose.model("usuarios",UsarioEsquema)