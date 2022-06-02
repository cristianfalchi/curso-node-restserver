const { response } = require('express');
const Usuario = require('../models/usuario');

const esAdminRole = async (req, res = response, next) => {

    if (!req.usuario) {
        return res.status(500).json({
            msg: 'Se quiere verificar el rol sin validar el token primero'
        })
    }

    // usuario que se creo en base al uid que venia en el jsonwebtoken
    const { rol, nombre } = req.usuario
    if (rol !== 'ADMIN_ROLE') {
        // 401 - no esta autorizado
        return res.status(401).json({
            msg: `${nombre} no es administrador - No puede hacer esto`
        });
    }

    next()

}

const tieneRole = (...roles) => {
    return (req, res = response, next) => {

        // por si quiero ejecutar este middleware sin haber validado mi jwt primero
        if (!req.usuario) {
            return res.status(500).json({
                msg: 'Se quiere verificar el rol sin validar el token primero'
            })
        }

          
        if (!roles.includes(req.usuario.rol)){
            return res.status(401).json({ 
                msg: `El servicio requiere de uno de estos roles ${roles}`
            })
        }
            
        next();
    }
}


module.exports = { esAdminRole, tieneRole };