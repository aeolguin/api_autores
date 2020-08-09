const {Schema, model} = require('mongoose');

const usuarioSchema = new Schema({
    usuario: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    rol: {
        type: Array,
        required: true,
        default: []
    }
}, {
    timestamps: true
})

module.exports = model('usuarios', usuarioSchema)