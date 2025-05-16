import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Destinations from "../../pages/destinations"; // Import the Destinations component
import Cookies from "js-cookie"; // Import js-cookie for authentication

const Header = ({ setIsSliderVisible }) => {
  const [isActive, setIsActive] = useState(false); // State to toggle visibility
  const [isAuthenticated, setIsAuthenticated] = useState(false); // State for authentication
  const location = useLocation(); // Get current route
  const navigate = useNavigate(); // Navigation hook

  useEffect(() => {
    const token = Cookies.get("authToken");
    setIsAuthenticated(!!token);
  }, []);

  const toggleDestinations = () => {
    setIsActive(!isActive); // Toggle visibility state
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/users/logout", {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Error during logout");
      }

      const data = await response.json();
      alert(data.message);
      Cookies.remove("authToken");
      setIsAuthenticated(false);
    } catch (err) {
      alert("An error occurred. Please try again later.");
      console.error("Error during logout:", err);
    }
  };

  return (
    <header className="bg-light shadow-sm">
      <nav className="navbar navbar-expand-lg navbar-light container">
        {/* Logo */}
        <Link className="navbar-brand fw-bold" to="/">
          <img
            src="/image.png"
            alt="Hotel Booking Logo"
            style={{ width: "70px", marginRight: "10px" }}
          />
          Nature Inspired Hotels
        </Link>

        {/* Toggler for mobile view */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible Menu */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto w-100">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>

            {/* Hide Search Destinations only on /admin/login and /register */}
            {location.pathname !== "/admin/login" && location.pathname !== "/register" && (
              <li className="nav-item" style={{ marginLeft: "170px" }}>
                <button
                  className="btn btn-warning"
                  style={{ borderRadius: "50px" }}
                  onClick={toggleDestinations}
                >
                  <h2>Search Destinations</h2>
                </button>
              </li>
            )}
          </ul>

          {/* Show Logout button only if user is authenticated */}
          {isAuthenticated && (
            <button
              className="btn btn-outline-primary ms-auto"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
        </div>
      </nav>

      {/* Pass the visibility state to Destinations component */}
      <Destinations isVisible={isActive} setIsSliderVisible={setIsSliderVisible} />
    </header>
  );
};

export default Header;
