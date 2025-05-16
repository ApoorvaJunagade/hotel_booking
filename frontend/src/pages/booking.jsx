import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Booking = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // ✅ Extract check-in and check-out dates from location.state
    const { hotel, userId, noOfRooms: initialRooms, checkInDate, checkOutDate } = location.state || {}; 

    const [noOfRooms, setNoOfRooms] = useState(initialRooms || 1);
    const [error, setError] = useState("");

    console.log("Location State:", location.state);  // ✅ Debugging
    console.log("Received Hotel:", hotel);
    console.log("Received User ID:", userId);
    console.log("Check-in Date:", checkInDate);
    console.log("Check-out Date:", checkOutDate);

    if (!hotel || !userId || !checkInDate || !checkOutDate) {
        return <p>Error: Missing required booking details</p>;
    }

    const handleBooking = async () => {
        if (noOfRooms <= 0) {
            setError("Please select at least one room.");
            return;
        }

        try {
            const bookingData = {
                user: userId.trim(),
                hotel: hotel._id,
                no_of_rooms: noOfRooms,
                date: checkInDate,
                check_out_date: checkOutDate,
                amount: hotel.rates * noOfRooms,
            };

            console.log("Booking Data Sending:", bookingData); // ✅ Debugging

            const response = await fetch("http://localhost:5000/api/bookings/add-booking", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(bookingData),
            });

            const data = await response.json();
            console.log("Server Response:", data); // ✅ Debugging

            if (!response.ok) {
                throw new Error(data.message || "Booking failed");
            }

            navigate("/confirmation", { 
                state: { 
                    booking: { ...data.booking, hotelName: hotel.name } 
                } 
            });
        } catch (err) {
            console.error("Booking Error:", err);
            setError(err.message || "Booking failed. Please try again.");
        }
    };

    return (
        <div>
            <h2>Booking for {hotel.name}</h2>
            <p>Location: {hotel.address}</p>
            <p>Available Rooms: {hotel.no_of_rooms}</p>
            <p>Rate per Room: ₹{hotel.rates}</p>

            {/* ✅ Display Check-in & Check-out Dates */}
            <label>
                From Date (Check-in):
                <input type="date" value={checkInDate} disabled />
            </label>
            <br />

            <label>
                To Date (Check-out):
                <input type="date" value={checkOutDate} disabled />
            </label>
            <br />

            <label>
                Select Rooms:
                <input
                    type="number"
                    value={noOfRooms}
                    onChange={(e) => setNoOfRooms(Number(e.target.value))}
                    min="1"
                    max={hotel.no_of_rooms} 
                />
            </label>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <button onClick={handleBooking}>Book Now</button>
        </div>
    );
};

export default Booking;
