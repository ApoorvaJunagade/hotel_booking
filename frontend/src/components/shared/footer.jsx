import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4">
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <h5 className="fw-bold">About Us</h5>
            <p>We are committed to providing serene, nature-inspired hotels for a perfect getaway. Discover luxury and tranquility at our exclusive locations worldwide.</p>
          </div>
          <div className="col-md-3">
            <h5 className="fw-bold">Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-light">Home</a></li>
              <li><a href="/destinations" className="text-light">Destinations</a></li>
              <li><a href="/offers" className="text-light">Special Offers</a></li>
              <li><a href="/contact" className="text-light">Contact Us</a></li>
            </ul>
          </div>
          <div className="col-md-3">
            <h5 className="fw-bold">Contact Us</h5>
            <ul className="list-unstyled">
              <li><i className="bi bi-telephone"></i> +123 456 789</li>
              <li><i className="bi bi-envelope"></i> support@naturehotels.com</li>
              <li><i className="bi bi-geo-alt"></i> 123 Nature St, Tranquility City</li>
            </ul>
          </div>
          <div className="col-md-3">
            <h5 className="fw-bold">Follow Us</h5>
            <ul className="list-unstyled d-flex">
              <li><a href="https://facebook.com" className="text-light me-3"><i className="bi bi-facebook"></i></a></li>
              <li><a href="https://twitter.com" className="text-light me-3"><i className="bi bi-twitter"></i></a></li>
              <li><a href="https://instagram.com" className="text-light me-3"><i className="bi bi-instagram"></i></a></li>
              <li><a href="https://linkedin.com" className="text-light"><i className="bi bi-linkedin"></i></a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="text-center mt-3">
        <small>© {new Date().getFullYear()} Nature Inspired Hotels. All rights reserved.</small>
      </div>
    </footer>
  );
};

export default Footer;
