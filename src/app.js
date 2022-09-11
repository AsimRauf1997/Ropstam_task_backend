const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { xss } = require('express-xss-sanitizer');
const app = express();

/** Importing Routes */
const userRoutes = require('./routes/user.routes');
const categoriesRoutes = require('./routes/categories.routes');
const carsRoutes = require('./routes/cars.routes');

/** Middlewares  */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(xss());
app.use(cors());
app.use(morgan('dev'));

/** Routes */
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/categories', categoriesRoutes);
app.use('/api/v1/cars', carsRoutes);

module.exports = app;
