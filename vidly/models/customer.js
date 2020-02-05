const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    isGold: Boolean,
    name: {
        type: String,
        required: true,
        min: 3,
        max: 60
    },
    email: String,
    phone: String
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;