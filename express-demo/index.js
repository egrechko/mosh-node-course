const express = require("express");
const app = express();
const Joi = require('@hapi/joi');

app.use(express.json());

const courses = [
	{
		id: 1,
		name: 'course1'
	},
	{
		id: 2,
		name: 'course2'
	},
	{
		id: 3,
		name: 'course3'
	},
]

app.get('/', (req, res) => {
	res.send('Hello world!');
});

app.get('/api/courses', (req, res) => {
	res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
	const course = courses.find( c => c.id === parseInt(req.params.id) );
	if (!course) return res.status(404).send('The course with the given id cannot be found.');


	res.send(course);
});

// post requests
app.post('/api/courses', (req, res) => {

	const { error } = validateCourse(req.body);
	if (error) return res.status(400).send(error.details[0].message);


	const course = {
		id: courses.length + 1,
		name: req.body.name
	};

	courses.push(course);

	res.status(200).type('json').send(course);
});

app.put('/api/courses/:id', (req, res) => {
	// look up the course
	// if not existing return 404
	const course = courses.find( c => c.id === parseInt(req.params.id) );
	if (!course) return res.status(404).send('The course with the given id cannot be found.');


	// validate input
	// if invalid return 400
	const { error } = validateCourse(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	// update the course
	// return the updated course. 
	course.name = req.body.name;
	res.status(200).send(course);
	
});

app.delete('/api/courses/:id', (req, res) => {
	const course = courses.find( c => c.id === parseInt(req.params.id) );
	if (!course) return res.status(404).send('The course with the given id cannot be found.');


	const index = courses.indexOf(course);
	
	courses.splice(index, 1);

	res.status(200).send(course);
});

function validateCourse(course) {
	const schema = Joi.object({
		name: Joi.string().min(3).required()
	});

	return schema.validate(course);
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Listening on port ${port}...`);
});
