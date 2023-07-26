const { Router } = require('express');
const PermissaoController = require('../controllers/permissaoController');

const router = new Router();

router
  .post('/permissao', PermissaoController.cadastrar)
  .get('/permissao', PermissaoController.getPermissoes)
  .get('/permissao/:id', PermissaoController.getPermissaoById)
  .put('/permissao/:id', PermissaoController.editarPermissao)
  .delete('/permissao/:id', PermissaoController.deletarPermissao)

module.exports = router;