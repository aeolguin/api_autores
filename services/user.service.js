// IMPORTADO DE MODULOS
const jwt = require('jsonwebtoken')
const usuarios = require('../db/usuarios')
const mongoose = require('mongoose');

//EXPORTADO DE MODULOS

module.exports.crearUsuario = async function (data) {
    let resultado = await usuarios.find({usuario:data.usuario, password: data.password},(err, res)=> {
        return res
    })
    if(resultado.length >0){
        throw new Error ('El usuario ya existe')
    }else {
        let modelo = {
            usuario: data.usuario,
            password: data.password,
            rol: [
                "ADMIN",
                "NORMAL_USER"
            ]
        }
        let nuevoUsuario = await new usuarios(modelo).save()
        return nuevoUsuario
    }
}
module.exports.chequeoDeUsuario = async function (data) {

    let resultado = await usuarios.find({usuario:data.usuario, password: data.password},(err, res)=> {
        return res
    })
    if(resultado.length >0){
        return resultado
    }else {
        throw new Error ('El usuario no existe o la contraseña es incorrecta')
    }
};

module.exports.generaToken = function (data) {
    const resultado = jwt.sign({
        data} , process.env.SECRET_KEY 
    )
    return resultado
}

module.exports.verificacionUsuario = function (token){
    const resultado = jwt.verify(token, process.env.SECRET_KEY)

    if(resultado){
        return resultado
    }else {
        throw new Error ('Token no valido!')
    }
}

module.exports.permisosValidos = async function (data, metodo){

    let resultado = await usuarios.find({usuario:data},(err, res)=> {
        return res
    })  
    if (resultado[0].rol.find(a=> a == 'ADMIN')) {
        return true
    }
    console.log('metodo ' + metodo.get)
    if (metodo.get){
        return true
    }else {
        throw new Error ('usted no tiene permisos para la operacion que desea realizar')
    }
}