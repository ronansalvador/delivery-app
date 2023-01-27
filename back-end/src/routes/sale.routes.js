const express = require('express');
const selesController = require('../controllers/sale.controller');

const sellerRoutes = express.Router();

sellerRoutes.get('/:id', selesController.getSaleById);

module.exports = sellerRoutes;
