const debug = require('debug')('app:startup');
// const config = require('config');
const express = require("express");
const app = express();
const helmet = require('helmet');
const morgan = require('morgan');
const courses = require('./routes/courses');
const home = require('./routes/home');

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('dist'));
app.use('/api/courses', courses);
app.use('/', home);

// configuration
// console.log(`Application name: ${config.get('name')}`);
// console.log(`Mail Server: ${config.get('mail.host')}`);
// console.log(`Mail Password: ${config.get('mail.password')}`);

// log all requests if in development env
if (app.get('env') === 'development') {
	app.use(morgan('tiny'));
	debug('Morgan enabled...');
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Listening on port ${port}...`);
});
