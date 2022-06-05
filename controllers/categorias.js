
const { response } = require('express');
const { Categoria } = require('../models')


// con paginado - total
const obtenerCategorias = async (req, res = response) => {

    const { desde = 0, limit = 10 } = req.query;

    try {

        const [total, categorias] = await Promise.all([
            Categoria.countDocuments({ estado: true }),
            Categoria.find({ estado: true })
                .skip(desde)
                .limit(limit)
                .populate('usuario', 'nombre')
        ])
        res.status(200).json({
            total,
            categorias
        }
        );

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'No se pueden obtener las categorias - Consulte con el administrador'
        })
    }
}


const obtenerCategoria = async (req, res = response) => {

    const { id } = req.params;

    try {

        const categoria = await Categoria.findOne({ _id: id, estado: true }).populate('usuario', 'nombre');
        if(!categoria){
            return res.status(400).json({
                msg: `La categoria con id: ${id} no existe`
            })
        }
        res.status(200).json({ categoria });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error en la BD - consulte con el administrador'
        })
    }

}

const crearCategoria = async (req, res = response) => {

    // las categorias las quiero almacenar en mayusculas
    const nombre = req.body.nombre.toUpperCase();

    try {

        const categoriaDB = await Categoria.findOne({ nombre });

        if (categoriaDB) {
            return res.status(400).json({
                msg: `La categoria ${categoriaDB.nombre} ya existe`
            })
        }

        // genero la data a guardar
        const data = {
            nombre,
            usuario: req.usuario._id // _id mongo lo graba asi al id
        }

        // Preparo la data en el modelo
        const categoria = new Categoria(data);

        // Guarda DB
        await categoria.save();

        res.status(201).json(categoria)

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Falla en la creación de la categoria"
        })
    }


}

const actualizarCategoria = async (req, res = response) => {
    // las categorias las quiero almacenar en mayusculas
    const nombre = req.body.nombre.toUpperCase();
    const { id } = req.params;

    try {

        let categoriaDB = await Categoria.findOne({ nombre });

        if (categoriaDB) {
            return res.status(400).json({
                msg: `La categoria ${categoriaDB.nombre} ya existe`
            })
        }

        const categoria = await Categoria.findByIdAndUpdate(id, { nombre }, {new: true})
            .populate('usuario', 'nombre')

        res.status(201).json(categoria)

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Fallo la actualizacion de la categoria"
        })
    }
}

const borrarCategoria = async (req, res = response) => {

    const { id } = req.params;

    try {

        const categoriaActualizada = await Categoria.findByIdAndUpdate(id, { estado: false }, {new: true});

        res.status(200).json(categoriaActualizada);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Comuniquese con el administrador - error en BD'
        })
    }


}


module.exports = {
    obtenerCategorias,
    obtenerCategoria,
    crearCategoria,
    actualizarCategoria,
    borrarCategoria
}