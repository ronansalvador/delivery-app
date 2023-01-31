const express = require('express');
const checkoutController = require('../controllers/checkout.controller');

const checkoutRoutes = express.Router();

checkoutRoutes.post('/', checkoutController.createSale);
checkoutRoutes.get('/customer/:id', checkoutController.getByProductName);

module.exports = checkoutRoutes; 
