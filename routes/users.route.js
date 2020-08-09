//IMPORTAMOS LOS MODULOS REQUERIDOS
const userService = require('../services/user.service')
const midd = require('../middlewares/midd.user.js')

//EXPORTADO DE MODULOS

module.exports = function (server) {

    //Creación de Usuarios
    server.post('/usuarios', async (req, res)=>{
        let data = req.body
        try{
            let resultado = await userService.crearUsuario(data)
            res.status(200).json(resultado)
        }catch (err){
            console.log(err)
            res.status(404).json({error: err.message})
        }
    }),

    //Login
    server.post('/login', async (req,res)=>{
        try {
            let resultado = await userService.chequeoDeUsuario(req.body)
            console.log('user router')
            let token = await userService.generaToken(req.body.usuario)
            res.status(200).json(token)
        }catch (error){
            console.log(error)
            res.status(404).json({error: error.message})
        }
    }),

    //Modifica Rol de Usuario
    server.put('/usuarios/:id' ,midd.usuarioValido, async (req,res)=>{
        try{
            let resultado = await userService.modificaRol(req.params.id , req.body)
            res.status(200).json(resultado)
        }catch(error){
            console.log(error)
            res.status(404).json({error: error.message})
        }
    })
}

