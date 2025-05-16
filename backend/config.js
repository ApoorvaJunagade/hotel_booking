const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const connectDB = async () => {
  try {
    // Use MONGODB_URI from environment variables or fallback to local URI
    const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/myDatabase';

    // Attempt to connect to MongoDB
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB connected successfully!');
  } catch (error) {
    // Provide detailed error logging
    console.error('Error connecting to MongoDB:');
    console.error(`Message: ${error.message}`);
    console.error(`Stack: ${error.stack}`);
    process.exit(1); // Exit the process with failure
  }
};

module.exports = connectDB;
