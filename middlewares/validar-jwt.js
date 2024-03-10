
const { response } = require('express');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario'); // Para crear instancias de mi modelo Usuario

// No quiero que se ejecute ninguna API o ENDPOINT especifico sino tiene un JWT asociado (debe estar logueado en principio)
const validarJWT = async (req, res = response, next) => {

    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        })
    }

    try {

        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        // leer el usuario que corresponde al uid. Sino se encuentra devuelve undefine y hay que evaluarlo
        const usuario = await Usuario.findById(uid);

        if(!usuario) {
            return res.status(401).json({
                msg: 'Token no válido - usuario no existe en DB'
            })
        }

        // Verificar si el uid tiene estado en true
        if(!usuario.estado){
            return res.status(401).json({
                msg: 'Token no válido - usuario con estado: false'
            })
        }

        // Debo pasar el uid en algun lugar que me permita usarlo en los controladores
        // y asi poder chequear que ese uid corresponda con un usuario que posea un rol
        // autorizado para ejecutar la operacion que desea
        req.usuario = usuario;

        next();

    } catch (error) {
        console.log(error);
        return res.status(401).json({
            msg: 'Token no válido'
        })
    }
}

module.exports = {
    validarJWT
}