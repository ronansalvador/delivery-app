const express = require('express');
const adminController = require('../controllers/admin.controller');

const adminRoutes = express.Router();

adminRoutes.get('/', adminController.getUsers);
adminRoutes.post('/', adminController.postUser);
adminRoutes.delete('/', adminController.deleteUser);

module.exports = adminRoutes; 