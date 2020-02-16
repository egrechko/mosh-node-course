const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const _ = require('lodash');
const bcrypt = require('bcrypt');
const { User, validate } = require('../models/user');

// get current user
router.get('/me', auth, async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.status(200).json(user);
});

// register new user
router.post('/', async (req, res) => {
    // validate input
    const { error } = validate(req.body);
    if (error) return res.status(400).json('Bad request');

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).json('User already registered.');
    
    // create user
    try {
        // lodash to the rescue
        user = new User(_.pick(req.body, ['name', 'email', 'password']));
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        // save user
        await user.save();

        // generate token
        const token = user.generateAuthToken();
        
        // send response
        res.header('x-auth-token', token).status(200).json(_.pick(user, ['_id', 'name', 'email']));
    } catch (err) {
        console.log(err.message);
        res.status(500).json('Internal server error.');
    }
});

module.exports = router;