const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos, validarJWT, esAdminRole } = require('../middlewares');

const { obtenerCategorias, obtenerCategoria, crearCategoria, actualizarCategoria, borrarCategoria } = require('../controllers/categorias');
const { existeCategoriaPorId } = require('../helpers/db-validators');

const router = new Router();

// {{url}}/api/categorias

// Obtener todas las categorias.  Servicio publico
router.get('/', obtenerCategorias);

// Obtener una categoria particular
router.get('/:id', [
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
], obtenerCategoria);

// Crear categoria. Servicio privado - cualquier persona con un token valido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria);

// Actualizar una categoria
router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id', 'No es un id de Mongo válido').isMongoId(),
    validarCampos,
    check('id').custom(existeCategoriaPorId),
    validarCampos
], actualizarCategoria);

// Borrar una categoria. Solo si es ADMINISTRADOR|
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    validarCampos,
    check('id').custom(existeCategoriaPorId),
    validarCampos
], borrarCategoria);




module.exports = router;