const Joi = require('@hapi/joi');
const express = require('express');
const app = express();

app.use(express.json());

const genres = [
    {
        name: 'Horror'
    },
    {
        name: 'Action'
    },
    {
        name: 'Adventure'
    },
    {
        name: 'Romance'
    },
    {
        name: 'Drama'
    },
    {
        name: 'Thriller'
    },
];


// get requests
app.get('/api/genres', (req, res) => {
    res.status(200).send(genres);
});

// single
app.get('/api/genres/:name', (req, res) => {
    const genre = genres.find( g => g.name.toLowerCase() === req.params.name.toLowerCase() );
    if (!genre) return res.status(404).send('Could not find genre with that name');

    const { error } = validateGenre(genre);
    if (error) return res.status(400).send(error.details[0].message);

    res.status(200).send(genre);
});

// post requests
app.post('/api/genres', (req, res) => {
    // validate input
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    // add genre to genres
    const genre = {
        name: req.body.name
    };
    genres.push(genre);

    // return created genre
    res.status(200).send(genre);
});

// put request
app.put('/api/genres/:name', (req, res) => {
    // look up genre
    const genre = genres.find( g => g.name.toLowerCase() === req.params.name.toLowerCase() );
    if (!genre) return res.status(404).send('Could not find genre with that name');

    // validate input
    const { error } = validateGenre(genre);
    if (error) return res.status(400).send(error.details[0].message);

    // update genre
    genre.name = req.body.name;

    // return updated genre
    res.status(200).send(genre);
});

// delete request
app.delete('/api/genres/:name', (req, res) => {
    // look up genre
    const genre = genres.find( g => g.name.toLowerCase() === req.params.name.toLowerCase() );
    if (!genre) return res.status(404).send('Could not find genre with that name');

    const index = genres.indexOf(genre);
    genres.splice(index, 1);

    res.status(200).send(genre);
});

function validateGenre (genre) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    return schema.validate(genre);
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Listening on port ${port}...`);
});