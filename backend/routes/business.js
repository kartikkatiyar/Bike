const express = require('express');
const { addBusiness, addAdditionalInfo } = require('../controllers/business');
const businessRouter = express.Router();

businessRouter.post('/aboutBusiness', addBusiness);
businessRouter.post('/additionalInfo', addAdditionalInfo);
module.exports = businessRouter;
