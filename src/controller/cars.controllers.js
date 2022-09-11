const { Cars } = require('../models/cars');

const getCars = async (req, res) => {
	try {
		let { page, size } = req.query;
		if (!page) {
			page = 1;
		}
		if (!size) {
			size = 5;
		}
		const limit = parseInt(size);
		const skip = (page - 1) * size;
		const cars = await Cars.find()
			.limit(limit)
			.skip(skip)
			.populate({
				path: 'category',
				select: 'name',
			})
			.exec();
		return res.status(200).json({ page, size, cars: cars });
	} catch (error) {
		console.log(error);
		return res.status(400).json({ msg: error });
	}
};
const getCarById = async (req, res) => {
	try {
		const { id } = req.params;
		const cars = await Cars.findOne({ _id: id })

			.populate({
				path: 'category',
				select: 'name',
			})
			.exec();
		return res.status(200).json(cars);
	} catch (error) {
		console.log(error);
		return res.status(400).json({ msg: error });
	}
};
const addCar = async (req, res) => {
	try {
		const { name, registration_no, model, category, color } = req.body.data;
		if (!(name && registration_no && model && category && color)) {
			return res.status(400).json({ msg: 'All Fields are Required' });
		}
		const cars = await Cars.create({
			name: name,
			category: category,
			model: model,
			color: color,
			registration_no: registration_no,
		});
		return res.status(201).json({ msg: 'Added SuccessFully', cars: cars });
	} catch (error) {
		return res.status(400).json({ msg: error });
	}
};
const updateCar = async (req, res) => {
	try {
		const { name, registration_no, model, category, color } = req.body.data;

		const { id } = req.params;
		if (!(name && registration_no && model && category && color)) {
			return res.status(400).json({ msg: 'All Fields are Required' });
		}
		const cars = await Cars.findOneAndUpdate(
			{ _id: id },
			{
				$set: {
					name: name,
					category: category,
					registration_no: registration_no,
					color: color,
					model: model,
				},
			},
			{ new: true }
		);
		return res.status(200).json({ msg: 'Updated SuccessFully', cars: cars });
	} catch (error) {
		return res.status(400).json({ msg: error });
	}
};
const deleteCar = async (req, res) => {
	try {
		const { id } = req.params;
		await Cars.findOneAndDelete({ _id: id });
		return res.status(200).json({ msg: 'Deleted SuccessFully' });
	} catch (error) {
		return res.status(400).json({ msg: error });
	}
};

module.exports = {
	getCars,
	addCar,
	updateCar,
	getCarById,
	deleteCar,
};
