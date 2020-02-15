const mongoose = require('mongoose');
const Account = require('./account');

async function init() {
    console.log('Initiating DB');

    // creating accounts
    await Account.create([
        { accountId: 'ACC0001', name: 'John', balance: 50 },
        { accountId: 'ACC0002', name: 'Jane', balance: 50 }
    ]);
    
    console.log('Accounts created.');
};

module.exports = init;