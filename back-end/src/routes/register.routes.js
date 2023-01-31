const express = require('express');
const { routesValidateToken } = require('../middlewares/authToken.middleware');
const registerController = require('../controllers/register.controller');

const registerRoutes = express.Router();

registerRoutes.post('/', registerController.registerNewUser);
registerRoutes.post(
  '/admin/',
  routesValidateToken,
  registerController.registerNewUser,
 );

module.exports = registerRoutes;
