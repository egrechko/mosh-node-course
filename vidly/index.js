const config = require('config');
const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');

if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPiravteKey is not defined.');
    process.exit(1);
}

app.use(express.json());
// routes
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);

// connect to db
mongoose.connect('mongodb://localhost/vidly', { useUnifiedTopology: true, useNewUrlParser: true })
    .then( () => console.log('Connected to mongodb...'))
    .catch( err => console.error('Could not connect to mongodb...', err));

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Listening on port ${port}...`);
});