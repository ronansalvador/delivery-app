const express = require('express');
const loginRoutes = require('./login.routes');
const registerRoutes = require('./register.routes');
const productsRoutes = require('./product.routes');
const checkoutRoutes = require('./checkout.routes');
const sellerRoutes = require('./seller.routes');
const salesController = require('./sale.routes');
const adminontroller = require('./admin.routes');

const { routesValidateToken } = require('../middlewares/authToken.middleware');

const routes = express.Router();

routes.use('/login', loginRoutes);
routes.use('/register', registerRoutes);
routes.use('/products', routesValidateToken, productsRoutes);
routes.use('/checkout', routesValidateToken, checkoutRoutes);
routes.use('/seller', routesValidateToken, sellerRoutes);
routes.use('/sales', routesValidateToken, salesController);
routes.use('/admin', routesValidateToken, adminontroller);

module.exports = routes;
