const { Role } = require('../models');
const { Usuario } = require('../models');
const { Categoria } = require("../models")
const { Producto } = require("../models")


const esRolValido = async (rol = '') => {

    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol ${rol} no esta registrado en la BD`);
    }
    // sino regramos valor significa que la validacion pasa
}

const existeEmail = async function (correo = '') {

    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        throw new Error(`El Correo ${correo} ya esta registrado`);
    }
}

const existeUsuarioPorId = async function (id) {

    // Verificar si el id de usuario existe
    const existeUsuario = await Usuario.findById({ _id: id })
    if (!existeUsuario) {
        throw new Error(`El usuario con id: ${id} no existe`);
    }

}

/**
 * 
 * Validador de categorias
 */

const existeCategoriaPorId = async (id) => {

    const existeCategoria = await Categoria.findOne({ _id: id })
    if (!existeCategoria) {
        throw new Error(`La categoria con id: ${id} no existe`);
    }

}


/**
 * 
 * Validador de productos
 */

 const existeProductoPorId = async (id) => {

    const existeProducto = await Producto.findOne({ _id: id })
    if (!existeProducto) {
        throw new Error(`El producto con id: ${id} no existe`);
    }

}


/**
 * Validar las colecciones permitidas
 */

const coleccionesPermitidas = (coleccion = '', colecciones = []) => {

    const incluida = colecciones.includes(coleccion);
    if(!incluida){
        throw new Error(`La coleccion ${coleccion} no es permitida - ${colecciones}`);
    }

    return true;
}

module.exports = {
    esRolValido,
    existeEmail,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeProductoPorId,
    coleccionesPermitidas

}