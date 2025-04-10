// import React, { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./ManageFlights.css";

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

// function ManageFlights() {
//   const [flights, setFlights] = useState([]);
//   const [newFlight, setNewFlight] = useState({
//     flightNumber: "",
//     airline: "",
//     departureAirport: "",
//     arrivalAirport: "",
//     departureTime: "",
//     arrivalTime: "",
//     prices: { economy: "", business: "", firstClass: "" },
//     seats: { economy: "", business: "", firstClass: "" },
//     airplaneModel: "",
//   });
//   const [message, setMessage] = useState("");

//   const handleAddFlight = () => {
//     if (
//       !newFlight.flightNumber ||
//       !newFlight.airline ||
//       !newFlight.departureAirport ||
//       !newFlight.arrivalAirport ||
//       !newFlight.departureTime ||
//       !newFlight.arrivalTime
//     ) {
//       setMessage("Please fill all required fields.");
//       return;
//     }
//     setFlights([...flights, { ...newFlight, id: Date.now() }]);
//     setNewFlight({
//       flightNumber: "",
//       airline: "",
//       departureAirport: "",
//       arrivalAirport: "",
//       departureTime: "",
//       arrivalTime: "",
//       prices: { economy: "", business: "", firstClass: "" },
//       seats: { economy: "", business: "", firstClass: "" },
//       airplaneModel: "",
//     });
//     setMessage("Flight added successfully!");
//   };

//   const handleDelete = (id) => {
//     setFlights(flights.filter((f) => f.id !== id));
//     setMessage("Flight deleted successfully!");
//   };

//   return (
//     <div className="manage-flights container mt-5">
//       <h2 className="mb-4">Manage Flights</h2>
//       <div className="flight-form card shadow-sm p-4 mb-4">
//         <div className="row">
//           <div className="col-md-4">
//             <input
//               type="text"
//               className="form-control mb-3"
//               placeholder="Flight Number"
//               value={newFlight.flightNumber}
//               onChange={(e) => setNewFlight({ ...newFlight, flightNumber: e.target.value })}
//             />
//           </div>
//           <div className="col-md-4">
//             <input
//               type="text"
//               className="form-control mb-3"
//               placeholder="Airline"
//               value={newFlight.airline}
//               onChange={(e) => setNewFlight({ ...newFlight, airline: e.target.value })}
//             />
//           </div>
//           <div className="col-md-4">
//             <input
//               type="text"
//               className="form-control mb-3"
//               placeholder="Airplane Model"
//               value={newFlight.airplaneModel}
//               onChange={(e) => setNewFlight({ ...newFlight, airplaneModel: e.target.value })}
//             />
//           </div>
//         </div>
//         <div className="row">
//           <div className="col-md-6">
//             <select
//               className="form-control mb-3"
//               value={newFlight.departureAirport}
//               onChange={(e) => setNewFlight({ ...newFlight, departureAirport: e.target.value })}
//             >
//               <option value="">Select Departure Airport</option>
//               {Object.entries(airports).map(([city, airportList]) =>
//                 airportList.map((airport) => (
//                   <option key={airport} value={airport}>
//                     {airport} ({city})
//                   </option>
//                 ))
//               )}
//             </select>
//           </div>
//           <div className="col-md-6">
//             <select
//               className="form-control mb-3"
//               value={newFlight.arrivalAirport}
//               onChange={(e) => setNewFlight({ ...newFlight, arrivalAirport: e.target.value })}
//             >
//               <option value="">Select Arrival Airport</option>
//               {Object.entries(airports).map(([city, airportList]) =>
//                 airportList.map((airport) => (
//                   <option key={airport} value={airport}>
//                     {airport} ({city})
//                   </option>
//                 ))
//               )}
//             </select>
//           </div>
//         </div>
//         <div className="row">
//           <div className="col-md-6">
//             <input
//               type="datetime-local"
//               className="form-control mb-3"
//               value={newFlight.departureTime}
//               onChange={(e) => setNewFlight({ ...newFlight, departureTime: e.target.value })}
//             />
//           </div>
//           <div className="col-md-6">
//             <input
//               type="datetime-local"
//               className="form-control mb-3"
//               value={newFlight.arrivalTime}
//               onChange={(e) => setNewFlight({ ...newFlight, arrivalTime: e.target.value })}
//             />
//           </div>
//         </div>
//         <div className="row">
//           <div className="col-md-4">
//             <input
//               type="number"
//               className="form-control mb-3"
//               placeholder="Economy Price"
//               value={newFlight.prices.economy}
//               onChange={(e) =>
//                 setNewFlight({
//                   ...newFlight,
//                   prices: { ...newFlight.prices, economy: e.target.value },
//                 })
//               }
//             />
//           </div>
//           <div className="col-md-4">
//             <input
//               type="number"
//               className="form-control mb-3"
//               placeholder="Business Price"
//               value={newFlight.prices.business}
//               onChange={(e) =>
//                 setNewFlight({
//                   ...newFlight,
//                   prices: { ...newFlight.prices, business: e.target.value },
//                 })
//               }
//             />
//           </div>
//           <div className="col-md-4">
//             <input
//               type="number"
//               className="form-control mb-3"
//               placeholder="First Class Price"
//               value={newFlight.prices.firstClass}
//               onChange={(e) =>
//                 setNewFlight({
//                   ...newFlight,
//                   prices: { ...newFlight.prices, firstClass: e.target.value },
//                 })
//               }
//             />
//           </div>
//         </div>
//         <div className="row">
//           <div className="col-md-4">
//             <input
//               type="number"
//               className="form-control mb-3"
//               placeholder="Economy Seats"
//               value={newFlight.seats.economy}
//               onChange={(e) =>
//                 setNewFlight({
//                   ...newFlight,
//                   seats: { ...newFlight.seats, economy: e.target.value },
//                 })
//               }
//             />
//           </div>
//           <div className="col-md-4">
//             <input
//               type="number"
//               className="form-control mb-3"
//               placeholder="Business Seats"
//               value={newFlight.seats.business}
//               onChange={(e) =>
//                 setNewFlight({
//                   ...newFlight,
//                   seats: { ...newFlight.seats, business: e.target.value },
//                 })
//               }
//             />
//           </div>
//           <div className="col-md-4">
//             <input
//               type="number"
//               className="form-control mb-3"
//               placeholder="First Class Seats"
//               value={newFlight.seats.firstClass}
//               onChange={(e) =>
//                 setNewFlight({
//                   ...newFlight,
//                   seats: { ...newFlight.seats, firstClass: e.target.value },
//                 })
//               }
//             />
//           </div>
//         </div>
//         <button className="btn btn-primary" onClick={handleAddFlight}>
//           Add Flight
//         </button>
//       </div>
//       {message && <div className="message mb-4">{message}</div>}
//       <div className="flights-grid">
//         {flights.map((f) => (
//           <div key={f.id} className="flight-card card shadow-sm">
//             <div className="card-body">
//               <h5>{f.flightNumber} - {f.airline}</h5>
//               <p>
//                 {f.departureAirport} → {f.arrivalAirport}<br />
//                 {f.departureTime} - {f.arrivalTime}<br />
//                 Prices: E: ₹{f.prices.economy}, B: ₹{f.prices.business}, FC: ₹{f.prices.firstClass}<br />
//                 Seats: E: {f.seats.economy}, B: {f.seats.business}, FC: {f.seats.firstClass}
//               </p>
//               <button className="btn btn-danger btn-sm" onClick={() => handleDelete(f.id)}>
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default ManageFlights;


import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ManageFlights.css";

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

function ManageFlights() {
  const [flights, setFlights] = useState([]);
  const [newFlight, setNewFlight] = useState({
    flightNumber: "",
    airline: "",
    departureAirport: "",
    arrivalAirport: "",
    departureTime: "",
    arrivalTime: "",
    prices: { economy: "", business: "", firstClass: "" },
    seats: { economy: "", business: "", firstClass: "" },
    airplaneModel: "",
  });
  const [editFlight, setEditFlight] = useState(null); // State for editing a flight
  const [message, setMessage] = useState("");

  const handleAddFlight = () => {
    if (
      !newFlight.flightNumber ||
      !newFlight.airline ||
      !newFlight.departureAirport ||
      !newFlight.arrivalAirport ||
      !newFlight.departureTime ||
      !newFlight.arrivalTime
    ) {
      setMessage("Please fill all required fields.");
      return;
    }
    setFlights([...flights, { ...newFlight, id: Date.now() }]);
    setNewFlight({
      flightNumber: "",
      airline: "",
      departureAirport: "",
      arrivalAirport: "",
      departureTime: "",
      arrivalTime: "",
      prices: { economy: "", business: "", firstClass: "" },
      seats: { economy: "", business: "", firstClass: "" },
      airplaneModel: "",
    });
    setMessage("Flight added successfully!");
  };

  const handleDelete = (id) => {
    setFlights(flights.filter((f) => f.id !== id));
    setMessage("Flight deleted successfully!");
  };

  const handleEdit = (flight) => {
    setEditFlight({ ...flight }); // Set the flight to edit
  };

  const handleUpdateFlight = () => {
    if (
      !editFlight.flightNumber ||
      !editFlight.airline ||
      !editFlight.departureAirport ||
      !editFlight.arrivalAirport ||
      !editFlight.departureTime ||
      !editFlight.arrivalTime
    ) {
      setMessage("Please fill all required fields.");
      return;
    }
    setFlights(
      flights.map((f) => (f.id === editFlight.id ? { ...editFlight } : f))
    );
    setEditFlight(null); // Close the edit form
    setMessage("Flight updated successfully!");
  };

  const handleCancelEdit = () => {
    setEditFlight(null); // Cancel editing
  };

  return (
    <div className="manage-flights container mt-5">
      <h2 className="mb-4">Manage Flights</h2>
      
      {/* Add Flight Form */}
      <div className="flight-form card shadow-sm p-4 mb-4">
        <div className="row">
          <div className="col-md-4">
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Flight Number"
              value={newFlight.flightNumber}
              onChange={(e) => setNewFlight({ ...newFlight, flightNumber: e.target.value })}
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Airline"
              value={newFlight.airline}
              onChange={(e) => setNewFlight({ ...newFlight, airline: e.target.value })}
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Airplane Model"
              value={newFlight.airplaneModel}
              onChange={(e) => setNewFlight({ ...newFlight, airplaneModel: e.target.value })}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <select
              className="form-control mb-3"
              value={newFlight.departureAirport}
              onChange={(e) => setNewFlight({ ...newFlight, departureAirport: e.target.value })}
            >
              <option value="">Select Departure Airport</option>
              {Object.entries(airports).map(([city, airportList]) =>
                airportList.map((airport) => (
                  <option key={airport} value={airport}>
                    {airport} ({city})
                  </option>
                ))
              )}
            </select>
          </div>
          <div className="col-md-6">
            <select
              className="form-control mb-3"
              value={newFlight.arrivalAirport}
              onChange={(e) => setNewFlight({ ...newFlight, arrivalAirport: e.target.value })}
            >
              <option value="">Select Arrival Airport</option>
              {Object.entries(airports).map(([city, airportList]) =>
                airportList.map((airport) => (
                  <option key={airport} value={airport}>
                    {airport} ({city})
                  </option>
                ))
              )}
            </select>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <input
              type="datetime-local"
              className="form-control mb-3"
              value={newFlight.departureTime}
              onChange={(e) => setNewFlight({ ...newFlight, departureTime: e.target.value })}
            />
          </div>
          <div className="col-md-6">
            <input
              type="datetime-local"
              className="form-control mb-3"
              value={newFlight.arrivalTime}
              onChange={(e) => setNewFlight({ ...newFlight, arrivalTime: e.target.value })}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <input
              type="number"
              className="form-control mb-3"
              placeholder="Economy Price"
              value={newFlight.prices.economy}
              onChange={(e) =>
                setNewFlight({
                  ...newFlight,
                  prices: { ...newFlight.prices, economy: e.target.value },
                })
              }
            />
          </div>
          <div className="col-md-4">
            <input
              type="number"
              className="form-control mb-3"
              placeholder="Business Price"
              value={newFlight.prices.business}
              onChange={(e) =>
                setNewFlight({
                  ...newFlight,
                  prices: { ...newFlight.prices, business: e.target.value },
                })
              }
            />
          </div>
          <div className="col-md-4">
            <input
              type="number"
              className="form-control mb-3"
              placeholder="First Class Price"
              value={newFlight.prices.firstClass}
              onChange={(e) =>
                setNewFlight({
                  ...newFlight,
                  prices: { ...newFlight.prices, firstClass: e.target.value },
                })
              }
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <input
              type="number"
              className="form-control mb-3"
              placeholder="Economy Seats"
              value={newFlight.seats.economy}
              onChange={(e) =>
                setNewFlight({
                  ...newFlight,
                  seats: { ...newFlight.seats, economy: e.target.value },
                })
              }
            />
          </div>
          <div className="col-md-4">
            <input
              type="number"
              className="form-control mb-3"
              placeholder="Business Seats"
              value={newFlight.seats.business}
              onChange={(e) =>
                setNewFlight({
                  ...newFlight,
                  seats: { ...newFlight.seats, business: e.target.value },
                })
              }
            />
          </div>
          <div className="col-md-4">
            <input
              type="number"
              className="form-control mb-3"
              placeholder="First Class Seats"
              value={newFlight.seats.firstClass}
              onChange={(e) =>
                setNewFlight({
                  ...newFlight,
                  seats: { ...newFlight.seats, firstClass: e.target.value },
                })
              }
            />
          </div>
        </div>
        <button className="btn btn-primary" onClick={handleAddFlight}>
          Add Flight
        </button>
      </div>

      {/* Edit Flight Form (shown when editing) */}
      {editFlight && (
        <div className="flight-form card shadow-sm p-4 mb-4">
          <h3>Edit Flight: {editFlight.flightNumber}</h3>
          <div className="row">
            <div className="col-md-4">
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Flight Number"
                value={editFlight.flightNumber}
                onChange={(e) => setEditFlight({ ...editFlight, flightNumber: e.target.value })}
              />
            </div>
            <div className="col-md-4">
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Airline"
                value={editFlight.airline}
                onChange={(e) => setEditFlight({ ...editFlight, airline: e.target.value })}
              />
            </div>
            <div className="col-md-4">
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Airplane Model"
                value={editFlight.airplaneModel}
                onChange={(e) => setEditFlight({ ...editFlight, airplaneModel: e.target.value })}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <select
                className="form-control mb-3"
                value={editFlight.departureAirport}
                onChange={(e) => setEditFlight({ ...editFlight, departureAirport: e.target.value })}
              >
                <option value="">Select Departure Airport</option>
                {Object.entries(airports).map(([city, airportList]) =>
                  airportList.map((airport) => (
                    <option key={airport} value={airport}>
                      {airport} ({city})
                    </option>
                  ))
                )}
              </select>
            </div>
            <div className="col-md-6">
              <select
                className="form-control mb-3"
                value={editFlight.arrivalAirport}
                onChange={(e) => setEditFlight({ ...editFlight, arrivalAirport: e.target.value })}
              >
                <option value="">Select Arrival Airport</option>
                {Object.entries(airports).map(([city, airportList]) =>
                  airportList.map((airport) => (
                    <option key={airport} value={airport}>
                      {airport} ({city})
                    </option>
                  ))
                )}
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <input
                type="datetime-local"
                className="form-control mb-3"
                value={editFlight.departureTime}
                onChange={(e) => setEditFlight({ ...editFlight, departureTime: e.target.value })}
              />
            </div>
            <div className="col-md-6">
              <input
                type="datetime-local"
                className="form-control mb-3"
                value={editFlight.arrivalTime}
                onChange={(e) => setEditFlight({ ...editFlight, arrivalTime: e.target.value })}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <input
                type="number"
                className="form-control mb-3"
                placeholder="Economy Price"
                value={editFlight.prices.economy}
                onChange={(e) =>
                  setEditFlight({
                    ...editFlight,
                    prices: { ...editFlight.prices, economy: e.target.value },
                  })
                }
              />
            </div>
            <div className="col-md-4">
              <input
                type="number"
                className="form-control mb-3"
                placeholder="Business Price"
                value={editFlight.prices.business}
                onChange={(e) =>
                  setEditFlight({
                    ...editFlight,
                    prices: { ...editFlight.prices, business: e.target.value },
                  })
                }
              />
            </div>
            <div className="col-md-4">
              <input
                type="number"
                className="form-control mb-3"
                placeholder="First Class Price"
                value={editFlight.prices.firstClass}
                onChange={(e) =>
                  setEditFlight({
                    ...editFlight,
                    prices: { ...editFlight.prices, firstClass: e.target.value },
                  })
                }
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <input
                type="number"
                className="form-control mb-3"
                placeholder="Economy Seats"
                value={editFlight.seats.economy}
                onChange={(e) =>
                  setEditFlight({
                    ...editFlight,
                    seats: { ...editFlight.seats, economy: e.target.value },
                  })
                }
              />
            </div>
            <div className="col-md-4">
              <input
                type="number"
                className="form-control mb-3"
                placeholder="Business Seats"
                value={editFlight.seats.business}
                onChange={(e) =>
                  setEditFlight({
                    ...editFlight,
                    seats: { ...editFlight.seats, business: e.target.value },
                  })
                }
              />
            </div>
            <div className="col-md-4">
              <input
                type="number"
                className="form-control mb-3"
                placeholder="First Class Seats"
                value={editFlight.seats.firstClass}
                onChange={(e) =>
                  setEditFlight({
                    ...editFlight,
                    seats: { ...editFlight.seats, firstClass: e.target.value },
                  })
                }
              />
            </div>
          </div>
          <div className="edit-buttons">
            <button className="btn btn-success me-2" onClick={handleUpdateFlight}>
              Save Changes
            </button>
            <button className="btn btn-secondary" onClick={handleCancelEdit}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {message && <div className="message mb-4">{message}</div>}
      
      {/* Flights List */}
      <div className="flights-grid">
        {flights.map((f) => (
          <div key={f.id} className="flight-card card shadow-sm">
            <div className="card-body">
              <h5>{f.flightNumber} - {f.airline}</h5>
              <p>
                {f.departureAirport} → {f.arrivalAirport}<br />
                {f.departureTime} - {f.arrivalTime}<br />
                Prices: E: ₹{f.prices.economy}, B: ₹{f.prices.business}, FC: ₹{f.prices.firstClass}<br />
                Seats: E: {f.seats.economy}, B: {f.seats.business}, FC: {f.seats.firstClass}
              </p>
              <div className="flight-actions">
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleEdit(f)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(f.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManageFlights;
