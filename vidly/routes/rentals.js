const express = require('express');
const router = express.Router();
const { Rental, validate } = require('../models/rental');

function generateError(err) {
    console.log(err.message);
    return res.status(500).json('Something went wrong.');
}

// get all
router.get('/', async (req, res) => {
    try {
        const rental = await Rental.find();
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

   try {
        // create rental
        const rental = await Rental.create({
            movieId: req.body.movieId,
            customerId: req.body.customerId
        });

        // return newly created rental
        res.status(200).json(rental);
   } catch (err) {
       generateError(err);
   }

    // catch any errors
});

// put

// delete

module.exports = router;