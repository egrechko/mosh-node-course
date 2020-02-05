const mongoose = require('mongoose');
const express = require('express');
const app = express();
const genres = require('./routes/genres');
const customers = require('./routes/customers');

app.use(express.json());
// routes
app.use('/api/genres', genres);
app.use('/api/customers', customers);

// connect to db
mongoose.connect('mongodb://localhost/vidly', { useUnifiedTopology: true, useNewUrlParser: true })
    .then( () => console.log('Connected to mongodb...'))
    .catch( err => console.error('Could not connect to mongodb...', err));

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Listening on port ${port}...`);
});