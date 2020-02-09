const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

function validateRental(rental) {
    const schema = Joi.object({
        movieId: Joi.string().required(),
        customerId: Joi.string().required()
    });

    return schema.validate(rental);
}

const rentalSchema = new mongoose.Schema({
    movieId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie',
        required: true
    },
    customerId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    dateOut: { type: Date, default: Date.now },
    dateIn: { type: Date }
});

const Rental = mongoose.model('Rental', rentalSchema);

exports.Rental = Rental;
exports.validate = validateRental;