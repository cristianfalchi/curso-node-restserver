const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos, validarJWT, esAdminRole } = require('../middlewares');

const { obtenerProductos,
    obtenerProducto,
    crearProducto,
    actualizarProducto,
    borrarProducto } = require('../controllers/productos');

const { existeProductoPorId, existeCategoriaPorId } = require('../helpers/db-validators');

const router = new Router();

// {{url}}/api/categorias

// Obtener todas las productos.  Servicio publico
router.get('/', obtenerProductos);

// Obtener un producto particular
router.get('/:id', [
    check('id', 'No es un id de Mongo válido').isMongoId(),
    validarCampos,
    check('id').custom(existeProductoPorId),
    validarCampos
], obtenerProducto);

// Crear Producto. Servicio privado - cualquier persona con un token valido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'La categoria no es in id Mongo válido').isMongoId(),
    validarCampos,
    check('categoria').custom(existeCategoriaPorId),
    validarCampos

], crearProducto);

// Actualizar una Producto
router.put('/:id', [
    validarJWT,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    validarCampos,
    check('id').custom(existeProductoPorId),
    validarCampos,
], actualizarProducto);

// Borrar una Producto. Solo si es ADMINISTRADOR|
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    validarCampos,
    check('id').custom(existeProductoPorId),
    validarCampos
], borrarProducto);

module.exports = router;