//IMPORTO LOS MODULOS NECESARIOS
const userService = require('../services/user.service')

//EXPORTO MODULOS DE SERVICIO

module.exports.usuarioValido = function (req,res,next){
    try {
        if (req.headers.authorization != undefined){
            const token = req.headers.authorization.split(' ')[1]
            let verificado = userService.verificacionUsuario(token)
            req.params.usuario = verificado.data
            return next()
        }else{
            throw new Error ('Este es un sistema seguro y requiere autorización')
        }
    }catch (err){
        console.log(err.message)
        res.status(500).json({error: err.message})
    }
}

module.exports.usuarioAutorizado = async function (req,res,next){
    try {
        if(await userService.permisosValidos(req.params.usuario, req.route.methods)){
            return next()
        }
    }catch(err){
        console.log(err)
        res.status(500).json({error: err.message})
    }
}