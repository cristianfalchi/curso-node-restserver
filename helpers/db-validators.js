const Role = require('../models/role');
const usuario = require('../models/usuario');

const esRolValido = async (rol = '') => {

    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol ${rol} no esta registrado en la BD`);
    }
    // sino regramos valor significa que la validacion pasa
}

const existeEmail = async function (correo = '') {

    const existeEmail = await usuario.findOne({ correo });
    if (existeEmail) {
        throw new Error(`El Correo ${correo} ya esta registrado`);
    }
}

const existeUsuarioPorId = async function (id) {

    // Verificar si el id de usuario existe
    const existeUsuario = await usuario.findOne({ _id:  id } )
    if(!existeUsuario) {
        throw new Error(`El usuario con id: ${id} no existe`);
    }

}


module.exports = {
    esRolValido,
    existeEmail,
    existeUsuarioPorId

}