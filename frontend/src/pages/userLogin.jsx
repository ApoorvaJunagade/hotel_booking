
import React, { useState } from 'react';
import './register.css'; // Add your custom CSS for styling
import { useNavigate } from 'react-router-dom';
import Booking from './booking';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    // Basic validation
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/users/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
          credentials: 'include', // Important for including cookies
      });
  
      if (!response.ok) {
          throw new Error('Invalid email or password');
      }
  
      const data = await response.json();
  
      // Print session ID in console
      console.log("Session ID:", data.sessionId); 
  
      // Redirect on successful login
      if (data.sessionId)  {
          navigate('/booking');
      } else {
          setError('Invalid email or password');
      }
  } catch (err) {
      setError('An error occurred. Please try again later.');
      console.error('Error during login:', err);
  }
  }  
  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit}>
        <h1 className="mb-4 text-center">Login</h1>

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email address"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-control"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />
        </div>

        <div className="btn">
          <button type="submit" className="btn btn-primary w-50">Login</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
