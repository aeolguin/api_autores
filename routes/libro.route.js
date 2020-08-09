//IMPORTO MODULOS
const midd = require('../middlewares/midd.user')
const autorService = require("../services/autor.service")
const libroService = require ('../services/libros.service')

//EXPORTO LOS MODULOS
module.exports = function (server) {

    server.get('/autores/:id/libros', midd.usuarioValido,midd.usuarioAutorizado, async (req, res) =>{
        let data = req.params.id
        try {
            let resultado = await libroService.librosByAutor(data)
            res.status(200).json(resultado)
        }catch (error) {
            res.status(404).json({error: error.message})
        }
    })

    server.post('/autores/:id/libros', midd.usuarioValido,midd.usuarioAutorizado, async (req,res)=>{
        
        try {
            let libronuevo = await libroService.nuevoLibro(req.body, req.params.id)
            res.status(201).json(libronuevo)

        }catch (error) {
            res.status(404).json({error: error.message})
        }
    })

    server.get('/autores/:id/libros/:idLibro', midd.usuarioValido,midd.usuarioAutorizado, async (req,res)=>{
        
        try {
            let resultado = await libroService.libroPorAutorYId(req.params.idLibro, req.params.id)
            res.status(200).json(resultado)
        }catch (error) {
            res.status(404).json({error: error.message})
        }
    })

    server.put('/autores/:id/libros/:idLibro', midd.usuarioValido,midd.usuarioAutorizado, async (req,res)=>{
        
        try {
            let resultado = await libroService.modificaLibro(req.body, req.params.idLibro)
            res.status(200).json(resultado)
        }catch (error) {
            res.status(404).json({error: error.message})
        }
    })

    server.delete('/autores/:id/libros/:idLibro', midd.usuarioValido,midd.usuarioAutorizado, async (req,res)=>{
        
        try {
            let resultado = await libroService.eliminaLibro(req.params.idLibro)
            res.status(204).json(resultado)
        }catch (error) {
            res.status(404).json({error: error.message})
        }
    })
}