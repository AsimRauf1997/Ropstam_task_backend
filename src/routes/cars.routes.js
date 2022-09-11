const express = require('express');
const {
	addCar,
	deleteCar,
	updateCar,
	getCars,
	getCarById,
} = require('../controller/cars.controllers');
const router = express.Router();

router.route('/').get(getCars).post(addCar);
router.route('/:id').put(updateCar).delete(deleteCar).get(getCarById);

module.exports = router;
