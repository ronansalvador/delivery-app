const express = require('express');
const loginRoutes = require('./login.routes');
const registerRoutes = require('./register.routes');
const productsRoutes = require('./product.routes');

const { routesValidateToken } = require('../middlewares/authToken.middleware');

const routes = express.Router();

routes.use('/login', loginRoutes);
routes.use('/register', registerRoutes);
routes.use('/products', routesValidateToken, productsRoutes);

module.exports = routes;
