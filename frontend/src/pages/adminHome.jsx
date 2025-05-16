import { useState, useEffect } from "react";
import Hotels from "./hotels.jsx";

function AdminDashboard() {
  const serverBaseUrl = 'http://localhost:5000';
  const [activeTab, setActiveTab] = useState("hotels");
  const [hotels, setHotels] = useState([]);
  const [users, setUsers] = useState([]);

  const [newHotel, setNewHotel] = useState({
    name: "",
    destination: "",
    address: "",
    rates: "",
    no_of_rooms: "",
    image_url: "",
  });
  const [editHotel, setEditHotel] = useState(null); // Track hotel being edited

  useEffect(() => {
    fetchHotels();
    fetchUsers();
  }, []);

  const fetchHotels = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/hotels/hotels");
      const result = await response.json();
      setHotels(result);
    } catch (error) {
      console.error("Error fetching hotels:", error);
    }
  };

  const handleAddOrUpdateHotel = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const url = editHotel
        ? `http://localhost:5000/api/hotels/hotels/${editHotel._id}`
        : "http://localhost:5000/api/hotels/add-hotel";

      const method = editHotel ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newHotel),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${editHotel ? "update" : "add"} hotel`);
      }

      setNewHotel({
        name: "",
        destination: "",
        address: "",
        rates: "",
        no_of_rooms: "",
        image_url: "",
      });

      setEditHotel(null); // Reset edit mode
      fetchHotels(); // Refresh hotel list
    } catch (error) {
      console.error("Error adding/updating hotel:", error);
    }
  };

  const handleEdit = (hotel) => {
    setNewHotel(hotel);
    setEditHotel(hotel);
  };

  const handleDelete = async (hotelId) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(
        `http://localhost:5000/api/hotels/delete-hotel/${hotelId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete hotel");
      }

      setHotels(hotels.filter((hotel) => hotel._id !== hotelId));
    } catch (error) {
      console.error("Error deleting hotel:", error);
    }
  };
  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/users/users"); // Correct API endpoint
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const result = await response.json();
      setUsers(result);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await fetch(`http://localhost:5000/api/users/delete-user/${userId}`, {
        method: "DELETE",
      });
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
      document.cookie = "userSession=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    }
  };
  return (
    <div className="container mt-5">
      <h2 className="text-center">Admin Dashboard</h2>
      <ul className="nav nav-tabs mt-3">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "hotels" ? "active" : ""}`}
            onClick={() => setActiveTab("hotels")}
          >
            Manage Hotels
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "users" ? "active" : ""}`}
            onClick={() => setActiveTab("users")}
          >
            Manage Users
          </button>
        </li>
      </ul>

      <div className="mt-3">
        {activeTab === "hotels" ? (
          <>
            <div className="mb-3">
              <input
                type="text"
                placeholder="Hotel Name"
                className="form-control mb-2"
                value={newHotel.name}
                onChange={(e) => setNewHotel({ ...newHotel, name: e.target.value })}
              />
              <input
                type="text"
                placeholder="Destination"
                className="form-control mb-2"
                value={newHotel.destination}
                onChange={(e) => setNewHotel({ ...newHotel, destination: e.target.value })}
              />
              <input
                type="text"
                placeholder="Address"
                className="form-control mb-2"
                value={newHotel.address}
                onChange={(e) => setNewHotel({ ...newHotel, address: e.target.value })}
              />
              <input
                type="number"
                placeholder="Rates"
                className="form-control mb-2"
                value={newHotel.rates}
                onChange={(e) => setNewHotel({ ...newHotel, rates: e.target.value })}
              />
              <input
                type="text"
                placeholder="Image URL"
                className="form-control mb-2"
                value={newHotel.image_url}
                onChange={(e) => setNewHotel({ ...newHotel, image_url: e.target.value })}
              />
              <input
                type="number"
                placeholder="Number of Rooms"
                className="form-control mb-2"
                value={newHotel.no_of_rooms}
                onChange={(e) => setNewHotel({ ...newHotel, no_of_rooms: e.target.value })}
              />
              <button className="btn btn-success" onClick={handleAddOrUpdateHotel}>
                {editHotel ? "Update Hotel" : "Add Hotel"}
              </button>
            </div>

            {hotels.map((hotel) => (
              <div key={hotel._id} className="hotel-item p-3 border rounded mb-2">
                <h5>{hotel.name}</h5>
                <p>Destination: {hotel.destination}</p>
                <p>Address: {hotel.address}</p>
                <p>Rates: ${hotel.rates}</p>
                <p>No. of Rooms: {hotel.no_of_rooms}</p>
                <p>
                  <img src={`${serverBaseUrl}${hotel.image_url}`} alt={hotel.name} className="img-fluid" />
                </p>
                <button className="btn btn-warning me-2" onClick={() => handleEdit(hotel)}>
                  Edit
                </button>
                <button className="btn btn-danger" onClick={() => handleDelete(hotel._id)}>
                  Delete
                </button>
              </div>
            ))}
          </>
        ) :  (
          <div>
            <h3 className="mb-4">Manage Users</h3>
            <ul className="list-group">
              {users.length > 0 ? (
                users.map((user) => (
                  <li key={user._id} className="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                      <strong>{user.name}</strong> ({user.email})
                    </div>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDeleteUser(user._id)}>
                      Delete
                    </button>
                  </li>
                ))
              ) : (
                <li className="list-group-item text-center">No users found</li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;





// function AdminDashboard() {
//   const serverBaseUrl = 'http://localhost:5000';
//   const [activeTab, setActiveTab] = useState("hotels");
//   const [hotels, setHotels] = useState([]);
//   const [users, setUsers] = useState([]);
  
//   const [newHotel, setNewHotel] = useState({
//     name: "",
//     destination: "",
//     address: "",
//     rates: "",
//     no_of_rooms: "",
//     image_url: "",
//   });
  
//   const [editHotel, setEditHotel] = useState(null);
  
//   useEffect(() => {
//     fetchHotels();
//     fetchUsers();
//   }, []);

//   const fetchHotels = async () => {
//     try {
//       const response = await fetch("http://localhost:5000/api/hotels/hotels");
//       const result = await response.json();
//       setHotels(result);
//     } catch (error) {
//       console.error("Error fetching hotels:", error);
//     }
//   };

//   const fetchUsers = async () => {
//     try {
//       const response = await fetch("http://localhost:5000/api/users/users");
//       const result = await response.json();
//       setUsers(result);
//     } catch (error) {
//       console.error("Error fetching users:", error);
//     }
//   };

//   const handleAddOrUpdateHotel = async () => {
//     try {
//       const token = localStorage.getItem("adminToken");
//       const url = editHotel
//         ? `http://localhost:5000/api/hotels/hotels/${editHotel._id}`
//         : "http://localhost:5000/api/hotels/add-hotel";
      
//       const method = editHotel ? "PUT" : "POST";
      
//       const response = await fetch(url, {
//         method: method,
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(newHotel),
//       });
      
//       if (!response.ok) {
//         throw new Error(`Failed to ${editHotel ? "update" : "add"} hotel`);
//       }
      
//       setNewHotel({
//         name: "",
//         destination: "",
//         address: "",
//         rates: "",
//         no_of_rooms: "",
//         image_url: "",
//       });
      
//       setEditHotel(null);
//       fetchHotels();
//     } catch (error) {
//       console.error("Error adding/updating hotel:", error);
//     }
//   };

//   const handleDeleteHotel = async (hotelId) => {
//     try {
//       const token = localStorage.getItem("adminToken");
//       await fetch(`http://localhost:5000/api/hotels/delete-hotel/${hotelId}`, {
//         method: "DELETE",
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setHotels(hotels.filter((hotel) => hotel._id !== hotelId));
//     } catch (error) {
//       console.error("Error deleting hotel:", error);
//     }
//   };

//   const handleDeleteUser = async (userId) => {
//     try {
//       await fetch(`http://localhost:5000/api/users/${userId}`, {
//         method: "DELETE",
//       });
//       setUsers(users.filter((user) => user._id !== userId));
//     } catch (error) {
//       console.error("Error deleting user:", error);
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h2 className="text-center">Admin Dashboard</h2>
//       <ul className="nav nav-tabs mt-3">
//         <li className="nav-item">
//           <button className={`nav-link ${activeTab === "hotels" ? "active" : ""}`} onClick={() => setActiveTab("hotels")}>
//             Manage Hotels
//           </button>
//         </li>
//         <li className="nav-item">
//           <button className={`nav-link ${activeTab === "users" ? "active" : ""}`} onClick={() => setActiveTab("users")}>
//             Manage Users
//           </button>
//         </li>
//       </ul>

//       <div className="mt-3">
//         {activeTab === "hotels" ? (
//           <div>
//             {hotels.map((hotel) => (
//               <div key={hotel._id} className="hotel-item p-3 border rounded mb-2">
//                 <h5>{hotel.name}</h5>
//                 <p>Destination: {hotel.destination}</p>
//                 <button className="btn btn-danger" onClick={() => handleDeleteHotel(hotel._id)}>
//                   Delete
//                 </button>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div>
//             <h3 className="mb-4">Manage Users</h3>
//             <ul className="list-group">
//               {users.length > 0 ? (
//                 users.map((user) => (
//                   <li key={user._id} className="list-group-item d-flex justify-content-between align-items-center">
//                     <div>
//                       <strong>{user.name}</strong> ({user.email})
//                     </div>
//                     <button className="btn btn-danger btn-sm" onClick={() => handleDeleteUser(user._id)}>
//                       Delete
//                     </button>
//                   </li>
//                 ))
//               ) : (
//                 <li className="list-group-item text-center">No users found</li>
//               )}
//             </ul>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default AdminDashboard;
