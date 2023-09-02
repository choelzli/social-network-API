const { connect, connection } = require('mongoose');

//* Don't forget to add Atlas connection string as a Config Var

const connectionString =
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialNetworkDB';

connect(connectionString);

module.exports = connection;
