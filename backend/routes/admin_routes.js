const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/admin_model'); // Admin model
const router = express.Router();
const { verifyAdminToken } = require('./authMiddleware');


// Admin signup
router.post('/signup', async (req, res) => {
  const { username, password, role } = req.body;

  try {
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create admin

    
    const newAdmin = new Admin({ username, password: hashedPassword , role});
    await newAdmin.save();
    const savedAdmin = await newAdmin.save();


    const token = jwt.sign(
      { id: savedAdmin._id, username: savedAdmin.username, role:savedAdmin.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.status(201).json({ message: 'Admin created successfully' });
  } catch (error) {
    console.error('Error during signup:', error); // Log the actual error to debug
    res.status(500).json({ message: 'Error signing up', error: error.message });
  }
  },
);

// Admin login
router.post('/login', async (req, res) => {
  const { username, password, role } = req.body;

  try {
    // Check if admin exists
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(400).json({ message: 'Admin not found' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, admin.password,);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    console.log('JWT_SECRET:', process.env.JWT_SECRET);
    console.log('MONGODB_URI:', process.env.MONGODB_URI);
        // Generate JWT
        const token = jwt.sign(
          { id: admin._id, username: admin.username, role: "admin" }, // Include role
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error during login:', error); // Log the actual error to debug
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
});

router.get('/admins', async (req, res) => {
  try {
    // Fetch all admins from the database
    const admins = await Admin.find();
    
    // Return the list of admins
    res.status(200).json(admins);
  } catch (error) {
    console.error('Error fetching admins:', error); // Log the actual error to debug
    res.status(500).json({ message: 'Error fetching admins', error: error.message });
  }
});

router.get('/dashboard', verifyAdminToken, (req, res) => {
  res.status(200).json({
    message: `Welcome, ${req.admin.username}. You have admin access.`,
  });
});

module.exports = router;
