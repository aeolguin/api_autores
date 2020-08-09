const {Schema, model} = require('mongoose');

const autoresSchemas = new Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    fechaDeNacimiento: Date
}, {
    timestamps: true
})

module.exports = model('autores', autoresSchemas)