const { Router } = require('express');
const ProdutoController = require('../controllers/produtoController.js');
const roles = require('../middleware/roles.js');
const permissoes = require('../middleware/permissoes.js');
const permissoesRoles = require('../middleware/permissoesRoles.js');

const router = new Router();

router
  .post('/produto', ProdutoController.cadastrarProduto)
  .get('/produto', permissoes(['listar']), ProdutoController.buscarTodosProdutos)
  .get('/produto/id/:id', ProdutoController.buscarProdutoPorId)
  .delete('/produto/id/:id', roles(['Gerente']), permissoes(['excluir']), ProdutoController.deletarProdutoPorId)
  .put('/produto/id/:id', ProdutoController.editarProduto)

module.exports = router