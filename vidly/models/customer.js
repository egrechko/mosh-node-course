const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const customerSchema = new mongoose.Schema({
    isGold: {
        type: Boolean,
        default: false
    },
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 60
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true
    }
});

// input validation
function validateCustomer(customer) {
    const schema = Joi.object({
        isGold: Joi.boolean(),
        name: Joi.string().min(3).required(),
        email: Joi.string().required(),
        phone: Joi.string().required()
    });

    return schema.validate(customer);
}

const Customer = mongoose.model('Customer', customerSchema);

exports.Customer = Customer;
exports.validate = validateCustomer;