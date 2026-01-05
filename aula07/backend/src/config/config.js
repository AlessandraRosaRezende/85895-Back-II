require('dotenv').config();
const mongoose = require('mongoose');

const port = process.env.PORT;
const url = process.env.MONGO_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(url);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
}

module.exports = {
  port,
  connectDB,
}