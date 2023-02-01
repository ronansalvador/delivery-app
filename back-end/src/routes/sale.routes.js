const express = require('express');
const salesController = require('../controllers/sale.controller');

const salesRoutes = express.Router();

salesRoutes.get('/customer/:id', salesController.saleByCustomerId);
salesRoutes.get('/seller/:id', salesController.saleBySellerId);
salesRoutes.put('/status/:id', salesController.saleByUpdateStatus);

module.exports = salesRoutes;
