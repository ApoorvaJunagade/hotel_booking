import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
 import Destinations from './pages/destinations';


const HotelSearch = () => {
  const [destination, setDestination] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);
  const [hasSearched, setHasSearched] = useState(false); // Flag to track if the search button was clicked

  const updateDest = (e) => {
    setDestination(e.target.value);
  };

  // const fetchHotels = async () => {
  //   try {
  //     const response = await fetch(`http://localhost:5000/api/hotels/${destination}`);
  //     const result = await response.json();
  //     setData(result);
  //     setSearchTerm(destination); // Save the search term
  //   } catch (error) {
  //     console.error("Error fetching hotels:", error);
  //   }
  //   setHasSearched(true); // Set the flag to true after search
  // };


 
      // const navigate = useNavigate();
  
      // const [showDestinations, setShowDestinations] = useState(false);

      
  
  


      
  const fetchHotels = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/hotels/hotels/${destination}`);
      const result = await response.json();
      setData(result);
      setSearchTerm(destination); // Save the search term
    } catch (error) {
      console.error("Error fetching hotels:", error);
    }
    setHasSearched(true);
  // Set the flag to true after search
  };

  useEffect(() => {
    
    fetchHotels();
     }, []);
  
  return (
    <>
      <input
        onChange={updateDest}
        value={destination}
        type="text"
        placeholder="Enter Destination"
      />
       <button onClick={ fetchHotels}>Search</button>
      {/* {showDestinations && <Destinations />} */}
      {hasSearched &&  (
        <div>
          
          {searchTerm && <h3>Results for "{searchTerm}":</h3>}
          {data.length > 0 ? (
            data.map((item) => (
              <p key={item.id}>
                <strong>{item.name}</strong> - {item.destination}
              </p>
            ))
          ) : (
            <p>No hotels found.</p>
          )}
        </div>
      )}
    </>
  );
};

export default HotelSearch;
// const Hotels = () => {
//   const [destination, setDestination] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [data, setData] = useState([]);

//   const [hasSearched, setHasSearched] = useState(false); // Flag to track if the search button was clicked

//   const updateDest = (e) => {
//     setDestination(e.target.value);
//   };
//   useEffect(() => {
//   const fetchHotels = async () => {
//     try {
//       const response = await fetch(`http://localhost:5000/api/hotels/${destination}`);
//       const result = await response.json();
//       setData(result);
//       setSearchTerm(destination); // Save the search term
//     } catch (error) {
//       console.error("Error fetching hotels:", error);
//     }
//     setHasSearched(true); // Set the flag to true after search
//   };
//   fetchHotels();
//    }, []);

//   //const fetchHotels = async () => {
//     //       try {
//     //         const response = await axios.get(`http://localhost:5000/api/hotels/${destination}`);
//     //         setHotels(response.data);
//     //       } catch (error) {
//     //         console.error('Error fetching hotels:', error);
//     //       }
//   return (
//         <div className="container bg-light shadow-sm p-5">
//           <h2 className="mb-4">Hotels</h2>
//           <ul className="list-group">
//             {data.map((hotel, index) => (
//               <li key={index} className="list-group-item">
//                 <h4>{hotel.name}</h4>
//                 <p>{hotel.location}</p>
//                 <p>{hotel.price}</p>
//                 {/* <p>{hotel.amenities.join(', ')}</p> */}
//                 <img src={hotel.imageUrl} alt={hotel.name} className="img-fluid" />
//                 <p>{hotel.description}</p>
//               </li>
//             ))}
//           </ul>
//         </div>
//       );
// };

