
const { Router } = require('express');
const { check } = require('express-validator'); // el check va preparando los errores en la req

const { validarCampos } = require('../middlewares/validar-campos');
const { esRoleValido, emailExiste, passwordsCoinciden } = require('../helpers/db-validators');

const { usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
  usuariosPatch } = require('../controllers/usuarios');



const router = Router();

// La request y la response estan siendo pasadas como argumentos a usuariosGet
router.get('/', usuariosGet);

router.put('/:id', usuariosPut);

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

router.delete('/', usuariosDelete);

router.patch('/', usuariosPatch);

module.exports = router;

