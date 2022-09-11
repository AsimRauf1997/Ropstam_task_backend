const express = require('express');
const {
	getCategories,
	addCategory,
	updateCategory,
	deleteCategory,
} = require('../controller/categories.controllers');
const router = express.Router();

router.route('/').get(getCategories).post(addCategory);
router.route('/:id').put(updateCategory).delete(deleteCategory);

module.exports = router;
