const {Router} = require('express');
const {buscar} = require('../controllers/buscar');

const router = new Router();

// Para las busquedas se acostumbra a pasar los paramentros en la url
router.get('/:coleccion/:termino', buscar);

module.exports = router;