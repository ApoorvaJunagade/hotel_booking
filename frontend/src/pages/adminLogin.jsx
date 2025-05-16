import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://localhost:5000/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, role: "admin" }),
      });
  
      const text = await response.text(); // Get raw response
      console.log("Raw response:", text);
  
      if (!response.ok) {
        throw new Error("Login failed: " + text);
      }
  
      const data = JSON.parse(text); // Convert to JSON
      localStorage.setItem("adminToken", data.token);
      localStorage.setItem("role", "admin"); // Store role separately

      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.message);
      console.error("Login error:", err);
    }
  };
  
  return (
    <div className="container mt-5">
      <form onSubmit={handleLogin}>
        <h1 className="mb-4 text-center">Admin Login</h1>
        {error && <p style={{ color: "red" }}>{error}</p>}

        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="form-control"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="form-control"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-primary w-50">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminLogin;
