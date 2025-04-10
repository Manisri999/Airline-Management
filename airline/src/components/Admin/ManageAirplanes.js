import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ManageAirplanes.css";

function ManageAirplanes() {
  const [airplanes, setAirplanes] = useState([]);
  const [newAirplane, setNewAirplane] = useState({
    model: "",
    manufacturer: "",
    capacity: { economy: "", business: "", firstClass: "" },
    range: "",
    registration: "",
  });
  const [message, setMessage] = useState("");
 

  const handleAddAirplane = () => {
    if (!newAirplane.model || !newAirplane.manufacturer) {
      setMessage("Please fill all required fields.");
      return;
    }
    setAirplanes([...airplanes, { ...newAirplane, id: Date.now() }]);
    setNewAirplane({
      model: "",
      manufacturer: "",
      capacity: { economy: "", business: "", firstClass: "" },
      range: "",
      registration: "",
    });
    setMessage("Airplane added successfully!");
  };

  const handleDelete = (id) => {
    setAirplanes(airplanes.filter((a) => a.id !== id));
    setMessage("Airplane deleted successfully!");
  };

  return (
    <div className="manage-airplanes container mt-5">
      <h2 className="mb-4">Manage Airplanes</h2>
      <div className="airplane-form card shadow-sm p-4 mb-4">
        <div className="row">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Aircraft Model"
              value={newAirplane.model}
              onChange={(e) => setNewAirplane({ ...newAirplane, model: e.target.value })}
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Manufacturer"
              value={newAirplane.manufacturer}
              onChange={(e) => setNewAirplane({ ...newAirplane, manufacturer: e.target.value })}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <input
              type="number"
              className="form-control mb-3"
              placeholder="Economy Capacity"
              value={newAirplane.capacity.economy}
              onChange={(e) =>
                setNewAirplane({
                  ...newAirplane,
                  capacity: { ...newAirplane.capacity, economy: e.target.value },
                })
              }
            />
          </div>
          <div className="col-md-4">
            <input
              type="number"
              className="form-control mb-3"
              placeholder="Business Capacity"
              value={newAirplane.capacity.business}
              onChange={(e) =>
                setNewAirplane({
                  ...newAirplane,
                  capacity: { ...newAirplane.capacity, business: e.target.value },
                })
              }
            />
          </div>
          <div className="col-md-4">
            <input
              type="number"
              className="form-control mb-3"
              placeholder="First Class Capacity"
              value={newAirplane.capacity.firstClass}
              onChange={(e) =>
                setNewAirplane({
                  ...newAirplane,
                  capacity: { ...newAirplane.capacity, firstClass: e.target.value },
                })
              }
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Range (e.g., 5000 km)"
              value={newAirplane.range}
              onChange={(e) => setNewAirplane({ ...newAirplane, range: e.target.value })}
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Registration Number"
              value={newAirplane.registration}
              onChange={(e) => setNewAirplane({ ...newAirplane, registration: e.target.value })}
            />
          </div>
        </div>
        <button className="btn btn-secondary" onClick={handleAddAirplane}>
          Add Airplane
        </button>
      </div>
      {message && <div className="message mb-4">{message}</div>}
      <div className="airplanes-grid">
        {airplanes.map((a) => (
          <div key={a.id} className="airplane-card card shadow-sm">
            <div className="card-body">
              <h5>{a.model} - {a.manufacturer}</h5>
              <p>
                Capacity: E: {a.capacity.economy}, B: {a.capacity.business}, FC: {a.capacity.firstClass}<br />
                Range: {a.range}<br />
                Registration: {a.registration}
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

export default ManageAirplanes;