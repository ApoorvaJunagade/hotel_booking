import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import slide1 from "../assets/slede1Image.avif";
import slide2 from "../assets/slide2Image.avif";
import slide3 from "../assets/slide3Image.avif";

const Home = ({ isSliderVisible }) => {
  return (
    <div className="bg-light shadow-sm">
      {/* Show the carousel only if isSliderVisible is true */}
      {isSliderVisible && (
        <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel" data-bs-interval="3000">
          {/* Indicators */}
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
          </div>

          {/* Carousel Items */}
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={slide1} className="d-block w-100" alt="Slide 1" />
              <div className="carousel-caption d-flex justify-content-center align-items-center">
                <div className="text-center">
                  <h1>Tranquil Retreats Amidst Nature</h1>
                  <p>Discover serenity and luxury in our nature-inspired hotels. Escape to stunning landscapes where tranquility meets luxury.</p>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <img src={slide2} className="d-block w-100" alt="Slide 2" />
              <div className="carousel-caption d-flex justify-content-center align-items-center">
                <div className="text-center">
                  <h1>Explore Breathtaking Destinations</h1>
                  <p>Find your perfect escape in unseen corners of the world. From lush forests to pristine beaches, venture into nature’s heart.</p>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <img src={slide3} className="d-block w-100" alt="Slide 3" />
              <div className="carousel-caption d-flex justify-content-center align-items-center">
                <div className="text-center">
                  <h1>Special Offers Just for You</h1>
                  <p>Take advantage of our special offers and discounts to enhance your stay. Enjoy exclusive packages and personalized services.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
