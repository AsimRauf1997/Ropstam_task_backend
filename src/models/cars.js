const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { categories, cars } = require('../utils/constants');
const carsSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		category: {
			type: Schema.Types.ObjectId,
			ref: categories,
			required: true,
			default: null,
		},
		registration_no: {
			type: String,
			required: true,
		},
		model: {
			type: String,
			required: true,
		},
		color: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

carsSchema.pre(['find', 'findOne', 'findOneAndUpdate'], function () {
	this.lean();
});
const Cars = mongoose.model(cars, carsSchema);

module.exports = { Cars };
