const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

function validateGenre (genre) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    return schema.validate(genre);
}

const genreSchema = new mongoose.Schema({
    name: { type: String, required: true }
});

const Genre = mongoose.model('Genre', genreSchema);

// export 
exports.Genre = Genre;
exports.validate = validateGenre;