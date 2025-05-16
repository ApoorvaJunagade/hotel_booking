const express = require('express');
const { verifyAdminToken } = require('./authMiddleware');
const router = express.Router();

// Protected route
router.get('/dashboard', verifyAdminToken, (req, res) => {
  res.json({ message: `Welcome, ${req.admin.username}. You have admin access.` });
});

module.exports = router;
