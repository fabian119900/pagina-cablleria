const mongoose = require("mongoose")


const categoriasEsquema = new mongoose.Schema(
    {
        nombre:{
            type: String
        },
        codigo:{
            type: String,
            unique:true,
            required:true
        }
    },
)

module.exports = mongoose.model("categorias",categoriasEsquema)