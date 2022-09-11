const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../../.env') });
module.exports = {
	port: process.env.PORT,
	mongoUri: process.env.MONGO_URI,
	secretKey: process.env.JWT_SECRET_KEY,
	emailUsername: process.env.EMAIL_USERNAME,
	password: process.env.EMAIL_PASSWORD,
};
