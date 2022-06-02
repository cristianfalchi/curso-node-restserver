const { Router } = require('express');
const { check } = require('express-validator');

const { authLogin } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');

const router = new Router();

router.post('/login', [
    check('correo', 'El correo obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(), // no le doy pista de como luce una contraseña mia
    validarCampos
], authLogin);


module.exports = router;