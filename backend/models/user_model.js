const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the User Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, // Email validation regex
  },
  phone: {
    type: String,
    required: true,
    match: /^\d{10}$/, // Accepts a 10-digit phone number
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters long"],
  },
  
   
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

// Pre-save hook to hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    this.password = bcrypt.hash(this.password, 10);
    next();
  } catch (err) {
    next(err); // Pass the error to the next middleware
  }
});


// Create and Export the User Model
const User = mongoose.model('User', userSchema);
module.exports = User;
