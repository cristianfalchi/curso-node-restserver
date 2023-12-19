const { response, request } = require('express'); // Aqui solo creamos funciones y las exportamos
const bcryptjs = require('bcryptjs'); // Para encriptar la contraseña
const Usuario = require('../models/usuario'); // Para crear instancias de mi modelo Usuario

const usuariosGet = (req = request, res = response) => {
    // los query params express los parsea y me los da en una variable
    // configuramos valores por defecto si no mandan los parametros
    const { q, nombre = 'no name', apikey, page, limit } = req.query;

    res.json({
        msg: "get API - controlador",
        q,
        nombre,
        apikey,
        page,
        limit
    })
}

const usuariosPut = (req, res = response) => {
    // los parametros express los parsea y me los da en una variable
    const id = req.params.id;

    res.json({
        msg: "put API - controlador",
        id
    })
}




const usuariosPost = async (req, res = response) => {

    // const body = req.body;    
    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol }); // Creo la instancia de Usuario

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync(/*valor 10  por defecto*/);
    usuario.password = bcryptjs.hashSync(password, salt);

    // Guardar en DB
    await usuario.save();

    res.json({
        usuario
    })
}




const usuariosDelete = (req, res = response) => {
    res.json({
        msg: "delete API - controlador"
    })
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: "patch API - controlador"
    })
}

// Como voy a exportar muchos controladores, lo exporto como un objeto
module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
}