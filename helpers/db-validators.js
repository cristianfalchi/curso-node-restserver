const Usuario = require('../models/usuario');
const Role = require('../models/role');


const esRoleValido = async (rol = '') => {
    const existeRol = await Role.findOne({ rol });

    if (!existeRol) {
        throw new Error(`El rol ${rol} no está registrado en la BD`);
    }
}

const emailExiste = async (correo = '') => {
    // Verificar el correo si existe
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        throw new Error(`El correo: ${email} ya existe en la BD`);
    }
}

module.exports = {
    esRoleValido,
    emailExiste
}