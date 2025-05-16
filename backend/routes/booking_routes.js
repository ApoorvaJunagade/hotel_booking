const express = require('express');
const router = express.Router();
const Booking = require('../models/booking_model'); // Replace with the correct path to your Booking model

// Create a new booking (POST)
const mongoose = require('mongoose');

router.post('/add-booking', async (req, res) => {
    try {
        let { date, amount, no_of_rooms, hotel, user } = req.body;

        // ✅ Convert user & hotel IDs to ObjectId before saving
        user = new mongoose.Types.ObjectId(user);
        hotel = new mongoose.Types.ObjectId(hotel);

        const newBooking = new Booking({
            date,
            amount,
            no_of_rooms,
            hotel,
            user,
        });

        const savedBooking = await newBooking.save();
        res.status(201).json({ message: 'Booking created successfully', booking: savedBooking });
    } catch (error) {
        res.status(500).json({ message: 'Error creating booking', error: error.message });
    }
});


// Get all bookings (GET)
router.get('/bookings', async (req, res) => {
    try {
        const bookings = await Booking.find()
            .populate('hotel', 'destination name address no_of_rooms rates image_url') // Adjust fields as per the Hotel model
            .populate('user', 'name email phone address'); // Adjust fields as per the User model
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching bookings', error: error.message });
    }
});

// Update a booking by ID (PUT)
router.put('/update-booking/:_id', async (req, res) => {
    try {
        const bookingId = req.params._id;
        const updatedData = req.body;

        const updatedBooking = await Booking.findByIdAndUpdate(bookingId, updatedData, {
            new: true, // Returns the updated document
            runValidators: true, // Runs schema validations
        });

        if (!updatedBooking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        res.status(200).json({ message: 'Booking updated successfully', booking: updatedBooking });
    } catch (error) {
        res.status(500).json({ message: 'Error updating booking', error: error.message });
    }
});

// Delete a booking by ID (DELETE)
router.delete('/delete-booking/:id', async (req, res) => {
    try {
        const bookingId = req.params.id;

        const deletedBooking = await Booking.findByIdAndDelete(bookingId);

        if (!deletedBooking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        res.status(200).json({ message: 'Booking deleted successfully', booking: deletedBooking });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting booking', error: error.message });
    }
});

module.exports = router;
