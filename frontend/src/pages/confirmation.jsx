import { useLocation } from "react-router-dom";

const ConfirmationPage = () => {
    const location = useLocation();
    console.log("Confirmation Page State:", location.state);  // ✅ Debugging

    if (!location.state || !location.state.booking) {
        return <p>Error: No booking data received</p>;
    }

    const { booking } = location.state;

    return (
        <div>
            <h2>Booking Confirmed!</h2>
            <p>Hotel: {booking.hotelName}</p>
            <p>Booking ID: {booking._id}</p>
            <p>Rooms: {booking.no_of_rooms}</p>
            <p>Amount Paid: ₹{booking.amount}</p>
            <p>Date: {booking.date}</p>
        </div>
    );
};

export default ConfirmationPage;
