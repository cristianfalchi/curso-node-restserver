const { Router } = require('express');
const { check } = require('express-validator');

const { authLogin, authGoogleSignIn } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');

const router = new Router();

router.post('/login', [
    check('correo', 'El correo obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(), // no le doy pista de como luce una contraseña mia
    validarCampos
], authLogin);

router.post('/google', [
    check('id_token', 'id_token es necesario').not().isEmpty(),
    validarCampos
], authGoogleSignIn);


module.exports = router;