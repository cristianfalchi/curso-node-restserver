const { response } = require('express');

// fuerza a que el usuario sea administrador
const esAdminRole = (req, res = response, next) => {

    // Esto es para asegurarnos que no se llame a la funcion antes de validarJWT
    if (!req.usuario) {
        return res.status(500).json({
            msg: 'Se quiere validar el role sin validar el token primero'
        })
    }

    const { rol, nombre } = req.usuario;

    if (rol !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${nombre} no es administrador - No puede hacer esto`
        })
    }

    next();

}


// esta funcion tiene que regresar una funcion
const tieneRole = (...roles) => {


    return (req, res = response, next) => {
        
        if (!req.usuario) {
            return res.status(500).json({
                msg: 'Se quiere validar el role sin validar el token primero'
            })
        }

        const { rol, nombre } = req.usuario;

        if (!roles.includes(rol)) {
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles: ${roles}`
            })
        }

        next();
    }

}

module.exports = {
    esAdminRole,
    tieneRole
}