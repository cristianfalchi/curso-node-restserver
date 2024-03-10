
const { Router } = require('express');
const { check } = require('express-validator'); // el check va preparando los errores en la req

const { validarCampos, validarJWT, tieneRole, esAdminRole } = require('../middlewares');

const { esRoleValido, emailExiste, passwordsCoinciden, existeUsuarioPorId } = require('../helpers/db-validators');

const { usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
  usuariosPatch } = require('../controllers/usuarios');

const router = Router();

// La request y la response estan siendo pasadas como argumentos a usuariosGet
router.get('/', usuariosGet);

router.put('/:id',[
  check('id', 'No es un id válido').isMongoId(),
  check('id').custom(existeUsuarioPorId),
  check('rol').custom(esRoleValido),
  validarCampos
], usuariosPut);

router.post('/', [
  // check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROL']),
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('password', 'El password debe tener mas de 6 letras').isLength({ min: 6 }),
  check('repeatPassword', 'El password debe tener mas de 6 letras').isLength({ min: 6 }),
  check('password').custom(passwordsCoinciden),
  check('correo').custom(emailExiste),
  check('correo', 'El correo no es válido').isEmail(), // Que campo del body necito revisar?
  check('rol').custom(esRoleValido),
  validarCampos
], usuariosPost);

router.delete('/:id',[
  validarJWT, // funcion que se pasa por referencia
  // esAdminRole,
  tieneRole('ADMIN_ROLE','VENTAS_ROLE'), // funcion que se ejecuta aqui!. (ERROR). debemos retornar una funcion
  check('id', 'No es un id válido').isMongoId(),
  check('id').custom(existeUsuarioPorId),
  validarCampos
], usuariosDelete);

router.patch('/', usuariosPatch);

module.exports = router;

