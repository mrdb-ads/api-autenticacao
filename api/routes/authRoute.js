const { Router } = require('express');
const AuthController = require('../controllers/authController.js');

const router = new Router();

router
  .post('/auth/login', AuthController.login);

module.exports = router;