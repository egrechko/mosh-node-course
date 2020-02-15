// bank account money transfer
// 2 accounts
    // account id
    // name
    // balance
// initiat replica set with data
// create model for accounts
// send $10 from one account to the other using mongoose transactions

const mongoose = require('mongoose');
const Account = require('./account');
const init = require('./init');

const dbUri = 'mongodb://localhost:27017,localhost:27018,localhost:27019/bank';

mongoose.connect(dbUri, { replicaSet: 'rs', useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => {
        console.log('Connected to mongodb...')
    })
    .catch( (err) => {
        console.log(err.message);
    });

// run the init function
// init();

async function transferFunds(sendingAccount, recievingAccount, amount) {
    // create the session and assign it to a variable
    const session = await mongoose.startSession();

    // start the transaction
    session.startTransaction();
    try {
        // find the sender
        // subtract amount
        // save
        const sender = await Account.findOne({ accountId: sendingAccount })
            .session(session);

        sender.balance = sender.balance - amount;

        if (sender.balance < 0) {
            throw new Error(`User - ${sender.name} has insufficent funds.`);
        }

        await sender.save();

        // find the reciever
        // add amount
        // save
        const reciever = await Account.findOne({ accountId: recievingAccount })
            .session(session);

        reciever.balance = reciever.balance + amount;

        await reciever.save();

        // commit transaction
        await session.commitTransaction();
        console.log('Money transfered successfully');
    } catch (err) {

        await session.abortTransaction();

        console.log(err.message);
        
        throw err;
    } finally {
        // close session
        await session.endSession();
    }
}

setTimeout(() => {
    transferFunds('ACC0001', 'ACC0002', 10);
}, 10000);