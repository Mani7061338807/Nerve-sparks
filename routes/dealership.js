const express = require('express');
const router = express.Router();
const {
    getAllCars,
    getCarsSoldByDealership,
    addCarsToDealership,
    getDealsProvidedByDealership,
    addDealsToDealership,
    getSoldVehicles,
    addSoldVehicle
  } = require('../controller/dealership');

// router.get('/cars', getAllCars);
// router.get('/cars/sold', getCarsSoldByDealership);
// router.post('/cars', addCarsToDealership);
// router.get('/deals', getDealsProvidedByDealership);
// router.post('/deals', addDealsToDealership);
// router.get('/vehicles/sold', getSoldVehicles);
// router.post('/vehicles/sold', addSoldVehicle);

module.exports = router;

