const express = require('express');
const router = express.Router();
const _ = require('lodash');
const bcrypt = require('bcrypt');
const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');
const config = require('config');
const { User } = require('../models/user');

router.post('/', async (req, res) => {
    // validate input
    const { error } = validate(req.body);
    if (error) return res.status(400).json('Bad request');

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json('Invalid email or password.');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).json('Invalid email or password.');
    
    // create user
    try {
        // generate web token
        const token = user.generateAuthToken();
        
        res.status(200).json(token);
    } catch (err) {
        console.log(err.message);
        res.status(500).json('Internal server error.');
    }
});

function validate(req) {
    const schema = Joi.object({
        email: Joi.string().min(4).max(255).required().email(),
        passowrd: Joi.string().min(4).max(255).required()
    });

    return schema.validate();
}

module.exports = router;