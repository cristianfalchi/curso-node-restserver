
const { Router } = require('express');
const { usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
  usuariosPatch } = require('../controllers/usuarios');

const router = Router();

// La request y la response estan siendo pasadas como argumentos a usuariosGet
router.get('/', usuariosGet);
router.put('/:id', usuariosPut);
router.post('/', usuariosPost);
router.delete('/', usuariosDelete);
router.patch('/', usuariosPatch);

module.exports = router;

