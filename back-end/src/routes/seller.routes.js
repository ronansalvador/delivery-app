const express = require('express');
const sellerController = require('../controllers/seller.controller');

const sellerRoutes = express.Router();

sellerRoutes.get('/', sellerController.getAllSellers);

module.exports = sellerRoutes;
