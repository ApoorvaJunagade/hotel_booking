const mongoose = require('mongoose');

// Define the Booking Schema
const bookingSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 0, // Amount should be non-negative
  },
  no_of_rooms: {
    type: Number,
    required: true,
    min: 1, // At least one room must be booked
  },
  hotel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hotel', // Reference to the Hotel model
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt fields automatically
});

// Create and Export the Booking Model
const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;
