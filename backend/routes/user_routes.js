// Import the User Model
const express = require('express');
const User = require('../models/user_model');
const router = express.Router();
const bcrypt = require('bcryptjs');
const session = require('express-session');

const cookieParser = require('cookie-parser');

// Use cookie-parser middleware
router.use(cookieParser());

router.use(
  session({
    secret: 'your_session_secret_key', // Secret key for session encryption
    resave: false, // Don't save session if it's not modified
    saveUninitialized: false, // Don't create session until something is stored
    cookie: {
      httpOnly: true, // Ensures the cookie cannot be accessed by JavaScript
      secure: process.env.NODE_ENV === 'production', // Set to true if using HTTPS
      maxAge: 3600000, // Cookie expiration time (1 hour)
      sameSite: 'strict', // Prevent CSRF attacks
    },
  })
);






// Example: Adding a New User

router.post('/add-user', async (req, res) => {
  try {
      const { name, phone, email, address, password } = req.body;

      // ✅ Check for missing fields
      if (!name || !phone || !email || !address || !password) {
          return res.status(400).json({ 
              message: 'All fields are required',
              errors: {
                  name: !name ? "Name is required" : undefined,
                  phone: !phone ? "Phone is required" : undefined,
                  email: !email ? "Email is required" : undefined,
                  address: !address ? "Address is required" : undefined,
                  password: !password ? "Password is required" : undefined,
              }
          });
      }

      // ✅ Validate password length
      if (password.length < 6) {
          return res.status(400).json({ 
              message: 'Validation error',
              errors: { password: 'Password must be at least 6 characters long' }
          });
      }

      // ✅ Validate phone number format (must be 10 digits)
      if (!/^\d{10}$/.test(phone)) {
          return res.status(400).json({
              message: 'Validation error',
              errors: { phone: 'Phone number must be exactly 10 digits' }
          });
      }

      // ✅ Validate email format
      if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)) {
          return res.status(400).json({
              message: 'Validation error',
              errors: { email: 'Invalid email format' }
          });
      }

      // ✅ Check if email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
          return res.status(400).json({
              message: 'Validation error',
              errors: { email: 'Email already in use' }
          });
      }

      // ✅ Hash the password before saving
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
          name,
          phone,
          email,
          address,
          password: hashedPassword,
      });

      // ✅ Validate schema before saving
      await newUser.validate();

      await newUser.save();
      res.status(201).json({ message: 'User registered successfully' });

  } catch (error) {
      console.error('Error adding user:', error);

      // ✅ Handle Mongoose validation errors properly
      if (error.name === 'ValidationError') {
          const errors = {};
          for (const field in error.errors) {
              errors[field] = error.errors[field].message;
          }
          return res.status(400).json({ message: 'Validation error', errors });
      }

      // ✅ Handle duplicate key errors (email already exists)
      if (error.code === 11000 && error.keyPattern.email) {
          return res.status(400).json({
              message: 'Validation error',
              errors: { email: 'Email already in use' }
          });
      }

      res.status(500).json({ message: 'Server error', error: error.message });
  }
});


router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password.trim(), user.password.trim());
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // ✅ Set session cookie
    res.cookie("userSession", user._id, {
      httpOnly: false,
      secure: false, 
      sameSite: "Lax",
      maxAge: 24 * 60 * 60 * 1000 * 365, 
    });

    console.log("Session ID:", user._id); // ✅ Log session ID in backend

    // ✅ Return session ID in response
    res.status(200).json({ 
      message: "Login successful", 
      sessionId: user._id 
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});






router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Error during logout' });
    }
    res.status(200).json({ message: 'Logout successful' });
  });
});

// ... other routes ...
router.get('/users', async (req, res) => {
  try {
    const users = await User.find();  // Fetch all users from the database
    res.status(200).json(users);  // Respond with the list of users
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users', error: error.message });
  }
});
router.delete('/delete-user/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // ✅ Clear the user's session cookie
    res.clearCookie("userSession", {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
      path: "/", 
    });

    res.status(200).json({ message: 'User deleted successfully and session cleared' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.get("/check-auth", (req, res) => {
  if (req.cookies.userSession) {
    res.json({ isAuthenticated: true, userId: req.cookies.userSession });
  } else {
    res.json({ isAuthenticated: false });
  }
});

module.exports = router;
