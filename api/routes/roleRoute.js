const { Router } = require('express');
const RoleController = require('../controllers/roleController');

const router = new Router();

router
  .post('/roles', RoleController.cadastrar)
  .get('/roles', RoleController.getRoles)
  .get('/roles/:id', RoleController.getRolesById)
  .put('/roles/:id', RoleController.editarRole)
  .delete('/roles/:id', RoleController.deletarRole)

module.exports = router;