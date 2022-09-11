const mongoose = require('mongoose');
const { categories } = require('../utils/constants');
const categoriesSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

categoriesSchema.pre(['find', 'findOne', 'findOneAndUpdate'], function () {
	this.lean();
});
const Categories = mongoose.model(categories, categoriesSchema);

module.exports = { Categories };
