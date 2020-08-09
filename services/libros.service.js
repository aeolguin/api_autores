//IMPORTO LOS MODULOS NECESARIOS
const autorService = require('../services/autor.service')
const libros = require('../db/libros')
const autores = require('../db/autores')
//EXPORTO LOS MODULOS

module.exports.librosByAutor = async function (idAutor){
    let autor = await autores.findById(idAutor ,(err, res)=>{
        return res
    })
    let busquedaLibro = await libros.find({autor: idAutor}, (err,res)=>{
        return res
    })
    
    let resultado = {
        autor,
        libros: busquedaLibro
    }
    console.log(resultado)
    return resultado
}

module.exports.nuevoLibro = async function (libro, idAutor){
    console.log(libro)

    let modelo = {
        titulo: libro.titulo,
        descripcion: libro.descripcion,
        anioDePublicacion: libro.anioDePublicacion,
        autor: idAutor
    }

    let nuevoLibro = await new libros(modelo).save()

    return nuevoLibro
}

module.exports.libroPorAutorYId = async function (idLibro,idAutor){

    let resultado = await libros.findOne({autor: idAutor , _id: idLibro}, (err, res)=>{
        return res
    })
    console.log(resultado)
    return resultado

}


module.exports.modificaLibro = async function (libro, idAutor){

    const {titulo, descripcion, anioDePublicacion} = libro
    let resultado = await libros.findOneAndUpdate({_id: idAutor}, libro)
    return resultado
}

module.exports.eliminaLibro = async function (idLibro){
    
    let resultado = await libros.findByIdAndDelete({_id: idLibro})
    return ('Libro eliminado correctamente')
}