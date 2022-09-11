const generator = require('generate-password');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const password = generator.generate({
	length: 10,
	numbers: true,
});

const generateToken = (id) => {
	return jwt.sign({ id }, config.secretKey, {
		expiresIn: '30d',
	});
};

module.exports = { password, generateToken };
