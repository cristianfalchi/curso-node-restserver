const {Schema, model} = require('mongoose');

const ProductoSchema = new Schema({
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
    },
    precio: {  // no es obligatorio porque puede ser que alguien este ingresando todos los productos al sistema
        type: Number,
        default: 0
    },
    categoria: { 
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },
    descripcion: {type: String},
    disponible: {type: Boolean, default: true}, // relfeja mas que nada el stock del producto
    img: {type: String}

})

ProductoSchema.methods.toJSON = function () {
    const {__v, estado, ...data} = this.toObject();
    return data; 
}


module.exports = model('Producto',ProductoSchema);