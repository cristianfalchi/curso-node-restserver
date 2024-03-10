// Aqui optimizamos las importaciones
// Para esto uso constantes donde todo lo que se exporta de los archivos va a parar a la constante

const validarCampos = require('../middlewares/validar-campos');
const validarJWT = require('../middlewares/validar-jwt');
const validaRoles = require('../middlewares/validar-roles');

// Con el operador express exporto todo los middlewares personalizados

module.exports = {
    ...validarCampos,
    ...validarJWT,
    ...validaRoles
}