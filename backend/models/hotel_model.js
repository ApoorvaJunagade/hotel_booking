const mongoose = require('mongoose');

// Define the User Schema
const hotelSchema = new mongoose.Schema({
  destination: {
    type: String,
    required: true,
    trim: true,
  },

  name: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
    unique: true,
    
  },
  no_of_rooms: {
    type: Number,
    required: true,
   
  },
  rates: {
    type: Number,
    required: true,
    trim: true,
  },
  image_url: {
    type: String,
    required: true,
    trim: true,
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});
const Hotel = mongoose.model('Hotel', hotelSchema);

module.exports = Hotel;
