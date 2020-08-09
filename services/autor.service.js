//IMPORTADO DE MODULOS NECESARIOS
const mongoose = require('mongoose');
const autores = require("../db/autores")

module.exports.getAutores = async function () {

    let resultado = await autores.find((err, res)=> {
        return res
    })
    return resultado
}

module.exports.crearAutor = async function (autor) {

    let resultado = await autores.find({nombre:autor.nombre, apellido: autor.apellido},(err, res)=> {
        return res
    })

    if(resultado.length >0){
        throw new Error("Ya existe un autor con ese nombre y apellido")
    }

    let modelo = {
        nombre: autor.nombre,
        apellido: autor.apellido,
        fechaDeNacimiento: new Date (autor.fechaDeNacimiento),
    }

    let nuevoAutor = await new autores(modelo).save()
    return nuevoAutor
}

module.exports.getAutorById = async function (idAutor) {

    let resultado = await autores.findById(idAutor,(err, res)=>{
        return res
    })
    return resultado
}

module.exports.modificaAutor = async function (idAutor, data) {

    let resultado = await autores.updateOne({_id:idAutor}, data)
    if(resultado.ok != 1){
        throw new Error ('No se pudo modificar el usuario requerido')
    }
    return await autores.find({_id:idAutor},(err, res)=> {
        return res
    })
}

module.exports.borraAutor = async function (idAutor) {

    let resultado = await autores.deleteOne({_id:idAutor})
    if(resultado.deletedCount == 1){
        return 'Autor eliminado correctamente'
    }else {
        throw new Error ('No se pudo borrar el autor o ya no existe')
    }
}