// import React, { useState } from "react";
// import { useLocation } from "react-router-dom";
// import { jsPDF } from "jspdf";
// import { FaPlane, FaChair, FaCheckCircle } from "react-icons/fa";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./FlightResults.css";
// import { useAuth } from "../AuthContext"; 
// import { usePayment } from "../PaymentContext"; 

// const airports = {
//   "Bengaluru": ["BLR - Kempegowda International"],
//   "Delhi": ["DEL - Indira Gandhi International"],
//   "Mumbai": ["BOM - Chhatrapati Shivaji International"],
//   "Chennai": ["MAA - Chennai International"],
//   "Kolkata": ["CCU - Netaji Subhas Chandra"],
//   "Dubai": ["DXB - Dubai International"],
//   "London": ["LHR - Heathrow"],
//   "New York": ["JFK - John F. Kennedy"],
//   "Singapore": ["SIN - Changi"],
// };

// function FlightResults() {
//   const { state } = useLocation();
//   const { isLoggedIn } = useAuth();
//   const { walletBalance, setWalletBalance } = usePayment();
//   const { flights, selectedDate } = state || { flights: [], selectedDate: "" };
//   const [passengers, setPassengers] = useState({ adults: "", kids: "", disabled: "" });
//   const [passengerNames, setPassengerNames] = useState([]);
//   const [selectedFlight, setSelectedFlight] = useState(null);
//   const [selectedSeats, setSelectedSeats] = useState([]);
//   const [bookingStatus, setBookingStatus] = useState("");
//   const [paymentMethod, setPaymentMethod] = useState("card");
//   const [cardDetails, setCardDetails] = useState({ number: "", expiry: "", cvv: "" });

//   const calculateDuration = () => Math.floor(Math.random() * 5) + 2;

//   const handlePassengerChange = (e, type) => {
//     const value = e.target.value.replace(/[^0-9]/g, "");
//     setPassengers((prev) => {
//       const updatedPassengers = { ...prev, [type]: value };
//       const total =
//         (parseInt(updatedPassengers.adults) || 0) +
//         (parseInt(updatedPassengers.kids) || 0) +
//         (parseInt(updatedPassengers.disabled) || 0);
//       setPassengerNames(Array(total >= 0 ? total : 0).fill(""));
//       return updatedPassengers;
//     });
//   };

//   const handleNameChange = (index, value) => {
//     const updatedNames = [...passengerNames];
//     updatedNames[index] = value;
//     setPassengerNames(updatedNames);
//   };

//   const handleSeatSelect = (seat) => {
//     if (selectedSeats.includes(seat)) {
//       setSelectedSeats(selectedSeats.filter((s) => s !== seat));
//     } else if (selectedSeats.length < (parseInt(passengers.adults) + parseInt(passengers.kids) + parseInt(passengers.disabled))) {
//       setSelectedSeats([...selectedSeats, seat]);
//     }
//   };

//   const handleBooking = (flight) => {
//     if (!isLoggedIn) {
//       setBookingStatus("You need to log in to book a flight. <a href='/login-register'>Click here to log in</a>");
//       return;
//     }

//     const adults = parseInt(passengers.adults) || 0;
//     const kids = parseInt(passengers.kids) || 0;
//     const disabled = parseInt(passengers.disabled) || 0;
//     const totalPassengers = adults + kids + disabled;

//     if (totalPassengers === 0) {
//       setBookingStatus("Please enter at least one passenger.");
//       return;
//     }
//     if (totalPassengers > flight.availableSeats) {
//       setBookingStatus("Not enough seats available.");
//       return;
//     }
//     if (selectedSeats.length !== totalPassengers) {
//       setBookingStatus(`Please select exactly ${totalPassengers} seats.`);
//       return;
//     }
//     if (passengerNames.some((name) => !name.trim())) {
//       setBookingStatus("Please enter all passenger names.");
//       return;
//     }

//     setSelectedFlight({
//       id: Date.now(),
//       flightNumber: flight.flightNumber,
//       airline: "Namma Airlines",
//       departure: flight.departure,
//       arrival: flight.arrival,
//       date: selectedDate,
//       class: flight.class,
//       price: flight.price * totalPassengers,
//       passengers: { adults, kids, disabled },
//       passengerNames: passengerNames,
//       duration: `${calculateDuration()}h`,
//       departureTime: "10:00 AM",
//       arrivalTime: `${(10 + calculateDuration()) % 24}:00 ${calculateDuration() >= 14 ? "PM" : "AM"}`,
//       seats: selectedSeats.join(", "),
//     });
//     setBookingStatus("Proceed to payment.");
//   };

//   const handlePayment = () => {
//     if (paymentMethod === "wallet") {
//       if (walletBalance < selectedFlight.price) {
//         setBookingStatus("Insufficient wallet balance. Please add funds in Wallet.");
//         return;
//       }
//       setWalletBalance(walletBalance - selectedFlight.price);
//       completeBooking();
//     } else if (paymentMethod === "card") {
//       if (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvv) {
//         setBookingStatus("Please fill all card details.");
//         return;
//       }
//       completeBooking();
//     }
//   };

//   const completeBooking = () => {
//     const updatedBookings = JSON.parse(localStorage.getItem("userBookings") || "[]").concat(selectedFlight);
//     localStorage.setItem("userBookings", JSON.stringify(updatedBookings));
//     setBookingStatus("Payment successful! Download your ticket.");
//   };

//   const generatePDF = () => {
//     const doc = new jsPDF();
//     doc.setFontSize(16);
//     doc.text("Namma Airlines Ticket", 20, 20);
//     doc.setFontSize(12);
//     doc.text(`Flight: ${selectedFlight.flightNumber} - ${selectedFlight.airline}`, 20, 30);
//     doc.text(`Route: ${selectedFlight.departure} → ${selectedFlight.arrival}`, 20, 40);
//     doc.text(`Date: ${selectedFlight.date}`, 20, 50);
//     doc.text(`Departure: ${selectedFlight.departureTime}`, 20, 60);
//     doc.text(`Arrival: ${selectedFlight.arrivalTime} (Duration: ${selectedFlight.duration})`, 20, 70);
//     doc.text(`Class: ${selectedFlight.class}`, 20, 80);
//     doc.text(`Passengers: Adults: ${selectedFlight.passengers.adults}, Kids: ${selectedFlight.passengers.kids}, Disabled: ${selectedFlight.passengers.disabled}`, 20, 90);
//     doc.text(`Passenger Names: ${selectedFlight.passengerNames.join(", ")}`, 20, 100);
//     doc.text(`Seats: ${selectedFlight.seats}`, 20, 110);
//     doc.text(`Total Fare: ₹${selectedFlight.price}`, 20, 120);
//     doc.save(`ticket-${selectedFlight.id}.pdf`);
//   };

//   // Realistic seat map: 10 rows, 6 seats per row (3 on each side of aisle: A-C, D-F)
//   const totalRows = 10;
//   const seatsPerSide = 3; // 3 seats per side (A, B, C) and (D, E, F)
//   const bookedSeats = ["1A", "2C", "3B", "5D", "7F", "9A"]; // Example pre-booked seats
//   const seatMap = Array.from({ length: totalRows }, (_, rowIdx) => {
//     const row = [];
//     // Left side (A, B, C)
//     for (let i = 0; i < seatsPerSide; i++) {
//       row.push(`${rowIdx + 1}${String.fromCharCode(65 + i)}`); // A, B, C
//     }
//     // Right side (D, E, F)
//     for (let i = 0; i < seatsPerSide; i++) {
//       row.push(`${rowIdx + 1}${String.fromCharCode(68 + i)}`); // D, E, F
//     }
//     return row;
//   });

//   return (
//     <div className="flight-results container mt-5 animate__animated animate__fadeIn">
//       <h2 className="mb-4 text-coffee-dark"><FaPlane /> Available Flights</h2>
//       {flights.length === 0 ? (
//         <div className="no-results text-danger">No flights found. Try a different search.</div>
//       ) : (
//         <div className="results-grid row row-cols-1 row-cols-md-2 g-4">
//           {flights.map((flight, idx) => (
//             <div key={idx} className="flight-card card shadow-sm animate__animated animate__fadeInUp">
//               <div className="card-body">
//                 <h5 className="text-coffee-dark">{flight.flightNumber} - {flight.airline}</h5>
//                 <p>
//                   <FaPlane /> {airports[flight.departure][0]} → {airports[flight.arrival][0]}<br />
//                   Date: {selectedDate}<br />
//                   Duration: {calculateDuration()}h<br />
//                   Class: {flight.class}<br />
//                   Fare: ₹{flight.price} per person<br />
//                   Seats Available: {flight.availableSeats}
//                 </p>
//                 <div className="passenger-inputs row g-2">
//                   <div className="col-auto">
//                     <label>Adults:</label>
//                     <input
//                       type="text"
//                       value={passengers.adults}
//                       onChange={(e) => handlePassengerChange(e, "adults")}
//                       className="form-control"
//                       placeholder="Enter number"
//                     />
//                   </div>
//                   <div className="col-auto">
//                     <label>Kids:</label>
//                     <input
//                       type="text"
//                       value={passengers.kids}
//                       onChange={(e) => handlePassengerChange(e, "kids")}
//                       className="form-control"
//                       placeholder="Enter number"
//                     />
//                   </div>
//                   <div className="col-auto">
//                     <label>Disabled:</label>
//                     <input
//                       type="text"
//                       value={passengers.disabled}
//                       onChange={(e) => handlePassengerChange(e, "disabled")}
//                       className="form-control"
//                       placeholder="Enter number"
//                     />
//                   </div>
//                 </div>
//                 {(parseInt(passengers.adults) || 0) + (parseInt(passengers.kids) || 0) + (parseInt(passengers.disabled) || 0) > 0 && (
//                   <div className="passenger-names mt-3">
//                     <label>Passenger Names:</label>
//                     {Array.from({ length: (parseInt(passengers.adults) || 0) + (parseInt(passengers.kids) || 0) + (parseInt(passengers.disabled) || 0) }).map((_, i) => (
//                       <input
//                         key={i}
//                         type="text"
//                         value={passengerNames[i] || ""}
//                         onChange={(e) => handleNameChange(i, e.target.value)}
//                         className="form-control mb-2"
//                         placeholder={`Passenger ${i + 1} Name`}
//                       />
//                     ))}
//                   </div>
//                 )}
//                 <div className="seat-selection mt-3">
//                   <label><FaChair /> Select Seats:</label>
//                   <div className="seat-map">
//                     {seatMap.map((row, rowIdx) => (
//                       <div key={rowIdx} className="seat-row">
//                         {row.map((seat) => {
//                           const isBooked = bookedSeats.includes(seat);
//                           const isSelected = selectedSeats.includes(seat);
//                           const isDisabled = isBooked || (selectedSeats.length >= (parseInt(passengers.adults) + parseInt(passengers.kids) + parseInt(passengers.disabled)) && !isSelected);
//                           return (
//                             <button
//                               key={seat}
//                               className={`seat-btn ${isSelected ? "selected" : ""} ${isBooked ? "booked" : ""}`}
//                               onClick={() => !isBooked && handleSeatSelect(seat)}
//                               disabled={isDisabled}
//                             >
//                               {seat}
//                             </button>
//                           );
//                         })}
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//                 <button className="btn btn-coffee mt-3" onClick={() => handleBooking(flight)}>
//                   <FaCheckCircle /> Book Now
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//       {bookingStatus && (
//         <div className="booking-status mt-4 text-center" dangerouslySetInnerHTML={{ __html: bookingStatus }} />
//       )}
//       {selectedFlight && (
//         <div className="payment-section mt-5 animate__animated animate__fadeIn">
//           <h3 className="text-coffee-dark">Payment Details</h3>
//           <div className="card p-4 shadow-sm bg-coffee-light">
//             <p className="text-coffee-dark">Total Amount: ₹{selectedFlight.price}</p>
//             <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} className="form-select mb-3">
//               <option value="card">Credit/Debit Card</option>
//               <option value="wallet">Wallet (Balance: ₹{walletBalance})</option>
//             </select>
//             {paymentMethod === "card" && (
//               <div>
//                 <input type="text" placeholder="Card Number" value={cardDetails.number} onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })} className="form-control mb-2" />
//                 <input type="text" placeholder="Expiry Date (MM/YY)" value={cardDetails.expiry} onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })} className="form-control mb-2" />
//                 <input type="text" placeholder="CVV" value={cardDetails.cvv} onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })} className="form-control mb-2" />
//                 <button className="btn btn-coffee" onClick={handlePayment}>Pay Now</button>
//               </div>
//             )}
//             {paymentMethod === "wallet" && (
//               <button className="btn btn-coffee" onClick={handlePayment}>Pay with Wallet</button>
//             )}
//             {bookingStatus === "Payment successful! Download your ticket." && (
//               <div className="success-message mt-3">
//                 <p className="text-success">Payment Successful! <button className="btn btn-success btn-sm" onClick={generatePDF}>Download Ticket</button></p>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default FlightResults;











import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { jsPDF } from "jspdf";
import { FaPlane, FaCheckCircle } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./FlightResults.css";
import { useAuth } from "../AuthContext";
import { usePayment } from "../PaymentContext";

const airports = {
  "Bengaluru": ["BLR - Kempegowda International"],
  "Delhi": ["DEL - Indira Gandhi International"],
  "Mumbai": ["BOM - Chhatrapati Shivaji International"],
  "Chennai": ["MAA - Chennai International"],
  "Kolkata": ["CCU - Netaji Subhas Chandra"],
  "Dubai": ["DXB - Dubai International"],
  "London": ["LHR - Heathrow"],
  "New York": ["JFK - John F. Kennedy"],
  "Singapore": ["SIN - Changi"],
};

function FlightResults() {
  const { state } = useLocation();
  const { isLoggedIn } = useAuth();
  const { walletBalance, setWalletBalance } = usePayment();
  const { flights, selectedDate } = state || { flights: [], selectedDate: "" };
  const [isPassengerPopupOpen, setIsPassengerPopupOpen] = useState(false);
  const [passengers, setPassengers] = useState({ adults: "", kids: "", disabled: "" });
  const [passengerDetails, setPassengerDetails] = useState([]);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");
  const [isConfirming, setIsConfirming] = useState(false);
  const [isPaymentPopupOpen, setIsPaymentPopupOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardDetails, setCardDetails] = useState({ number: "", expiry: "", cvv: "" });
  const [upiDetails, setUpiDetails] = useState({ option: "phonepe", id: "" });

  const calculateDuration = () => Math.floor(Math.random() * 5) + 2;

  const handlePassengerCountChange = (e, type) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setPassengers((prev) => {
      const updatedPassengers = { ...prev, [type]: value };
      const total =
        (parseInt(updatedPassengers.adults) || 0) +
        (parseInt(updatedPassengers.kids) || 0) +
        (parseInt(updatedPassengers.disabled) || 0);
      setPassengerDetails(
        Array(total >= 0 ? total : 0).fill().map(() => ({ name: "", age: "", nationality: "" }))
      );
      return updatedPassengers;
    });
  };

  const handlePassengerDetailChange = (index, field, value) => {
    const updatedDetails = [...passengerDetails];
    updatedDetails[index] = { ...updatedDetails[index], [field]: value };
    setPassengerDetails(updatedDetails);
  };

  const handleBookNow = (flight) => {
    if (!isLoggedIn) {
      setStatusMessage("You need to log in to book a flight. Please log in to continue.");
      return;
    }
    setSelectedFlight(flight);
    setIsPassengerPopupOpen(true);
    setStatusMessage("");
  };

  const handleProceedToPay = () => {
    const adults = parseInt(passengers.adults) || 0;
    const kids = parseInt(passengers.kids) || 0;
    const disabled = parseInt(passengers.disabled) || 0;
    const totalPassengers = adults + kids + disabled;

    if (totalPassengers === 0) {
      setStatusMessage("Please enter at least one passenger.");
      return;
    }
    if (totalPassengers > selectedFlight.availableSeats) {
      setStatusMessage("Not enough seats available for this flight.");
      return;
    }
    if (passengerDetails.some((p) => !p.name.trim() || !p.age || !p.nationality)) {
      setStatusMessage("Please fill all passenger details (name, age, nationality).");
      return;
    }

    setSelectedFlight({
      id: Date.now(),
      flightNumber: selectedFlight.flightNumber,
      airline: "Namma Airlines",
      departure: selectedFlight.departure,
      arrival: selectedFlight.arrival,
      date: selectedDate,
      class: selectedFlight.class,
      price: selectedFlight.price * totalPassengers,
      passengers: { adults, kids, disabled },
      passengerDetails: passengerDetails,
      duration: `${calculateDuration()}h`,
      departureTime: "10:00 AM",
      arrivalTime: `${(10 + calculateDuration()) % 24}:00 ${calculateDuration() >= 14 ? "PM" : "AM"}`,
    });
    setIsPassengerPopupOpen(false);
    setIsConfirming(true);
    setStatusMessage("");
  };

  const handleConfirmPayment = () => {
    setIsConfirming(false);
    setIsPaymentPopupOpen(true);
    setStatusMessage("");
  };

  const handleEditDetails = () => {
    setIsConfirming(false);
    setIsPassengerPopupOpen(true);
  };

  const handlePayment = () => {
    if (paymentMethod === "wallet") {
      if (walletBalance < selectedFlight.price) {
        setStatusMessage("Insufficient wallet balance. Please add funds in Wallet.");
        return;
      }
      setWalletBalance(walletBalance - selectedFlight.price);
      completeBooking();
    } else if (paymentMethod === "card") {
      if (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvv) {
        setStatusMessage("Please fill all card details.");
        return;
      }
      completeBooking();
    } else if (paymentMethod === "upi") {
      if (!upiDetails.option || !upiDetails.id) {
        setStatusMessage("Please select a UPI option and enter your UPI ID.");
        return;
      }
      completeBooking();
    }
  };

  const completeBooking = () => {
    const updatedBookings = JSON.parse(localStorage.getItem("userBookings") || "[]").concat(selectedFlight);
    localStorage.setItem("userBookings", JSON.stringify(updatedBookings));
    setIsPaymentPopupOpen(false);
    setStatusMessage("Payment successful! Download your ticket.");
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Namma Airlines Ticket", 20, 20);
    doc.setFontSize(12);
    doc.text(`Flight: ${selectedFlight.flightNumber} - ${selectedFlight.airline}`, 20, 30);
    doc.text(`Route: ${selectedFlight.departure} → ${selectedFlight.arrival}`, 20, 40);
    doc.text(`Date: ${selectedFlight.date}`, 20, 50);
    doc.text(`Departure: ${selectedFlight.departureTime}`, 20, 60);
    doc.text(`Arrival: ${selectedFlight.arrivalTime} (Duration: ${selectedFlight.duration})`, 20, 70);
    doc.text(`Class: ${selectedFlight.class}`, 20, 80);
    doc.text(`Passengers: Adults: ${selectedFlight.passengers.adults}, Kids: ${selectedFlight.passengers.kids}, Disabled: ${selectedFlight.passengers.disabled}`, 20, 90);
    doc.text(`Passenger Details:`, 20, 100);
    selectedFlight.passengerDetails.forEach((p, i) => {
      doc.text(`${i + 1}. ${p.name}, Age: ${p.age}, Nationality: ${p.nationality}`, 20, 110 + i * 10);
    });
    doc.text(`Total Fare: ₹${selectedFlight.price}`, 20, 120 + selectedFlight.passengerDetails.length * 10);
    doc.save(`ticket-${selectedFlight.id}.pdf`);
  };

  return (
    <div className="flight-results container mt-5 animate__animated animate__fadeIn">
      <h2 className="mb-4 text-coffee-dark"><FaPlane /> Available Flights</h2>
      {flights.length === 0 ? (
        <div className="no-results text-danger">No flights found. Try a different search.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Flight Number</th>
                <th>Airline</th>
                <th>Departure</th>
                <th>Arrival</th>
                <th>Date</th>
                <th>Class</th>
                <th>Price (per person)</th>
                <th>Seats Available</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {flights.map((flight, idx) => (
                <tr key={idx}>
                  <td>{flight.flightNumber}</td>
                  <td>{flight.airline}</td>
                  <td>{airports[flight.departure][0]}</td>
                  <td>{airports[flight.arrival][0]}</td>
                  <td>{selectedDate}</td>
                  <td>{flight.class}</td>
                  <td>₹{flight.price}</td>
                  <td>{flight.availableSeats}</td>
                  <td>
                    <button className="btn btn-coffee" onClick={() => handleBookNow(flight)}>
                      <FaCheckCircle /> Book Now (₹{flight.price})
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {statusMessage && (
        <div className="status-message mt-4 text-center">
          {statusMessage.includes("log in") ? (
            <>
              {statusMessage.split("Please")[0]}{" "}
              <Link to="/login-register" className="login-link">
                Click here to log in
              </Link>
              {statusMessage.includes("Please") ? " Please" + statusMessage.split("Please")[1] : ""}
            </>
          ) : (
            statusMessage
          )}
          {statusMessage === "Payment successful! Download your ticket." && (
            <button className="btn btn-success btn-sm ms-2" onClick={generatePDF}>
              Download Ticket
            </button>
          )}
        </div>
      )}

      {isPassengerPopupOpen && (
        <div className="edit-popup">
          <div className="popup-content card shadow-sm">
            <div className="card-body">
              <h3>Passenger Details</h3>
              <div className="passenger-inputs row g-2">
                <div className="col-auto">
                  <label>Adults:</label>
                  <input
                    type="text"
                    value={passengers.adults}
                    onChange={(e) => handlePassengerCountChange(e, "adults")}
                    className="form-control"
                    placeholder="Enter number"
                  />
                </div>
                <div className="col-auto">
                  <label>Kids:</label>
                  <input
                    type="text"
                    value={passengers.kids}
                    onChange={(e) => handlePassengerCountChange(e, "kids")}
                    className="form-control"
                    placeholder="Enter number"
                  />
                </div>
                <div className="col-auto">
                  <label>Disabled:</label>
                  <input
                    type="text"
                    value={passengers.disabled}
                    onChange={(e) => handlePassengerCountChange(e, "disabled")}
                    className="form-control"
                    placeholder="Enter number"
                  />
                </div>
              </div>
              {(parseInt(passengers.adults) || 0) +
                (parseInt(passengers.kids) || 0) +
                (parseInt(passengers.disabled) || 0) > 0 && (
                <div className="passenger-details mt-3">
                  <label>Passenger Information:</label>
                  {passengerDetails.map((passenger, i) => (
                    <div key={i} className="passenger-row mb-2">
                      <input
                        type="text"
                        value={passenger.name}
                        onChange={(e) => handlePassengerDetailChange(i, "name", e.target.value)}
                        className="form-control mb-1"
                        placeholder={`Passenger ${i + 1} Name`}
                      />
                      <input
                        type="number"
                        value={passenger.age}
                        onChange={(e) => handlePassengerDetailChange(i, "age", e.target.value)}
                        className="form-control mb-1"
                        placeholder="Age"
                        min="0"
                      />
                      <input
                        type="text"
                        value={passenger.nationality}
                        onChange={(e) => handlePassengerDetailChange(i, "nationality", e.target.value)}
                        className="form-control"
                        placeholder="Nationality"
                      />
                    </div>
                  ))}
                </div>
              )}
              <div className="edit-buttons mt-3">
                <button className="btn btn-coffee" onClick={handleProceedToPay}>
                  Proceed to Pay
                </button>
                <button className="btn btn-secondary" onClick={() => setIsPassengerPopupOpen(false)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isConfirming && selectedFlight && (
        <div className="edit-popup">
          <div className="popup-content card shadow-sm">
            <div className="card-body">
              <h3>Confirm Booking Details</h3>
              <p><strong>Flight:</strong> {selectedFlight.flightNumber} - {selectedFlight.airline}</p>
              <p><strong>Route:</strong> {selectedFlight.departure} → {selectedFlight.arrival}</p>
              <p><strong>Date:</strong> {selectedFlight.date}</p>
              <p><strong>Class:</strong> {selectedFlight.class}</p>
              <p><strong>Total Fare:</strong> ₹{selectedFlight.price}</p>
              <p><strong>Passengers:</strong></p>
              <ul>
                {selectedFlight.passengerDetails.map((p, i) => (
                  <li key={i}>{p.name}, Age: {p.age}, Nationality: {p.nationality}</li>
                ))}
              </ul>
              <p>Are the details correct?</p>
              <div className="edit-buttons mt-3">
                <button className="btn btn-coffee me-2" onClick={handleConfirmPayment}>
                  Yes, Proceed
                </button>
                <button className="btn btn-secondary" onClick={handleEditDetails}>
                  No, Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isPaymentPopupOpen && selectedFlight && (
        <div className="edit-popup">
          <div className="popup-content card shadow-sm">
            <div className="card-body">
              <h3>Payment Details</h3>
              <p className="text-coffee-dark">Total Amount: ₹{selectedFlight.price}</p>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="form-select mb-3"
              >
                <option value="card">Credit/Debit Card</option>
                <option value="wallet">Wallet (Balance: ₹{walletBalance})</option>
                <option value="upi">UPI</option>
              </select>
              {paymentMethod === "card" && (
                <div>
                  <input
                    type="text"
                    placeholder="Card Number"
                    value={cardDetails.number}
                    onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                    className="form-control mb-2"
                  />
                  <input
                    type="text"
                    placeholder="Expiry Date (MM/YY)"
                    value={cardDetails.expiry}
                    onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                    className="form-control mb-2"
                  />
                  <input
                    type="text"
                    placeholder="CVV"
                    value={cardDetails.cvv}
                    onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                    className="form-control mb-2"
                  />
                </div>
              )}
              {paymentMethod === "upi" && (
                <div>
                  <select
                    value={upiDetails.option}
                    onChange={(e) => setUpiDetails({ ...upiDetails, option: e.target.value })}
                    className="form-select mb-3"
                  >
                    <option value="phonepe">PhonePe</option>
                    <option value="gpay">Google Pay</option>
                    <option value="paytm">Paytm</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Enter UPI ID (e.g., yourname@upi)"
                    value={upiDetails.id}
                    onChange={(e) => setUpiDetails({ ...upiDetails, id: e.target.value })}
                    className="form-control mb-2"
                  />
                </div>
              )}
              <div className="edit-buttons mt-3">
                <button className="btn btn-coffee" onClick={handlePayment}>
                  Pay Now
                </button>
                <button className="btn btn-secondary" onClick={() => setIsPaymentPopupOpen(false)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FlightResults;