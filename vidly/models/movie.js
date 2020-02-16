const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const {genreSchema} = require('./genre');

function validateMovie (movie) {
    const schema = Joi.object({
        title: Joi.string().min(3).required(),
        genreId: Joi.objectId().required(),
        numberInStock: Joi.number().required(),
        dailyRentalRate: Joi.number().required()
    });

    return schema.validate(movie);
}

const movieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    genre: { type: genreSchema, required: true },
    numberInStock: { type: Number, required: true },
    dailyRentalRate: { type: Number, required: true }
});

const Movie = mongoose.model('Movie', movieSchema);

exports.Movie = Movie;
exports.validate = validateMovie;