//IMPORTAMOS LOS MODULOS REQUERIDOS
const userService = require('../services/user.service')

//EXPORTADO DE MODULOS

module.exports = function (server) {

    server.post('/usuarios', async (req, res)=>{
        let data = req.body
        try{
            let resultado = await userService.crearUsuario(data)
            res.status(200).json(resultado)
        }catch (err){
            console.log(err)
            res.status(404).json({error: err.message})
        }
    })

    server.post('/login', async (req,res)=>{
        let data = req.body
        try {
            let resultado = await userService.chequeoDeUsuario(data)
            console.log('user router')
            let token = await userService.generaToken(data.usuario)
            res.status(200).json(token)
        }catch (error){
            console.log(error)
            res.status(404).json({error: error.message})
        }
    })
}

