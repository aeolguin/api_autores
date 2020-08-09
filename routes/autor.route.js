//IMPORTADO DE MODULOS
const autorService = require("../services/autor.service")
const midd = require('../middlewares/midd.user')

//EXPORT DE MODULOS 
module.exports = function (server) {

    server.get("/autores", midd.usuarioValido,midd.usuarioAutorizado, async (req, res) => {
        let autores =  await autorService.getAutores();
        res.json(autores)
    })

    server.post("/autores",midd.usuarioValido,midd.usuarioAutorizado, async (req, res) => {
        let autor = req.body;
        try {
            let autorNuevo = await autorService.crearAutor(autor);
            res.status("201").json(autorNuevo)
        } catch (err) {
            res.status(409).json({ error: err.message })
        }
    })

    server.get('/autores/:id',midd.usuarioValido,midd.usuarioAutorizado, async (req,res)=>{
        let idAutor = req.params.id
        try {
            let resultado = await autorService.getAutorById(idAutor)
            res.status(200).json(resultado)

        }catch (error) {
            res.status(404).json({error: error.message})
        }
    })

    server.put('/autores/:id',midd.usuarioValido,midd.usuarioAutorizado, async (req,res)=> {
        let idAutor = req.params.id
        let data = req.body
        try {
            let resultado = await autorService.modificaAutor(idAutor, data)
            res.status(200).json(resultado)
        }catch (error) {
            res.status(404).json({error: error.message})
        }
    })

    server.delete('/autores/:id',midd.usuarioValido,midd.usuarioAutorizado, async (req,res)=> {
        let idAutor = req.params.id
        try {
            let resultado = await autorService.borraAutor(idAutor)
            console.log(resultado)
            res.status(204).send(resultado)
        }catch (error){
            res.status(404).json({error: error.message})
        }
    })
}