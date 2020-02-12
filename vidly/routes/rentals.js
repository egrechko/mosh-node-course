const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { Rental, validate } = require('../models/rental');
const { Movie } = require('../models/movie');
const { Customer } = require('../models/customer');

function generateError(err) {
    console.log(err.message);
    return res.status(500).json('Something went wrong.');
}

// get all
router.get('/', async (req, res) => {
    try {
        const rental = await Rental.find().sort('-dateOut');
        res.status(200).json(rental);
    } catch (err) {
        generateError(err);
    }
});

// get single
router.get('/:id', async (req, res) => {
    try {
        const rental = await Rental.find({ _id: req.params.id })
        .populate('movieId customerId');

        if (!rental) return res.status(404).json('Rental with the given ID not found.');

        res.status(200).json(rental);
    } catch (err) {
        generateError(err);
    }
});

// post
router.post('/', async (req, res) => {
    // validate input
    const { error } = validate(req.body);
    if (error) return res.status(400).json('Bad request');

    // find customer
    const customer = await Customer.findById(req.body.customerId);
    if (!customer) return res.status(400).json('Invalid customer');

    // find movie
    const movie = await Movie.findById(req.body.movieId);
    if (!movie) return res.status(400).json('Invalid movie');

    if (movie.numberInStock === 0) return res.status(400).json('There are no more movies in stock');

    // create rental
    let rental = await Rental.create({
        customer: {
            _id: customer._id,
            name: customer.name,
            phone: customer.phone
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        }
    });

    rental = await rental.save();

    movie.numberInStock--;
    movie.save();

    res.status(200).json(rental);

    // handle errors
});

// post - my version
// router.post('/', async (req, res) => {
//     // validate input
//     const { error } = validate(req.body);
//     if (error) return res.status(400).json('Bad request');

//    try {
//         // create rental
//         const rental = await Rental.create({
//             movieId: req.body.movieId,
//             customerId: req.body.customerId
//         });

//         // return newly created rental
//         res.status(200).json(rental);
//    } catch (err) {
//        generateError(err);
//    }

//     // catch any errors
// });

// put

// delete

module.exports = router;