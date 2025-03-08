const mongoose = require('mongoose');

async function connectToDB() {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_URL);
    console.log('MongoDb connected:', connect.connection.host);

  } catch (error) {
    console.error('Error connecting to mongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = connectToDB;