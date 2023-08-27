const { connect, connection } = require('mongoose');

//* Don't forget to add Atlas connection string as a Config Var

//* Add db name in url below:
// const connectionString =
//   process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/nameDB';

connect(connectionString);

module.exports = connection;
