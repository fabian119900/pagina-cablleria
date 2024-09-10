const mongoose = require("mongoose")


const elementosEsquema = new mongoose.Schema(
    {
        nombre:{
            type: String
        },
        codigo:{
            type: String,
            unique:true,
            required:true
        },
        categoria:{
            type: String
        },
        imagen:{
            type: String
        },
        precio:{
            type: String
        },
        descripcion:{
            type: String
        }
    },
)

module.exports = mongoose.model("elementos",elementosEsquema)