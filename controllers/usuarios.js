// Aqui solo creamos funciones y las exportamos

const { response, request } = require('express');


const usuariosGet = (req = request, res = response) => {
    // los query params express los parsea y me los da en una variable
    // configuramos valores por defecto si no mandan los parametros
    const {q, nombre = 'no name', apikey, page, limit} = req.query;

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

const usuariosPost = (req, res = response) => {

    // const body = req.body;    
    const { nombre, edad } = req.body;

    res.json({
        msg: "post API - controlador",
        nombre,
        edad
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