const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const { Customer, validate } = require('../models/customer');

// get all
router.get('/', async (req, res) => {
    try {
        res.status(200).json(await Customer.find());
    } catch (err) {
        console.log(err);
        res.status(500).json('Something went wrong.');
    }
});

// get single
router.get('/:id', async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);

        if (!customer) return res.status(404).json('The customer with the given ID was not found.');

        res.status(200).json(customer);
    } catch (err) {
        console.log(err.message);
        res.status(500).json('Something went wrong.');
    }
});

// post
router.post('/', auth, async (req, res) => {
    // validate input
    const { error } = validate(req.body);
    if (error) return res.status(400).json('Bad request.');

    try {
        // create customer
        const customer = await Customer.create({
            isGold: req.body.idGold,
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone
        });

        // return newly created customer
        res.status(200).json(customer);
    } catch (err) {
        console.log(err.message);
        res.status(500).json('Something went wrong.');
    }
});

// put
router.put('/:id', auth, async (req, res) => {
    // validate input
    const { error } = validate(req.body);
    if (error) return res.status(400).json('Bad request.');
    
    try {
        // find and update course
        const customer = await Customer.findByIdAndUpdate(req.params.id, {
            $set: {
                isGold: req.body.isGold,
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone
            }
        });

        if (!customer) return res.status(404).json('The customer with the given ID was not found.');

        // return result to user
        res.status(200).json(customer);
    } catch (err) {
        console.log(err.message);
        res.status(200).json('Something went wrong.');
    }

    // catch any errors
});

// delete

router.delete('/:id', auth, async (req, res) => {
    try {
        // find and delete course
        const customer = await Customer.findByIdAndDelete(req.params.id);

        if (!customer) return res.status(404).json('The customer with the given ID was not found.');

        // return success to user
        res.status(200).json(customer);
    } catch (err) {
        // catch any error
        console.log(err.message);
        res.status(500).json('Something went wrong.');
    }
});

module.exports = router;