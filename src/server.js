const app = require('./app');
const config = require('./config/config');
const connectDB = require('./config/database');

app.listen(config.port, () => {
	connectDB();
	console.log(`Server Started ${config.port}`);
});
