// const jwt = require('jsonwebtoken');

// const verifyAdminToken = (req, res, next) => {
//   const token = req.header('Authorization')?.split(' ')[1];

//   if (!token) {
//     return res.status(401).json({ message: 'Access denied. No token provided.' });
//   }

//   try {
//     const verified = jwt.verify(token, process.env.JWT_SECRET);
//     req.admin = verified; // Attach admin info to request object
//     next();
//   } catch (error) {
//     res.status(400).json({ message: 'Invalid token' });
//   }
// };

// module.exports = { verifyAdminToken };

const jwt = require('jsonwebtoken');

const verifyAdminToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Get the token from the Authorization header

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);  // Verify the JWT token
    if (verified.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admins only.' }); // Check if the user is an admin
    }

    req.admin = verified; // Attach admin info to the request object
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid token' });
  }
};

module.exports = { verifyAdminToken };
