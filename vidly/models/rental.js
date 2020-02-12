const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

function validateRental(rental) {
    const schema = Joi.object({
        movieId: Joi.string().required(),
        customerId: Joi.string().required()
    });

    return schema.validate(rental);
}
// old version that I created.
// const rentalSchema = new mongoose.Schema({
//     movieId: { 
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Movie',
//         required: true
//     },
//     customerId: { 
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Customer',
//         required: true
//     },
//     dateOut: { type: Date, default: Date.now },
//     dateIn: { type: Date }
// });

// const Rental = mongoose.model('Rental', rentalSchema);

// Moshes version with Embeded object that pull information from linked schema
const Rental = mongoose.model('Rental', new mongoose.Schema({
    customer: {
        type: new mongoose.Schema({
            name: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 255
            },
            isGold: {
                type: Boolean,
                default: false
            },
            phone: {
                type: String,
                required: true
            },
        }),
        required: true
    },
    movie: {
        type: new mongoose.Schema({
            title: {
                type: String,
                required: true,
                trim: true,
                minlength: 5,
                maxlength: 255
            },
            dailyRentalRate: {
                type: Number,
                required: true,
                min: 0,
                max: 10
            }
        }),
        required: true
    },
    dateOut: {
        type: Date,
        required: true,
        default: Date.now
    },
    dateIn: {
        type: Date
    },
    rentalFee: {
        type: Number,
        min: 0
    }
}));

exports.Rental = Rental;
exports.validate = validateRental;