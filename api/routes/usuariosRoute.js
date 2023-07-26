const { Router } = require('express');
const UsuarioController = require('../controllers/usuarioController.js');
const autenticado = require('../middleware/autenticado.js');

const router = new Router();
router.use(autenticado);

router
	.post('/usuarios', UsuarioController.cadastrar)
	.get('/usuarios', UsuarioController.getUsuarios)
	.get('/usuarios/id/:id', UsuarioController.getUsuarioById)
	.put('/usuarios/id/:id', UsuarioController.editar)
	.delete('/usuarios/id/:id', UsuarioController.deletar)

module.exports = router;