import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/shared/Header.jsx";
import Footer from "./components/shared/footer.jsx";
import Home from "./pages/home.jsx";
import Destinations from "./pages/destinations.jsx";
import Hotels from "./pages/hotels.jsx";
import AdminLogin from "./pages/adminLogin.jsx";
import Register from "./pages/register.jsx";
import AdminDashboard from "./pages/adminHome.jsx";
import ProtectedRoute from "./pages/protected.jsx";
import Login from "./pages/userLogin.jsx"; // Ensure Login is imported
import { useState } from "react";
import Booking from "./pages/booking.jsx";
import ConfirmationPage from "./pages/confirmation.jsx";

function App() {
  const [isSliderVisible, setIsSliderVisible] = useState(true); // ✅ Add state for slider visibility

  return (
    <Router>
      <Header setIsSliderVisible={setIsSliderVisible} /> {/* ✅ Pass state setter */}
      <Routes>
        {/* User Panel */}
        <Route path="/" element={<Home isSliderVisible={isSliderVisible} />} />
        <Route path="/destinations" element={<Destinations isVisible={true} setIsSliderVisible={setIsSliderVisible} />} />
        <Route path="/hotels" element={<Hotels />} />

        <Route path="/Register" element={<Register />} />
        <Route path="/userLogin" element={<Login />} /> {/* userLogin route */}
<Route path="/booking" element={<Booking/>}/>
<Route path="/confirmation" element={<ConfirmationPage/>}/>
        {/* Admin Panel */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
