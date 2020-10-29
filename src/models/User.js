const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'La contraseña es requerida']
    },
    rol: {
        type: String,
        default: 'USUARIO_COMUN'
    },
    userCreated: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('User', userSchema);