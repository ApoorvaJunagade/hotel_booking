import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";


const Hotels = () => {
  const [destination, setDestination] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);
  const [hasSearched, setHasSearched] = useState(false); // Flag to track if the search button was clicked

  const updateDest = (e) => {
    setDestination(e.target.value);
  };
  useEffect(() => {
  const fetchHotels = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/hotels/hotels`);
      const result = await response.json();
      setData(result);
      setSearchTerm(destination); // Save the search term
    } catch (error) {
      console.error("Error fetching hotels:", error);
    }
    setHasSearched(true); // Set the flag to true after search
  };
  fetchHotels();
   }, []);
   const serverBaseUrl = 'http://localhost:5000';
  
  return (
        <div className="container bg-light shadow-sm p-5">
          <h2 className="mb-4">Hotels</h2>
          <ul className="list-group">
            {data.map((hotel, index) => (
              <li key={index} className="list-group-item">
                <h4>{hotel.name}</h4>
                <p>{hotel.destination}</p>
                <p>{hotel.address}</p>
                <p>{hotel.rates}</p>
                <p>{hotel.no_of_rooms}</p>
                {/* <p>{hotel.amenities.join(', ')}</p> */}
                <img src={`${serverBaseUrl}${hotel.image_url}`}className="img-fluid" />
                <p>{hotel.description}</p>
              </li>
            ))}
          </ul>
        </div>
      );
};

export default Hotels;

