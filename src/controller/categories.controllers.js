const { Categories } = require('../models/categories');

const getCategories = async (req, res) => {
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
		const categories = await Categories.find().limit(limit).skip(skip);
		return res.status(200).json(categories);
	} catch (error) {
		return res.status(400).json({ msg: error });
	}
};
const addCategory = async (req, res) => {
	try {
		const { name } = req.body;
		if (!name) {
			return res.status(400).json({ msg: 'Name is Required' });
		}
		const category = await Categories.create({
			name: name,
		});
		return res
			.status(201)
			.json({ msg: 'Added SuccessFully', category: category });
	} catch (error) {
		return res.status(400).json({ msg: error });
	}
};
const updateCategory = async (req, res) => {
	try {
		const { name } = req.body;
		const { id } = req.params;
		if (!name) {
			res.status(400).json({ msg: 'Name is Required' });
		}
		const category = await Categories.findOneAndUpdate(
			{ _id: id },
			{ $set: { name: name } },
			{ new: true }
		);
		return res
			.status(200)
			.json({ msg: 'Updated SuccessFully', category: category });
	} catch (error) {
		console.log(error);
		return res.status(400).json({ msg: error });
	}
};
const deleteCategory = async (req, res) => {
	try {
		const { id } = req.params;
		const category = await Categories.findOneAndDelete({ _id: id });
		return res.status(200).json({ msg: 'Deleted SuccessFully' });
	} catch (error) {
		return res.status(400).json({ msg: error });
	}
};

module.exports = {
	getCategories,
	addCategory,
	updateCategory,
	deleteCategory,
};
