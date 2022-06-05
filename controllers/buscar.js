const { response } = require("express");
const { Usuario, Categoria, Producto } = require("../models");
const { ObjectId } = require("mongoose").Types;

const coleccionesPermitidas = [
    'usuarios', 'categorias', 'productos', 'roles'
]


const buscarUsuarios = async (termino = '', res = response) => {

    const esMongoId = ObjectId.isValid(termino);

    try {

        if (esMongoId) {

            const usuario = await Usuario.findById(termino);
            return res.json({
                results: (usuario) ? [usuario] : []
            });
        }

        // busquedas insensibles / expresiones regulares
        const regex = new RegExp(termino, 'i');

        // find ya devuelve un arrray vacio o con datos
        const usuarios = await Usuario.find({
            $or: [{ nombre: regex }, { correo: regex }],
            $and: [{ estado: true }]
        });

        return res.json({
            results: usuarios
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error - Consulte con el administrador'
        })


    }

}

const buscarCategorias = async (termino = '', res = response) => {

    const esMongoId = ObjectId.isValid(termino);

    try {

        if (esMongoId) {

            const categoria = await Categoria.findById(termino);
            return res.json({
                results: (categoria) ? [categoria] : []
            });
        }

        // busquedas insensibles / expresiones regulares
        const regex = new RegExp(termino, 'i');

        // find ya devuelve un arrray vacio o con datos
        const categorias = await Categoria.find({
            $or: [{ nombre: regex, estado: true }],
        });

        return res.json({
            results: categorias
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error - Consulte con el administrador'
        })


    }

}

const buscarProductos = async (termino = '', res = response) => {

    const esMongoId = ObjectId.isValid(termino);

    try {

        if (esMongoId) {

            const producto = await Producto.findById(termino).populate('categoria', 'nombre');
            return res.json({
                results: (producto) ? [producto] : []
            });
        }

        // busquedas insensibles / expresiones regulares
        const regex = new RegExp(termino, 'i');

        // find ya devuelve un arrray vacio o con datos
        const productos = await Producto.find({nombre: regex, estado: true }).populate('categoria', 'nombre');

        return res.json({
            results: productos
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error - Consulte con el administrador'
        })


    }

}

const buscar = (req, res = response) => {

    const { coleccion, termino } = req.params;

    if (!coleccionesPermitidas.includes(coleccion)) {
        return res.status(400).json({
            msg: `Las colecciones permitidas son ${coleccionesPermitidas}`
        })
    }

    switch (coleccion.toString()) {
        case coleccionesPermitidas[0]:
            buscarUsuarios(termino, res);
            break;


        case coleccionesPermitidas[1]:
            buscarCategorias(termino, res);
            break;


        case coleccionesPermitidas[2]:
            buscarProductos(termino, res);
            break;
        case coleccionesPermitidas[3]:

        default:
            // Este es el caso en que el  backend permite una busqueda al frontend pero no esta implementada.
            return res.status(500).json({
                msg: 'Se le olvido hacer esta busqueda'
            })
    }

}

module.exports = { buscar };