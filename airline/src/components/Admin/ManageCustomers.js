import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ManageCustomers.css";

function ManageCustomers() {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Fetch registered users from localStorage
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setCustomers(storedUsers);

    // Fetch all bookings from localStorage (assuming stored as "userBookings")
    const storedBookings = JSON.parse(localStorage.getItem("userBookings")) || [];
    setBookings(storedBookings);
  }, []);

  const handleCustomerClick = (customer) => {
    setSelectedCustomer(customer);
  };

  const closePopup = () => {
    setSelectedCustomer(null);
  };

  const getCustomerBookings = (email) => {
    return bookings.filter((booking) => booking.userEmail === email);
  };

  const getUpcomingBookings = (customerBookings) => {
    const today = new Date();
    return customerBookings.filter((b) => new Date(b.date) >= today);
  };

  const getPastBookings = (customerBookings) => {
    const today = new Date();
    return customerBookings.filter((b) => new Date(b.date) < today);
  };

  return (
    <div className="manage-customers container mt-5">
      <h2 className="mb-4">Manage Customers</h2>
      <div className="customers-table card shadow-sm p-4 mb-4">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Date of Birth</th>
              <th>Gender</th>
              <th>Total Bookings</th>
            </tr>
          </thead>
          <tbody>
            {customers.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center">No customers registered yet.</td>
              </tr>
            ) : (
              customers.map((customer) => {
                const customerBookings = getCustomerBookings(customer.email);
                return (
                  <tr key={customer.email}>
                    <td>
                      <span
                        className="customer-name"
                        onClick={() => handleCustomerClick(customer)}
                      >
                        {customer.name}
                      </span>
                    </td>
                    <td>{customer.email}</td>
                    <td>{customer.phoneNumber}</td>
                    <td>{customer.dateOfBirth}</td>
                    <td>{customer.gender}</td>
                    <td>{customerBookings.length}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {selectedCustomer && (
        <div className="customer-popup">
          <div className="popup-content card shadow-sm">
            <div className="card-body">
              <h3>{selectedCustomer.name}'s Details</h3>
              <div className="personal-info">
                <p><strong>Email:</strong> {selectedCustomer.email}</p>
                <p><strong>Phone:</strong> {selectedCustomer.phoneNumber}</p>
                <p><strong>Date of Birth:</strong> {selectedCustomer.dateOfBirth}</p>
                <p><strong>Gender:</strong> {selectedCustomer.gender}</p>
              </div>

              <h4>Booking History</h4>
              <div className="bookings-section">
                <h5>Upcoming Bookings</h5>
                {getUpcomingBookings(getCustomerBookings(selectedCustomer.email)).length === 0 ? (
                  <p>No upcoming bookings.</p>
                ) : (
                  getUpcomingBookings(getCustomerBookings(selectedCustomer.email)).map((booking) => (
                    <div key={booking.id} className="booking-card">
                      <p>
                        <strong>{booking.flightNumber} - {booking.airline}</strong><br />
                        {booking.departure} → {booking.arrival}<br />
                        {booking.date} | {booking.departureTime} - {booking.arrivalTime}
                      </p>
                    </div>
                  ))
                )}
              </div>

              <div className="bookings-section">
                <h5>Past Bookings</h5>
                {getPastBookings(getCustomerBookings(selectedCustomer.email)).length === 0 ? (
                  <p>No past bookings.</p>
                ) : (
                  getPastBookings(getCustomerBookings(selectedCustomer.email)).map((booking) => (
                    <div key={booking.id} className="booking-card">
                      <p>
                        <strong>{booking.flightNumber} - {booking.airline}</strong><br />
                        {booking.departure} → {booking.arrival}<br />
                        {booking.date} | {booking.departureTime} - {booking.arrivalTime}
                      </p>
                    </div>
                  ))
                )}
              </div>

              <button className="btn btn-secondary mt-3" onClick={closePopup}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageCustomers;