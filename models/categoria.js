const {Schema, model} = require('mongoose');

const CategoriaSchema = Schema({

    nombre: {
        type: 'string',
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    estado: { // cuando lo estoy borrando o no
        type: Boolean,
        default: true,
        required: true
    },
    usuario: { // para saber quien creo la categoria
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }

})

CategoriaSchema.methods.toJSON = function () {
    const {__v, estado, ...categoria} = this.toObject();
    return categoria; 
}

module.exports = model('Categoria', CategoriaSchema)