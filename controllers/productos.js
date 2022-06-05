
const { response } = require('express');
const { Producto } = require('../models')


// con paginado - total
const obtenerProductos = async (req, res = response) => {

    const { desde = 0, limit = 10 } = req.query;

    try {

        const [total, productos] = await Promise.all([
            Producto.countDocuments({ estado: true }),
            Producto.find({ estado: true })
                .skip(desde)
                .limit(limit)
                .populate('usuario', 'nombre')
                .populate('categoria', 'nombre')
        ])
        res.status(200).json({
            total,
            productos
        }
        );

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'No se pueden obtener los productos - Consulte con el administrador'
        })
    }
}

const obtenerProducto = async (req, res = response) => {

    const { id } = req.params;

    try {

        const producto = await Producto.findOne({ _id: id, estado: true })
            .populate('usuario', 'nombre')
            .populate('categoria', 'nombre')

        res.status(200).json({ producto });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error en la BD - consulte con el administrador'
        })
    }
}

const crearProducto = async (req, res = response) => {

    // las productos las quiero almacenar en mayusculas

    // ignoro estado y usuario si llegan a venir
    // const { estado, usuario, ...body } = req.body 
    const { nombre, descripcion, precio, disponible, categoria } = req.body

    try {

        const productoDB = await Producto.findOne({ nombre });

        if (productoDB) {
            return res.status(400).json({
                msg: `La producto ${productoDB.nombre} ya existe`
            })
        }

        // genero la data a guardar
        const data = {
            nombre: req.body.nombre.toUpperCase(),
            descripcion,
            categoria,
            precio,
            disponible,
            usuario: req.usuario._id // _id mongo lo graba asi al id
        }

        // Preparo la data en el modelo
        const producto = new Producto(data);

        // Guarda DB
        await producto.save();

        res.status(201).json(producto)

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Falla en la creación del producto - consulte con el administrador"
        })
    }


}

const actualizarProducto = async (req, res = response) => {

    const { estado, usuario, ...data } = req.body
    const { id } = req.params;

    if (data.nombre === '') {
      return res.status(400).json({
          msg: 'El nombre no puede ser vacio'
      })
    }

    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    try {

        const producto = await Producto.findByIdAndUpdate(id, data, { new: true })
            .populate('usuario', 'nombre')

        res.status(201).json(producto)

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Fallo la actualizacion de la producto"
        })
    }
}

const borrarProducto = async (req, res = response) => {

    const { id } = req.params;

    try {

        const productoActualizado = await Producto.findByIdAndUpdate(id, { estado: false }, { new: true });

        res.status(200).json(productoActualizado);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Comuniquese con el administrador - error en BD'
        })
    }


}


module.exports = {
    obtenerProductos,
    obtenerProducto,
    crearProducto,
    actualizarProducto,
    borrarProducto
}