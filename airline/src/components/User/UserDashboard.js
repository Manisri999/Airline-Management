import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./UserDashboard.css";
import { useAuth } from "../../AuthContext"; // Adjusted path

function UserDashboard() {
  const navigate = useNavigate();
  const { loggedInUser } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState("upcoming");

  useEffect(() => {
    setBookings(JSON.parse(localStorage.getItem("userBookings")) || []);
  }, []);

  const getUpcomingBookings = () => {
    const today = new Date();
    return bookings.filter((b) => new Date(b.date) >= today);
  };

  const getPastBookings = () => {
    const today = new Date();
    return bookings.filter((b) => new Date(b.date) < today);
  };

  if (!loggedInUser) return <div className="loading">Loading...</div>;

  return (
    <div className="user-dashboard container mt-5">
      <h2>Welcome, {loggedInUser.name}</h2>
      <div className="tabs mt-4">
        <button
          className={`tab-btn ${activeTab === "upcoming" ? "active" : ""}`}
          onClick={() => setActiveTab("upcoming")}
        >
          Upcoming Trips
        </button>
        <button
          className={`tab-btn ${activeTab === "past" ? "active" : ""}`}
          onClick={() => setActiveTab("past")}
        >
          Past Trips
        </button>
        <button className="btn btn-primary ms-3" onClick={() => navigate("/")}>
          Book a Flight
        </button>
      </div>

      <div className="tab-content mt-4">
        {activeTab === "upcoming" && (
          <div className="trips-grid">
            {getUpcomingBookings().length === 0 ? (
              <div className="no-trips">No upcoming trips. Plan one now!</div>
            ) : (
              getUpcomingBookings().map((b) => (
                <div key={b.id} className="trip-card card shadow-sm">
                  <div className="card-body">
                    <h5>{b.flightNumber} - {b.airline}</h5>
                    <p>
                      {b.departure} → {b.arrival}<br />
                      {b.date} | {b.departureTime} - {b.arrivalTime}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
        {activeTab === "past" && (
          <div className="trips-grid">
            {getPastBookings().length === 0 ? (
              <div className="no-trips">No past trips.</div>
            ) : (
              getPastBookings().map((b) => (
                <div key={b.id} className="trip-card card shadow-sm">
                  <div className="card-body">
                    <h5>{b.flightNumber} - {b.airline}</h5>
                    <p>
                      {b.departure} → {b.arrival}<br />
                      {b.date} | {b.departureTime} - {b.arrivalTime}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserDashboard;  



