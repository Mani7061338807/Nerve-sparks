const express = require('express');
const {MongoClient} = require('mongodb');
const dbName = "Nerve-Sparks";
const url = "mongodb+srv://manishankarkumar789:mani@cluster0.vgopnh9.mongodb.net/";
const router = express.Router();
// const {
//     getAllCars,
//     getCarsInDealership,
//     getDealershipsWithCar,
//     getAllVehiclesOwnedByUser,
//     getDealershipsWithinRange,
//     getAllDealsOnCar,
//     getAllDealsFromDealership,
//     buyCar
// } = require('../controller/user');
const getAllCars = require('../controller/user')
router.get('/cars', getAllCars);
// router.get('/cars/:dealershipId', getCarsInDealership);
// router.get('/dealerships/:carId', getDealershipsWithCar);
// router.get('/vehicles', getAllVehiclesOwnedByUser);
// router.get('/dealerships/range', getDealershipsWithinRange);
// router.get('/deals/:carId', getAllDealsOnCar);
// router.get('/deals/dealership/:dealershipId', getAllDealsFromDealership);
// router.post('/buy', buyCar);

module.exports = router;
