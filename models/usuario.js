 const {model, Schema} = require('mongoose');

 // Tendriamos que evitar que los errores configurados aparescan. El control lo hacemos antes asi no sobrecargamos el
 // motor de la base de datos o servidor

 const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
    },
    img: {
        type: String,
    },
    password: {
        type: String,
        required: true,
        
    },
    rol: {
        type: String,
        required: true,
    },
    estado: {
        type: Boolean,
        default: true // cuando cree un usuario por defecto va a estar activado
    },
    google: {
        type: Boolean,
        default: false 
    }
 })

 // Podemos sobrescribir metodos de mongoose
 // cuando se manda a ejecutar el toJSON va a ejecutar esta funcion
 UsuarioSchema.methods.toJSON = function() {
    const {__v, password, ...usuario} = this.toObject();
    return usuario;
 }


 module.exports = model('Usuario', UsuarioSchema); // En singular