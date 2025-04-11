// import React, { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./ManageAirplanes.css";

// function ManageAirplanes() {
//   const [airplanes, setAirplanes] = useState([]);
//   const [newAirplane, setNewAirplane] = useState({
//     model: "",
//     manufacturer: "",
//     capacity: { economy: "", business: "", firstClass: "" },
//     range: "",
//     registration: "",
//   });
//   const [message, setMessage] = useState("");
 

//   const handleAddAirplane = () => {
//     if (!newAirplane.model || !newAirplane.manufacturer) {
//       setMessage("Please fill all required fields.");
//       return;
//     }
//     setAirplanes([...airplanes, { ...newAirplane, id: Date.now() }]);
//     setNewAirplane({
//       model: "",
//       manufacturer: "",
//       capacity: { economy: "", business: "", firstClass: "" },
//       range: "",
//       registration: "",
//     });
//     setMessage("Airplane added successfully!");
//   };

//   const handleDelete = (id) => {
//     setAirplanes(airplanes.filter((a) => a.id !== id));
//     setMessage("Airplane deleted successfully!");
//   };

//   return (
//     <div className="manage-airplanes container mt-5">
//       <h2 className="mb-4">Manage Airplanes</h2>
//       <div className="airplane-form card shadow-sm p-4 mb-4">
//         <div className="row">
//           <div className="col-md-6">
//             <input
//               type="text"
//               className="form-control mb-3"
//               placeholder="Aircraft Model"
//               value={newAirplane.model}
//               onChange={(e) => setNewAirplane({ ...newAirplane, model: e.target.value })}
//             />
//           </div>
//           <div className="col-md-6">
//             <input
//               type="text"
//               className="form-control mb-3"
//               placeholder="Manufacturer"
//               value={newAirplane.manufacturer}
//               onChange={(e) => setNewAirplane({ ...newAirplane, manufacturer: e.target.value })}
//             />
//           </div>
//         </div>
//         <div className="row">
//           <div className="col-md-4">
//             <input
//               type="number"
//               className="form-control mb-3"
//               placeholder="Economy Capacity"
//               value={newAirplane.capacity.economy}
//               onChange={(e) =>
//                 setNewAirplane({
//                   ...newAirplane,
//                   capacity: { ...newAirplane.capacity, economy: e.target.value },
//                 })
//               }
//             />
//           </div>
//           <div className="col-md-4">
//             <input
//               type="number"
//               className="form-control mb-3"
//               placeholder="Business Capacity"
//               value={newAirplane.capacity.business}
//               onChange={(e) =>
//                 setNewAirplane({
//                   ...newAirplane,
//                   capacity: { ...newAirplane.capacity, business: e.target.value },
//                 })
//               }
//             />
//           </div>
//           <div className="col-md-4">
//             <input
//               type="number"
//               className="form-control mb-3"
//               placeholder="First Class Capacity"
//               value={newAirplane.capacity.firstClass}
//               onChange={(e) =>
//                 setNewAirplane({
//                   ...newAirplane,
//                   capacity: { ...newAirplane.capacity, firstClass: e.target.value },
//                 })
//               }
//             />
//           </div>
//         </div>
//         <div className="row">
//           <div className="col-md-6">
//             <input
//               type="text"
//               className="form-control mb-3"
//               placeholder="Range (e.g., 5000 km)"
//               value={newAirplane.range}
//               onChange={(e) => setNewAirplane({ ...newAirplane, range: e.target.value })}
//             />
//           </div>
//           <div className="col-md-6">
//             <input
//               type="text"
//               className="form-control mb-3"
//               placeholder="Registration Number"
//               value={newAirplane.registration}
//               onChange={(e) => setNewAirplane({ ...newAirplane, registration: e.target.value })}
//             />
//           </div>
//         </div>
//         <button className="btn btn-secondary" onClick={handleAddAirplane}>
//           Add Airplane
//         </button>
//       </div>
//       {message && <div className="message mb-4">{message}</div>}
//       <div className="airplanes-grid">
//         {airplanes.map((a) => (
//           <div key={a.id} className="airplane-card card shadow-sm">
//             <div className="card-body">
//               <h5>{a.model} - {a.manufacturer}</h5>
//               <p>
//                 Capacity: E: {a.capacity.economy}, B: {a.capacity.business}, FC: {a.capacity.firstClass}<br />
//                 Range: {a.range}<br />
//                 Registration: {a.registration}
//               </p>
//               <button className="btn btn-danger btn-sm" onClick={() => handleDelete(a.id)}>
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default ManageAirplanes;


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
  const [editAirplane, setEditAirplane] = useState(null);
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState("");
  const [deletePopup, setDeletePopup] = useState(null);

  const handleAddAirplane = () => {
    if (!newAirplane.model || !newAirplane.manufacturer || !newAirplane.registration) {
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
    setIsAddPopupOpen(false);
    setMessage("Airplane added successfully!");
  };

  const handleDelete = (id) => {
    const airplaneToDelete = airplanes.find((a) => a.id === id);
    setDeletePopup(airplaneToDelete);
  };

  const confirmDelete = () => {
    setAirplanes(airplanes.filter((a) => a.id !== deletePopup.id));
    setDeletePopup(null);
    setMessage("Airplane deleted successfully!");
  };

  const handleEdit = (airplane) => {
    setEditAirplane({ ...airplane });
  };

  const handleUpdateAirplane = () => {
    if (!editAirplane.model || !editAirplane.manufacturer || !editAirplane.registration) {
      setMessage("Please fill all required fields.");
      return;
    }
    setAirplanes(airplanes.map((a) => (a.id === editAirplane.id ? { ...editAirplane } : a)));
    setEditAirplane(null);
    setMessage("Airplane updated successfully!");
  };

  const filteredAirplanes = airplanes.filter((a) =>
    a.registration.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="manage-airplanes container mt-5">
      <h2 className="mb-4">Manage Airplanes</h2>

      <div className="search-add-section mb-4 d-flex gap-3 align-items-center">
        <input
          type="text"
          className="form-control"
          placeholder="Search by Registration Number"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="btn btn-secondary" onClick={() => setIsAddPopupOpen(true)}>
          Add New
        </button>
      </div>

      {message && <div className="message mb-4">{message}</div>}

      <div className="table-responsive">
        <table className="table table-striped table-bordered airplanes-table">
          <thead>
            <tr>
              <th>Model</th>
              <th>Manufacturer</th>
              <th>Economy Capacity</th>
              <th>Business Capacity</th>
              <th>First Class Capacity</th>
              <th>Range</th>
              <th>Registration</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAirplanes.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center">
                  No airplanes found.
                </td>
              </tr>
            ) : (
              filteredAirplanes.map((a) => (
                <tr key={a.id}>
                  <td>{a.model}</td>
                  <td>{a.manufacturer}</td>
                  <td>{a.capacity.economy}</td>
                  <td>{a.capacity.business}</td>
                  <td>{a.capacity.firstClass}</td>
                  <td>{a.range}</td>
                  <td>{a.registration}</td>
                  <td>
                    <div className="airplane-actions d-flex gap-2 justify-content-center">
                      <button
                        className="btn btn-warning btn-sm"
                        onClick={() => handleEdit(a)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(a.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {isAddPopupOpen && (
        <div className="airplane-popup">
          <div className="popup-content card shadow-sm">
            <div className="card-body">
              <h3>Add New Airplane</h3>
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
              <div className="edit-buttons d-flex gap-2">
                <button className="btn btn-secondary" onClick={handleAddAirplane}>
                  Add Airplane
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => setIsAddPopupOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {editAirplane && (
        <div className="airplane-popup">
          <div className="popup-content card shadow-sm">
            <div className="card-body">
              <h3>Edit Airplane: {editAirplane.registration}</h3>
              <div className="row">
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Aircraft Model"
                    value={editAirplane.model}
                    onChange={(e) => setEditAirplane({ ...editAirplane, model: e.target.value })}
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Manufacturer"
                    value={editAirplane.manufacturer}
                    onChange={(e) => setEditAirplane({ ...editAirplane, manufacturer: e.target.value })}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <input
                    type="number"
                    className="form-control mb-3"
                    placeholder="Economy Capacity"
                    value={editAirplane.capacity.economy}
                    onChange={(e) =>
                      setEditAirplane({
                        ...editAirplane,
                        capacity: { ...editAirplane.capacity, economy: e.target.value },
                      })
                    }
                  />
                </div>
                <div className="col-md-4">
                  <input
                    type="number"
                    className="form-control mb-3"
                    placeholder="Business Capacity"
                    value={editAirplane.capacity.business}
                    onChange={(e) =>
                      setEditAirplane({
                        ...editAirplane,
                        capacity: { ...editAirplane.capacity, business: e.target.value },
                      })
                    }
                  />
                </div>
                <div className="col-md-4">
                  <input
                    type="number"
                    className="form-control mb-3"
                    placeholder="First Class Capacity"
                    value={editAirplane.capacity.firstClass}
                    onChange={(e) =>
                      setEditAirplane({
                        ...editAirplane,
                        capacity: { ...editAirplane.capacity, firstClass: e.target.value },
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
                    value={editAirplane.range}
                    onChange={(e) => setEditAirplane({ ...editAirplane, range: e.target.value })}
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Registration Number"
                    value={editAirplane.registration}
                    onChange={(e) => setEditAirplane({ ...editAirplane, registration: e.target.value })}
                  />
                </div>
              </div>
              <div className="edit-buttons d-flex gap-2">
                <button className="btn btn-success" onClick={handleUpdateAirplane}>
                  Save Changes
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => setEditAirplane(null)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {deletePopup && (
        <div className="airplane-popup">
          <div className="popup-content card shadow-sm">
            <div className="card-body">
              <h3>Confirm Delete</h3>
              <p>Are you sure you want to delete the airplane with Registration Number: <strong>{deletePopup.registration}</strong>?</p>
              <div className="edit-buttons d-flex gap-2">
                <button className="btn btn-danger" onClick={confirmDelete}>
                  Confirm
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => setDeletePopup(null)}
                >
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

export default ManageAirplanes;