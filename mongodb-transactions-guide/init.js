const mongoose = require('mongoose');

// the run-rs command will by default start the replica sets on the following ports
const dbUri = 'mongodb://localhost:27017,localhost:27018,localhost:27019/example';

async function init() {
  // connecting the DB
  await mongoose.connect(dbUri, { replicaSet: 'rs' })
    .then(() => {
        console.log('Connected to mongodb...')
    });

  // a simple mongoose model
  const User = mongoose.model('User', new mongoose.Schema({
    accountId: String, name: String, balance: Number
  }));
  User.createCollection();

  // creating two users
  await User.create([
    { accountId: 'ACC001', name: 'John', balance: 50.00 }, 
    { accountId: 'ACC002', name: 'Jane', balance: 50.00 }
  ]);
}

module.exports = init;