import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ManageAirports.css";

function ManageAirports() {
  const [airports, setAirports] = useState([]);
  const [newAirport, setNewAirport] = useState({
    name: "",
    code: "",
    city: "",
    terminals: "",
    runways: "",
    coordinates: "",
  });
  const [message, setMessage] = useState("");

  const handleAddAirport = () => {
    if (!newAirport.name || !newAirport.code || !newAirport.city) {
      setMessage("Please fill all required fields.");
      return;
    }
    setAirports([...airports, { ...newAirport, id: Date.now() }]);
    setNewAirport({ name: "", code: "", city: "", terminals: "", runways: "", coordinates: "" });
    setMessage("Airport added successfully!");
  };

  const handleDelete = (id) => {
    setAirports(airports.filter((a) => a.id !== id));
    setMessage("Airport deleted successfully!");
  };

  return (
    <div className="manage-airports container mt-5">
      <h2 className="mb-4">Manage Airports</h2>
      <div className="airport-form card shadow-sm p-4 mb-4">
        <div className="row">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Airport Name"
              value={newAirport.name}
              onChange={(e) => setNewAirport({ ...newAirport, name: e.target.value })}
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              className="form-control mb-3"
              placeholder="IATA Code (e.g., BLR)"
              value={newAirport.code}
              onChange={(e) => setNewAirport({ ...newAirport, code: e.target.value })}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control mb-3"
              placeholder="City"
              value={newAirport.city}
              onChange={(e) => setNewAirport({ ...newAirport, city: e.target.value })}
            />
          </div>
          <div className="col-md-6">
            <input
              type="number"
              className="form-control mb-3"
              placeholder="Number of Terminals"
              value={newAirport.terminals}
              onChange={(e) => setNewAirport({ ...newAirport, terminals: e.target.value })}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <input
              type="number"
              className="form-control mb-3"
              placeholder="Number of Runways"
              value={newAirport.runways}
              onChange={(e) => setNewAirport({ ...newAirport, runways: e.target.value })}
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Coordinates (e.g., 12.9716° N, 77.5946° E)"
              value={newAirport.coordinates}
              onChange={(e) => setNewAirport({ ...newAirport, coordinates: e.target.value })}
            />
          </div>
        </div>
        <button className="btn btn-info" onClick={handleAddAirport}>
          Add Airport
        </button>
      </div>
      {message && <div className="message mb-4">{message}</div>}
      <div className="airports-grid">
        {airports.map((a) => (
          <div key={a.id} className="airport-card card shadow-sm">
            <div className="card-body">
              <h5>{a.name} ({a.code})</h5>
              <p>
                City: {a.city}<br />
                Terminals: {a.terminals}<br />
                Runways: {a.runways}<br />
                Coordinates: {a.coordinates}
              </p>
              <button className="btn btn-danger btn-sm" onClick={() => handleDelete(a.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManageAirports;
