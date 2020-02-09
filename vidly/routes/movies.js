const express = require('express');
const router = express.Router();
const { Movie, validate } = require('../models/movie');
const { Genre } = require('../models/genre')

function generateError(err) {
    console.log(err.message);
    return res.status(500).json('Something went wrong.')
}

// get requests
// get all
router.get('/', async (req, res) => {
    try {
        res.status(200).json(await Movie.find());
    } catch (err) {
        generateError(err);
    }
});

// get single
router.get('/:id', async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);

        if (!movie) return res.status(404).json('The movie with the given ID was not found.');
        
        res.status(200).json(movie);
    } catch (err) {
        generateError(err);
        return;
    }
});

// post requests
router.post('/', async (req, res) => {
    // validate input
    const { error } = validate(req.body);
    if (error) return res.status(400).json('Bad request');

    try {
        // find genre
        const genre = await Genre.findById(req.body.genreId);

        if (!genre) return res.status(200).json('Could not find genre with given ID.');
        
        // update movie
        const movie = await Movie.create({
            title: req.body.title,
            genre: {
                _id: genre._id,
                name: genre.name
            },
            numberInStock: req.body.numberInStock,
            dailyRentalRate: req.body.dailyRentalRate
        });

        await movie.save();

        res.status(200).json(movie);
    } catch (err) {
        generateError(err);
        return;
    }
});

// put
router.put('/:id', async (req, res) => {
    // validate
    const { error } = validate(req.body);
    if (error) return res.status(400).json('Bad request');

    // update movie
    try {
        const movie = await Movie.findById({ _id: req.params.id });

        if (req.body.title) {
            movie.title = req.body.title;
        }

        if (req.body.genre) {
            movie.genre = req.body.genre;
        }

        if (req.body.numberInStock) {
            movie.numberInStock = req.body.numberInStock;
        }

        if (req.body.dailyRentalRate) {
            movie.dailyRentalRate = req.body.dailyRentalRate;
        }

        movie.save();

        res.status(200).json(movie);
    } catch (err) {
        // catch errors
        generateError(err);
    }
});

// delete
router.delete('/:id', async (req, res) => {
    try {
        const movie = await Movie.findByIdAndDelete(req.params.id);

        if (!movie) return res.status(404).json('The movie with the given ID was not found.');
        
        res.status(200).json(movie);
    } catch (err) {
        generateError(err);
        return;
    }
});

module.exports = router;