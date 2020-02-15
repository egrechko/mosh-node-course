const mongoose = require('mongoose');

const Account = mongoose.model('Account', new mongoose.Schema({
    accountId: String,
    name: String,
    balance: Number
}));

module.exports = Account;