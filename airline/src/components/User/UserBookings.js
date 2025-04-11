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
        <div className="no-bookings text-center p-4">
          No bookings found. Start your journey now!
        </div>
      ) : (
        <div className="bookings-grid row">
          {bookings.map((booking) => (
            <div key={booking.id} className="col-md-4 mb-4">
              <div className="booking-card card shadow-sm h-100">
                <div className="card-body">
                  <h5 className="card-title">
                    {booking.flightNumber} - {booking.airline}
                  </h5>
                  <p className="card-text">
                    <strong>Route:</strong> {booking.departure} → {booking.arrival}<br />
                    <strong>Date:</strong> {booking.date}<br />
                    <strong>Time:</strong> {booking.departureTime} - {booking.arrivalTime} (
                    {booking.duration})<br />
                    <strong>Class:</strong> {booking.class}<br />
                    <strong>Passengers:</strong> Adults: {booking.passengers.adults}, Kids:{" "}
                    {booking.passengers.kids}, Disabled: {booking.passengers.disabled}<br />
                    <strong>Passenger Names:</strong>{" "}
                    {booking.passengerNames && Array.isArray(booking.passengerNames)
                      ? booking.passengerNames.join(", ")
                      : "N/A"}<br />
                    <strong>Seats:</strong> {booking.seats || "N/A"}<br />
                    <strong>Total Fare:</strong> ₹{booking.price}
                  </p>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleCancel(booking.id)}
                  >
                    Cancel Booking
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserBookings;