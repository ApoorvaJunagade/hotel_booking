
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const connectDB = require('./config');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();

const path = require('path');

app.use(session({
  secret: "your_secret_key", // Change this to a secure key
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to `true` if using HTTPS
}));

app.use(express.static(path.join(__dirname, 'public')));

// If you want to access images through a specific URL, you can keep it simple:
app.get('/images/:imageName', (req, res) => {
  const imageName = req.params.imageName;
  res.sendFile(path.join(__dirname, 'public', 'assets', imageName));
});
app.use(express.json());

app.use(express.urlencoded({ extended: true })); // Parses URL-encoded data
const cors = require('cors');

// Your CORS configuration
app.use(cors({
  origin: 'http://localhost:5173', // Your front-end URL
  credentials: true, // Allow credentials
}));

// Import the DB connection function
const userRoutes = require('./routes/user_routes'); // Import user routes
const hotelRoutes = require('./routes/hotel_routes'); // Import hotel routes
const bookingRoutes = require('./routes/booking_routes'); // Import booking routes



// Serve static assets

// Use Express's built-in JSON parser

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();


// Admin routes and protected routes
const adminRoutes = require('./routes/admin_routes');
const adminProtectedRoutes = require('./routes/protected');

// Use admin and protected routes
app.use('/admin', adminRoutes);
app.use('/admin/protected', adminProtectedRoutes);

// Define the user routes with the prefix /api/users
app.use('/api/users', userRoutes);

// Define the hotel routes with the prefix /api/hotels
app.use('/api/hotels', hotelRoutes);

// Define the booking routes with the prefix /api/bookings
app.use('/api/bookings', bookingRoutes);

// Routes
app.get('/', (req, res) => {
  res.send('API is running...');
});

app.get("/dashboard", (req, res) => {
  res.json({ message: "Welcome to the Admin Dashboard!" });
});
// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
