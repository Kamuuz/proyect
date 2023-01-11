var  Config = require('../models/config');
var fs =require('fs');
var path = require('path');


const actualizar_config_admin = async function(req,res){
    if (req.user) {
        if (req.user.role ='administrador') {
            // despues de tener creado el registro utilizar este codigo parte 27 10:00 minutos
            let data = req.body;
  
           if (req.files) {
                var img_path = req.files.logo.path;
                var name = img_path.split('\\');
                var logo_name =name[2];

                let reg = await Config.findByIdAndUpdate({_id:"63aa8aca4d1f06c5aa53e3ff"}, {
                    categoria:JSON.parse(data.categoria),
                    titulo: data.titulo,
                    serie: data.serie,
                    logo: logo_name,
                    correlativo: data.correlativo,
                });

                fs.stat('./uploads/configuraciones/'+reg.logo, function(err){
                    if (!err) {
                        fs.unlink('./uploads/configuraciones/'+reg.logo, (err)=>{
                            if (err) throw err; 
                                
                            
                        });
                    }
                })
                res.status(200).send({data:reg});

            }else{
                let reg = await Config.findByIdAndUpdate({_id:"63aa8aca4d1f06c5aa53e3ff"}, {
                    categoria:data.categoria,
                    titulo: data.titulo,
                    serie: data.serie,
                    correlativo: data.correlativo,
                });
                res.status(200).send({data:reg});
            }


        }else{
            res.status(500).send({message: 'NoAccess'});
        }
    }else{
        res.status(500).send({message: 'NoAccess'});
    }
}

const obtener_config_admin = async function(req,res){
    if (req.user) {
        if (req.user.role ='administrador') {
                                            //colocar el codigo del metodo actualizar
            let reg = await Config.findById({_id:"63aa8aca4d1f06c5aa53e3ff"});
            res.status(200).send({data:reg});
           
        }else{
            res.status(500).send({message: 'NoAccess'});
        }
    }else{
        res.status(500).send({message: 'NoAccess'});
    }
}

const obtener_logo = async function(req,res){
    var img = req.params['img'];

    console.log(img);
    fs.stat('./uploads/configuraciones/'+img, function(err){
        if (!err) {
            let path_img = './uploads/configuraciones/'+img;
            res.status(200).sendFile(path.resolve(path_img));
        }else{
            let path_img = './uploads/default.jpg/'+img;
            res.status(200).sendFile(path.resolve(path_img));
        }
    })

}

const obtener_config_publico = async function(req,res){
    let reg = await Config.findById({_id:"63aa8aca4d1f06c5aa53e3ff"});
    res.status(200).send({data:reg});
}

module.exports = {
    actualizar_config_admin,
    obtener_config_admin,
    obtener_logo,
    obtener_config_publico
}

