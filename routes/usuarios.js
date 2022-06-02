const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos, validarJWT, esAdminRole, tieneRole } = require('../middlewares');

const { usuariosGet, usuariosPost, usuariosPut, usuariosPatch, usuariosDelete } = require('../controllers/usuarios');
const { esRolValido, existeEmail, existeUsuarioPorId } = require('../helpers/db-validators');


const router = Router();

// No se ejecuta la funcion. Estoy mandando una referencia
router.get('/', usuariosGet);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(), // especifico que campo del body necesito validar
    check('password', 'El password debe de ser más de 6 letras').isLength({ min: 6 }),
    check('correo', 'El correo no es válido').isEmail(),
    // check('rol', 'No es un rol permitido').isIn('ADMIN_ROLE', 'USER_ROLE'),
    check('rol').custom(esRolValido),
    check('correo').custom(existeEmail),
    validarCampos

], usuariosPost);

router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRolValido),
    validarCampos
], usuariosPut);

router.patch('/', usuariosPatch);

router.delete('/:id', [
    validarJWT,
    esAdminRole, // fuerza a que el usuario sea administrador
    tieneRole('ADMIN_ROLE', 'USER_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usuariosDelete);


module.exports = router;