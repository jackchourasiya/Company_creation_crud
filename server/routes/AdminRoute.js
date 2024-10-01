const express          = require('express');
const route            = express.Router();
const {adminLogin}     = require('../controller/Admin')

route.post('/adminLogin', adminLogin);

module.exports = route;
