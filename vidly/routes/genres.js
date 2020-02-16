const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const express = require('express');
const router = express.Router();
const {Genre, validate} = require('../models/genre');

// get requests
router.get('/', async (req, res) => {
    try {
        const genres = await Genre.find().select('name').sort('name');
        res.status(200).json(genres);
    } catch (err) {
        console.log(err);
        res.status(500).json(err.message);
    }
});

// single using ID
router.get('/:id', async (req, res) => {
    try {
        const genre = await Genre
            .findById(req.params.id);
        
        if (!genre || genre.length === 0) return res.status(404).json('The genre with the given ID was not found.');

        res.status(200).json(genre);
    } catch (err) {
        console.log(err.message);
        res.status(500).json('Something went wrong.');
    }
});

// post requests
router.post('/', auth, async (req, res) => {
    // validate input
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = new Genre({
        name: req.body.name
    });

    try {
        const result = await genre.save();
        res.status(200).send(result);
    } catch (err) {
        console.log(err.message);
        res.status(400).send(err.message);
    }
});

router.put('/:id', auth, async (req, res) => {
    // vaidate input
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const genre = await Genre.findByIdAndUpdate(req.params.id, {
            $set: {
                name: req.body.name
            }
        });

        res.status(200).json(genre);
    } catch (err) {
        console.log(err.message);
        res.status(500).json('Something went wrong.');
    }
});

// delete request
router.delete('/:id', [auth, admin], async (req, res) => {
    try {
        // const genre = await Genre.findOneAndDelete({ name: new RegExp(req.params.name, 'i') });
        const genre = await Genre
            .findByIdAndRemove(req.params.id);

        if (!genre || genre.length === 0) return res.status(404).json('The genre with the given ID was not found.');

        // send result
        res.status(200).json(genre);
    } catch (err) {
        console.log(err.message);
        res.status(500).json('Something went wrong.');
    }
});

module.exports = router;