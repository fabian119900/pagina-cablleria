let archivosController = {}
let multer = require("multer")

archivosController.Subir = function(request,response){


    let upload = multer({
        storage:multer.diskStorage({
            destination:(req,file,cb) => {
                cb(null, appRoot + "/upload/")
            },
            filename: (req,file,cb) => {
                cb(null,  file.originalname  )
            }
        })
    }).single('userFile')

    upload(request, response,function(err){
        if(err){
            console.log(err)
            response.json(err)
        }
        else{
            response.json({state:true,mensaje:"archivo subido correctamente"})
        }
    })



}


module.exports.archivosController = archivosController