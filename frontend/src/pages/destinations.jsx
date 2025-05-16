import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import Cookies from "js-cookie";

const Destinations = ({ isVisible, setIsSliderVisible }) => {
  const [formData, setFormData] = useState({
    destination: "",
    checkInDate: "",
    checkOutDate: "",
    guests: 1,
  });
  const [hotels, setHotels] = useState([]);
  const [error, setError] = useState("");
  const [searchAttempted, setSearchAttempted] = useState(false); // New state

  const navigate = useNavigate(); // Initialize the navigate hook

  if (!isVisible) return null;

  const serverBaseUrl = "http://localhost:5000";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSearchAttempted(true); // Mark that the user has searched

    const { destination, checkInDate, checkOutDate, guests } = formData;

    if (new Date(checkInDate) >= new Date(checkOutDate)) {
      setError("Check-out date must be later than check-in date.");
      return;
    }
    console.log("setIsSliderVisible inside handleSubmit:", setIsSliderVisible);

    if (typeof setIsSliderVisible !== "function") {
      console.error("setIsSliderVisible is not a function!");
      return;
    }
    setIsSliderVisible(false);

    try {
      const queryParams = new URLSearchParams({
        checkInDate,
        checkOutDate,
        guests,
      }).toString();

      const response = await fetch(
        `http://localhost:5000/api/hotels/hotels/${destination}?${queryParams}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch hotels.");
      }

      const data = await response.json();
      setHotels(data);
    } catch (err) {
      setError("An error occurred while fetching hotels. Please try again.");
      console.error("Error fetching hotels:", err);
    }
  };

  const handleReserveClick = (hotel) => {
    const userSession = Cookies.get("userSession");

    if (!userSession) {
        navigate("/register");
    }

    let userId;
    try {
        userId = JSON.parse(userSession);
        if (typeof userId === "object" && userId._id) {
            userId = userId._id;
        }
    } catch (error) {
        userId = (typeof userSession === "string" ? userSession : "")
            .replace(/^j:/, "")
            .replace(/"/g, "");
    }

    if (!userId || userId.length !== 24) {
        return alert("Invalid User ID, please log in again.");
    }

    // ✅ Pass check-in and check-out dates
    navigate("/booking", { 
        state: { 
            userId, 
            hotel, 
            checkInDate: formData.checkInDate,
            checkOutDate: formData.checkOutDate 
        } 
    });
};



  return (
    <div className="container bg-light shadow-sm p-5">
      <h2 className="mb-4">Search Destinations</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="destination" className="form-label">
            Destination
          </label>
          <input
            type="text"
            id="destination"
            name="destination"
            className="form-control"
            value={formData.destination}
            onChange={handleChange}
            placeholder="Enter destination"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="checkInDate" className="form-label">
            Check-in Date
          </label>
          <input
            type="date"
            id="checkInDate"
            name="checkInDate"
            className="form-control"
            value={formData.checkInDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="checkOutDate" className="form-label">
            Check-out Date
          </label>
          <input
            type="date"
            id="checkOutDate"
            name="checkOutDate"
            className="form-control"
            value={formData.checkOutDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="guests" className="form-label">
            Guests
          </label>
          <input
            type="number"
            id="guests"
            name="guests"
            className="form-control"
            value={formData.guests}
            onChange={handleChange}
            min="1"
            max="10"
            required
          />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <button type="submit" className="btn btn-primary">
          Search
        </button>
      </form>

      {/* Show search results only after the user has searched */}
      {searchAttempted && (
        hotels.length > 0 ? (
          <div className="mt-4">
            <h3>Available Hotels</h3>
            <ul className="list-group">
              {hotels.map((hotel, index) => (
                <li key={index} className="list-group-item">
                  <div className="d-flex flex-column">
                    <div>
                      <h4>{hotel.name}</h4>
                      <p>Location: {hotel.address}</p>
                      <p>Price: {hotel.rates}</p>
                      <p>Rooms Available: {hotel.no_of_rooms}</p>
                      <p>{hotel.amenities?.join(", ") || "Amenities not available."}</p>
                      <img
                        src={`${serverBaseUrl}${hotel.image_url}`}
                        alt={hotel.name}
                        className="img-fluid"
                        style={{ maxHeight: "200px", objectFit: "cover" }}
                      />
                      <p>{hotel.description}</p>
                    </div>
                    {/* Reserve button to the right and close to content */}
                    <div className="d-flex justify-content-end mt-3">
                      <button className="btn btn-warning" onClick={() => handleReserveClick(hotel)}>Reserve Now</button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="mt-4 alert alert-warning text-center">
            No hotels found. Please try a different search.
          </div>
        )
      )}
    </div>
  );
};

export default Destinations;
