const express = require('express');
const loginRoutes = require('./login.routes');
// const authToken = require("../middlewares/authToken.middleware");

const routes = express.Router();

routes.use('/login', loginRoutes);

module.exports = routes;
