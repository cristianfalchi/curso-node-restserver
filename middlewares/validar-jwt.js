const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT = async (req, res, next) => {

    const token = req.header('x-token') // con express req.get('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        })
    }

    try {

        // verificar el jsonwebtoken
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const usuario = await Usuario.findById(uid); // infromacion del usuario

        if(!usuario){ 
            return res.status(401).json({
                msg: 'Token no válido - usuario no existe en DB'
            })
        }

        if(!usuario.estado){
            return res.status(401).json({
                msg: 'Token no válido - usuario con estado: false'
            })
        }

        // propiedad nueva dentro del request
        req.usuario = usuario;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no valido'
        })
    }


}

module.exports = {
    validarJWT
}