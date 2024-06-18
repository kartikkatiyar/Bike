const express = require('express');
const bikeController = require('../controllers/bike');
const bikeRouter = express.Router();

bikeRouter.post('/addDetails', bikeController.addBike);
bikeRouter.get('/getDetails', bikeController.getAllBikes);
bikeRouter.post('/updateDetails', bikeController.updateBike);

module.exports = bikeRouter;
