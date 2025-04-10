import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaPhone, FaEnvelope, FaInfoCircle, FaTwitter, FaInstagram, FaFacebook, FaGoogle } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.css";
import { useAuth } from "../AuthContext";

const indianCities = ["Bengaluru", "Delhi", "Mumbai", "Chennai", "Kolkata"];
const internationalCities = ["Dubai", "London", "New York", "Singapore"];
const dummyFlights = [
  { flightNumber: "NA-101", airline: "Namma Airlines", departure: "Bengaluru", arrival: "Mumbai", price: 5000, class: "Economy", availableSeats: 30 },
  { flightNumber: "NA-202", airline: "Namma Airlines", departure: "Bengaluru", arrival: "Mumbai", price: 4500, class: "Business", availableSeats: 20 },
  { flightNumber: "NA-303", airline: "Namma Airlines", departure: "Delhi", arrival: "Mumbai", price: 4000, class: "Economy", availableSeats: 25 },
];

function Home({ loggedInUser }) {
  const { isLoggedIn } = useAuth();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [flightClass, setFlightClass] = useState("Economy");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn && loggedInUser && loggedInUser.name) {
      setMessage(`Welcome to Namma Airlines, ${loggedInUser.name}! Embark on Your Journey!`);
    } else {
      setMessage("Discover Your Journey with Namma Airlines!");
    }
  }, [isLoggedIn, loggedInUser]);

  const handleSearch = () => {
    if (!from || !to) {
      setMessage("Please select departure and destination.");
      return;
    }
    if (from === to) {
      setMessage("Departure and destination cannot be the same.");
      return;
    }

    const results = dummyFlights.filter(flight =>
      flight.departure.toLowerCase() === from.toLowerCase() &&
      flight.arrival.toLowerCase() === to.toLowerCase() &&
      flight.class.toLowerCase() === flightClass.toLowerCase()
    );

    navigate("/results", { state: { flights: results, selectedDate: date } });
  };

  const images = [
    "/images/image1.jpg",
    "/images/image2.jpg",
    "/images/image3.jpg",
    "/images/image4.jpg",
    "/images/image5.jpg",
  ];
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="home-wrapper">
      <header className="home-header">
        <div className="slideshow-container">
          {images.map((img, index) => (
            <div
              key={index}
              className={`slide ${index === currentImage ? "active" : ""}`}
              style={{ backgroundImage: `url(${img})` }}
            />
          ))}
        </div>
        <div className="search-overlay">
          {message && <h2 className="welcome-text animate__animated animate__fadeIn">{message}</h2>}
          <div className="search-container glass-effect animate__animated animate__fadeInUp">
            <h3 className="text-coffee-dark">Book Your Journey</h3>
            <div className="search-form row g-2 align-items-center">
              <div className="col-auto">
                <select value={from} onChange={(e) => setFrom(e.target.value)} className="form-select">
                  <option value="">From</option>
                  {indianCities.concat(internationalCities).map((city, index) => (
                    <option key={index} value={city}>{city}</option>
                  ))}
                </select>
              </div>
              <div className="col-auto">
                <select value={to} onChange={(e) => setTo(e.target.value)} className="form-select">
                  <option value="">To</option>
                  {indianCities.concat(internationalCities).map((city, index) => (
                    <option key={index} value={city}>{city}</option>
                  ))}
                </select>
              </div>
              <div className="col-auto">
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="form-control" />
              </div>
              <div className="col-auto">
                <select value={flightClass} onChange={(e) => setFlightClass(e.target.value)} className="form-select">
                  <option value="Economy">Economy</option>
                  <option value="Business">Business</option>
                  <option value="First Class">First Class</option>
                </select>
              </div>
              <div className="col-auto">
                <button className="btn btn-coffee" onClick={handleSearch}>Search Flights</button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <footer className="home-footer bg-coffee-dark text-white">
        <div className="footer-content container py-4">
          <div className="row">
            <div className="col-md-4">
              <h4><FaInfoCircle /> About Us</h4>
              <p>Namma Airlines offers seamless travel with a modern touch and top-notch service.</p>
            </div>
            <div className="col-md-4">
              <h4><FaPhone /> Contact Us</h4>
              <p><FaEnvelope /> Email: support@nammaairlines.com</p>
              <p><FaPhone /> Phone: +91-111-222-3333</p>
              <p>Address: 123 Manyata Tech Park, Bengaluru</p>
            </div>
            <div className="col-md-4">
              <h4>Follow Us</h4>
              <div className="social-links">
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
                <a href="https://google.com" target="_blank" rel="noopener noreferrer"><FaGoogle /></a>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom text-center py-2">
          <p>© 2025 Namma Airlines. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;


