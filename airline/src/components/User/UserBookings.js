import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./UserBookings.css";

function UserBookings() {
  const [bookings, setBookings] = useState(JSON.parse(localStorage.getItem("userBookings")) || []);

  const handleCancel = (id) => {
    const updatedBookings = bookings.filter((b) => b.id !== id);
    setBookings(updatedBookings);
    localStorage.setItem("userBookings", JSON.stringify(updatedBookings));
  };

  return (
    <div className="user-bookings container mt-5">
      <h2 className="mb-4">My Bookings</h2>
      {bookings.length === 0 ? (
        <div className="no-bookings">No bookings found. Start your journey now!</div>
      ) : (
        <div className="bookings-grid">
          {bookings.map((booking) => (
            <div key={booking.id} className="booking-card card shadow-sm">
              <div className="card-body">
                <h5>{booking.flightNumber} - {booking.airline}</h5>
                <p>
                  Route: {booking.departure} → {booking.arrival}<br />
                  Date: {booking.date}<br />
                  Time: {booking.departureTime} - {booking.arrivalTime} ({booking.duration})<br />
                  Class: {booking.class}<br />
                  Passengers: Adults: {booking.passengers.adults}, Kids: {booking.passengers.kids}, Disabled: {booking.passengers.disabled}<br />
                  Passenger Names: {booking.passengerNames.join(", ")}<br />
                  Seats: {booking.seats}<br />
                  Total Fare: ₹{booking.price}
                </p>
                <button className="btn btn-danger btn-sm" onClick={() => handleCancel(booking.id)}>
                  Cancel Booking
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserBookings;