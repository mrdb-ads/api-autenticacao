const { Router } = require('express');
const SegurancaController = require('../controllers/segurancaController.js');

const router = new Router();

router
  .post('/seguranca/acl', SegurancaController.cadastrarAcl)
  .post('/seguranca/permissoes-roles')

module.exports = router;