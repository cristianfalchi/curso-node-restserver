// Para que node entienda de que tipo de variable se trata y me 
// proporcione la ayuda
const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');

const usuariosGet = async (req = request, res = response) => {

    const query = { estado: true }; // para no listar los usuarios eliminados
    let { desde = 0, limit } = req.query;

    if (!Number(limit)) {
        limit = 5;
    }

    if (!Number(desde)) {
        desde = 0;
    }

    // Los siguiente dos procesos no dependen uno del otro, por consecuencia usamos Promise.all()
    // para dispararlos simultaneamente
    // const total = await Usuario.countDocuments(query);
    // const usuarios = await Usuario.find(query)
    //     .skip(desde)
    //     .limit(limit)

    const [total, usuarios] = await Promise.all([ // se ejecutan todas de manera simultanea. si Una da error todas dan error
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(desde)
            .limit(limit)
    ])


    res.json({
        total,
        usuarios
    });
}

const usuariosPost = async (req, res = response) => {

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    // 2° - Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    await usuario.save();

    res.json({
        msg: 'post API - controlador',
        usuario
    })
}

const usuariosPut = async (req, res = response) => {

    const { id } = req.params;
    // extraer _id si es que viene
    const { _id, password, google, ...resto } = req.body;

    // TODO validar contra base de datos

    if (password) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json(usuario)
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - controlador'
    })
}

const usuariosDelete = async(req, res = response) => {

    const {id} = req.params;

    // Borrado fisicamente
    // const usuarioDelete = await Usuario.findByIdAndDelete(id);

    const usuarioDelete = await Usuario.findByIdAndUpdate(id, {estado: false});

    res.json({
        id,
        usuarioDelete
    })
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}