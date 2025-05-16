// // Import the Hotel Model

// const express = require('express');
// const hotel = require('../models/hotel_model');
// const router = express.Router();
// // Example: Adding a New hotel
// router.post('/add-hotel', async (req, res) => {
//     try {
//       const newHotel = new hotel(req.body);
//       const savedHotel = await newHotel.save();
//       res.status(201).json(savedHotel);
//     } catch (error) {
//       res.status(500).json({ message: 'Error adding hotel', error: error.message });
//     }
//   });
  
//   router.delete('/delete-hotel/:_id', async (req, res) => {
//     try {
//       const hotelId = req.params._id;
//       const deletedhotel = await hotel.findByIdAndDelete(hotelId);
//       if (!deletedhotel) {
//         return res.status(404).json({ message: 'hotel not found' });
//       }
//       res.status(200).json({ message: 'hotel deleted successfully', hotel: deletedhotel });
//     } catch (error) {
//       res.status(500).json({ message: 'Error deleting hotel', error: error.message });
//     }
//   });

  
//   router.get('/hotels/:destination', async (req, res) => {
//     try {
//       const { destination } = req.params;
  
//       if (!destination) {
//         return res.status(400).json({ error: 'Please provide a destination' });
//       }
  
//       // Query the database to filter hotels by destination
//       const filteredHotels = await hotel.find({
//         destination: { $regex: new RegExp(destination, 'i') }, // Case-insensitive search
//       });
  
//       res.json(filteredHotels);
//     } catch (error) {
//       console.error('Error fetching hotels:', error);
//       res.status(500).json({ error: 'Server error occurred' });
//     }
//   });
  




// // router.get('/hotels/:destination', async (req, res) => {
// //     try {
// //       const { destination } = req.params;
// //       const hotels = await hotel.find({ destination });
// //       res.json(hotels);
// //     } catch (error) {
// //       res.status(500).json({ message: error.message });
// //     }
// //   });
//   router.get('/hotels', async (req, res) => {
//     try {
//       const hotels = await hotel.find(); // Fetch all hotels from the database
//       res.status(200).json(hotels);     // Return hotels in the response
//     } catch (error) {
//       res.status(500).json({ message: 'Error fetching hotels', error: error.message });
//     }
//   });

//   module.exports = router;

const express = require('express');
const hotel = require('../models/hotel_model');
const { verifyAdminToken } = require('../routes/authMiddleware'); // Import the verifyAdminToken middleware
const router = express.Router();

// Add Hotel route, protected by the admin token middleware
router.post('/add-hotel', verifyAdminToken, async (req, res) => {
  try {
    const newHotel = new hotel(req.body);
    const savedHotel = await newHotel.save();
    res.status(201).json(savedHotel);
  } catch (error) {
    res.status(500).json({ message: 'Error adding hotel', error: error.message });
  }
});

// Delete Hotel route, protected by the admin token middleware
router.delete('/delete-hotel/:_id', verifyAdminToken, async (req, res) => {
  try {
    const hotelId = req.params._id;

    // Find the hotel by ID and delete it
    const deletedHotel = await hotel.findByIdAndDelete(hotelId);
    if (!deletedHotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }

    // Return success response
    res.status(200).json({ message: 'Hotel deleted successfully', hotel: deletedHotel });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting hotel', error: error.message });
  }
});

// Get hotels based on destination
router.get('/hotels/:destination', async (req, res) => {
  const { destination } = req.params;
  const { checkInDate, checkOutDate, guests } = req.query;


  try {
    
    if (!destination) {
      return res.status(400).json({ error: 'Please provide a destination' });
    }

    // Query the database to filter hotels by destination
    const filteredHotels = await hotel.find({
      destination: { $regex: new RegExp(destination, 'i') }, // Case-insensitive search
    });

    res.json(filteredHotels);
  } catch (error) {
    console.error('Error fetching hotels:', error);
    res.status(500).json({ error: 'Server error occurred' });
  }
});

// Get all hotels
router.get('/hotels', async (req, res) => {
  try {
    const hotels = await hotel.find(); // Fetch all hotels from the database
    res.status(200).json(hotels);     // Return hotels in the response
  } catch (error) {
    res.status(500).json({ message: 'Error fetching hotels', error: error.message });
  }
});

 // Path to your hotel schema file


// Update a hotel by ID
router.put('/hotels/:id', async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    // Find hotel by ID and update with new data
    const updatedHotel = await hotel.findByIdAndUpdate(
      id,
      { $set: updateData }, // Apply only the fields passed in the request
      { new: true, runValidators: true } // Return the updated document and validate the update
    );

    if (!updatedHotel) {
      return res.status(404).json({ message: 'Hotel not found.' });
    }

    res.status(200).json({ message: 'Hotel updated successfully.', hotel: updatedHotel });
  } catch (error) {
    console.error('Error updating hotel:', error);
    res.status(500).json({ message: 'Internal server error.', error });
  }
});



module.exports = router;
