let express = require('express')
let mongoose = require('mongoose');
let loginRoute = express.Router();
const loginController = require('../controllers/loginController');

loginRoute.get('/', loginController.startLogin);

module.exports = loginRoute;
