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
    const existeEmail = await Usuario.findOne({ correo }); // null sino encuentra nada
    if (existeEmail) {
        throw new Error(`El correo ${correo} ya existe en la BD`);
    }
}

const passwordsCoinciden = async (value, { req }) => {

    if (value !== req.body.repeatPassword) {
        throw new Error('Las contraseñas ingresadas no coinciden');
    }
}

const existeUsuarioPorId = async (id = '') => {
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) {
        throw new Error(`El id: ${id} no existe en la BD`);
    } else {
        const { estado } = existeUsuario;
        if (!estado) {
            throw new Error(`El id: ${id} ya fue borrado de la BD`);
        }
    }
}

module.exports = {
    esRoleValido,
    emailExiste,
    passwordsCoinciden,
    existeUsuarioPorId
}