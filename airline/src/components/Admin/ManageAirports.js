



// import React, { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./ManageAirports.css";

// function ManageAirports() {
//   const [airports, setAirports] = useState([]);
//   const [newAirport, setNewAirport] = useState({
//     name: "",
//     code: "",
//     city: "",
//     terminals: "",
//     runways: "",
//     coordinates: "",
//   });
//   const [editAirport, setEditAirport] = useState(null);
//   const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [message, setMessage] = useState("");

//   const handleAddAirport = () => {
//     if (!newAirport.name || !newAirport.code || !newAirport.city) {
//       setMessage("Please fill all required fields.");
//       return;
//     }
//     setAirports([...airports, { ...newAirport, id: Date.now() }]);
//     setNewAirport({ name: "", code: "", city: "", terminals: "", runways: "", coordinates: "" });
//     setIsAddPopupOpen(false);
//     setMessage("Airport added successfully!");
//   };

//   const handleDelete = (id) => {
//     setAirports(airports.filter((a) => a.id !== id));
//     setMessage("Airport deleted successfully!");
//   };

//   const handleEdit = (airport) => {
//     setEditAirport({ ...airport });
//   };

//   const handleUpdateAirport = () => {
//     if (!editAirport.name || !editAirport.code || !editAirport.city) {
//       setMessage("Please fill all required fields.");
//       return;
//     }
//     setAirports(airports.map((a) => (a.id === editAirport.id ? { ...editAirport } : a)));
//     setEditAirport(null);
//     setMessage("Airport updated successfully!");
//   };

//   const filteredAirports = airports.filter((a) =>
//     a.code.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="manage-airports container mt-5">
//       <h2 className="mb-4">Manage Airports</h2>

//       <div className="search-add-section mb-4 d-flex gap-3 align-items-center">
//         <input
//           type="text"
//           className="form-control"
//           placeholder="Search by IATA Code"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//         <button className="btn btn-info" onClick={() => setIsAddPopupOpen(true)}>
//           Add New
//         </button>
//       </div>

//       {message && <div className="message mb-4">{message}</div>}

//       <div className="table-responsive">
//         <table className="table table-striped table-bordered airports-table">
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>IATA Code</th>
//               <th>City</th>
//               <th>Terminals</th>
//               <th>Runways</th>
//               <th>Coordinates</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredAirports.length === 0 ? (
//               <tr>
//                 <td colSpan="7" className="text-center">
//                   No airports found.
//                 </td>
//               </tr>
//             ) : (
//               filteredAirports.map((a) => (
//                 <tr key={a.id}>
//                   <td>{a.name}</td>
//                   <td>{a.code}</td>
//                   <td>{a.city}</td>
//                   <td>{a.terminals}</td>
//                   <td>{a.runways}</td>
//                   <td>{a.coordinates}</td>
//                   <td>
//                     <div className="airport-actions d-flex gap-2 justify-content-center">
//                       <button
//                         className="btn btn-warning btn-sm"
//                         onClick={() => handleEdit(a)}
//                       >
//                         Edit
//                       </button>
//                       <button
//                         className="btn btn-danger btn-sm"
//                         onClick={() => handleDelete(a.id)}
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       {isAddPopupOpen && (
//         <div className="airport-popup">
//           <div className="popup-content card shadow-sm">
//             <div className="card-body">
//               <h3>Add New Airport</h3>
//               <div className="row">
//                 <div className="col-md-6">
//                   <input
//                     type="text"
//                     className="form-control mb-3"
//                     placeholder="Airport Name"
//                     value={newAirport.name}
//                     onChange={(e) => setNewAirport({ ...newAirport, name: e.target.value })}
//                   />
//                 </div>
//                 <div className="col-md-6">
//                   <input
//                     type="text"
//                     className="form-control mb-3"
//                     placeholder="IATA Code (e.g., BLR)"
//                     value={newAirport.code}
//                     onChange={(e) => setNewAirport({ ...newAirport, code: e.target.value })}
//                   />
//                 </div>
//               </div>
//               <div className="row">
//                 <div className="col-md-6">
//                   <input
//                     type="text"
//                     className="form-control mb-3"
//                     placeholder="City"
//                     value={newAirport.city}
//                     onChange={(e) => setNewAirport({ ...newAirport, city: e.target.value })}
//                   />
//                 </div>
//                 <div className="col-md-6">
//                   <input
//                     type="number"
//                     className="form-control mb-3"
//                     placeholder="Number of Terminals"
//                     value={newAirport.terminals}
//                     onChange={(e) => setNewAirport({ ...newAirport, terminals: e.target.value })}
//                   />
//                 </div>
//               </div>
//               <div className="row">
//                 <div className="col-md-6">
//                   <input
//                     type="number"
//                     className="form-control mb-3"
//                     placeholder="Number of Runways"
//                     value={newAirport.runways}
//                     onChange={(e) => setNewAirport({ ...newAirport, runways: e.target.value })}
//                   />
//                 </div>
//                 <div className="col-md-6">
//                   <input
//                     type="text"
//                     className="form-control mb-3"
//                     placeholder="Coordinates (e.g., 12.9716° N, 77.5946° E)"
//                     value={newAirport.coordinates}
//                     onChange={(e) => setNewAirport({ ...newAirport, coordinates: e.target.value })}
//                   />
//                 </div>
//               </div>
//               <div className="edit-buttons d-flex gap-2">
//                 <button className="btn btn-info" onClick={handleAddAirport}>
//                   Add Airport
//                 </button>
//                 <button
//                   className="btn btn-secondary"
//                   onClick={() => setIsAddPopupOpen(false)}
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {editAirport && (
//         <div className="airport-popup">
//           <div className="popup-content card shadow-sm">
//             <div className="card-body">
//               <h3>Edit Airport: {editAirport.code}</h3>
//               <div className="row">
//                 <div className="col-md-6">
//                   <input
//                     type="text"
//                     className="form-control mb-3"
//                     placeholder="Airport Name"
//                     value={editAirport.name}
//                     onChange={(e) => setEditAirport({ ...editAirport, name: e.target.value })}
//                   />
//                 </div>
//                 <div className="col-md-6">
//                   <input
//                     type="text"
//                     className="form-control mb-3"
//                     placeholder="IATA Code (e.g., BLR)"
//                     value={editAirport.code}
//                     onChange={(e) => setEditAirport({ ...editAirport, code: e.target.value })}
//                   />
//                 </div>
//               </div>
//               <div className="row">
//                 <div className="col-md-6">
//                   <input
//                     type="text"
//                     className="form-control mb-3"
//                     placeholder="City"
//                     value={editAirport.city}
//                     onChange={(e) => setEditAirport({ ...editAirport, city: e.target.value })}
//                   />
//                 </div>
//                 <div className="col-md-6">
//                   <input
//                     type="number"
//                     className="form-control mb-3"
//                     placeholder="Number of Terminals"
//                     value={editAirport.terminals}
//                     onChange={(e) => setEditAirport({ ...editAirport, terminals: e.target.value })}
//                   />
//                 </div>
//               </div>
//               <div className="row">
//                 <div className="col-md-6">
//                   <input
//                     type="number"
//                     className="form-control mb-3"
//                     placeholder="Number of Runways"
//                     value={editAirport.runways}
//                     onChange={(e) => setEditAirport({ ...editAirport, runways: e.target.value })}
//                   />
//                 </div>
//                 <div className="col-md-6">
//                   <input
//                     type="text"
//                     className="form-control mb-3"
//                     placeholder="Coordinates (e.g., 12.9716° N, 77.5946° E)"
//                     value={editAirport.coordinates}
//                     onChange={(e) => setEditAirport({ ...editAirport, coordinates: e.target.value })}
//                   />
//                 </div>
//               </div>
//               <div className="edit-buttons d-flex gap-2">
//                 <button className="btn btn-success" onClick={handleUpdateAirport}>
//                   Save Changes
//                 </button>
//                 <button
//                   className="btn btn-secondary"
//                   onClick={() => setEditAirport(null)}
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default ManageAirports;





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
  const [editAirport, setEditAirport] = useState(null);
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState("");
  const [deletePopup, setDeletePopup] = useState(null); // Added state for delete confirmation

  const handleAddAirport = () => {
    if (!newAirport.name || !newAirport.code || !newAirport.city) {
      setMessage("Please fill all required fields.");
      return;
    }
    setAirports([...airports, { ...newAirport, id: Date.now() }]);
    setNewAirport({ name: "", code: "", city: "", terminals: "", runways: "", coordinates: "" });
    setIsAddPopupOpen(false);
    setMessage("Airport added successfully!");
  };

  const handleDelete = (id) => {
    const airportToDelete = airports.find((a) => a.id === id);
    setDeletePopup(airportToDelete); // Show delete confirmation popup
  };

  const confirmDelete = () => {
    setAirports(airports.filter((a) => a.id !== deletePopup.id));
    setDeletePopup(null); // Close popup
    setMessage("Airport deleted successfully!");
  };

  const handleEdit = (airport) => {
    setEditAirport({ ...airport });
  };

  const handleUpdateAirport = () => {
    if (!editAirport.name || !editAirport.code || !editAirport.city) {
      setMessage("Please fill all required fields.");
      return;
    }
    setAirports(airports.map((a) => (a.id === editAirport.id ? { ...editAirport } : a)));
    setEditAirport(null);
    setMessage("Airport updated successfully!");
  };

  const filteredAirports = airports.filter((a) =>
    a.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="manage-airports container mt-5">
      <h2 className="mb-4">Manage Airports</h2>

      <div className="search-add-section mb-4 d-flex gap-3 align-items-center">
        <input
          type="text"
          className="form-control"
          placeholder="Search by IATA Code"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="btn btn-info" onClick={() => setIsAddPopupOpen(true)}>
          Add New
        </button>
      </div>

      {message && <div className="message mb-4">{message}</div>}

      <div className="table-responsive">
        <table className="table table-striped table-bordered airports-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>IATA Code</th>
              <th>City</th>
              <th>Terminals</th>
              <th>Runways</th>
              <th>Coordinates</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAirports.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center">
                  No airports found.
                </td>
              </tr>
            ) : (
              filteredAirports.map((a) => (
                <tr key={a.id}>
                  <td>{a.name}</td>
                  <td>{a.code}</td>
                  <td>{a.city}</td>
                  <td>{a.terminals}</td>
                  <td>{a.runways}</td>
                  <td>{a.coordinates}</td>
                  <td>
                    <div className="airport-actions d-flex gap-2 justify-content-center">
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
        <div className="airport-popup">
          <div className="popup-content card shadow-sm">
            <div className="card-body">
              <h3>Add New Airport</h3>
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
              <div className="edit-buttons d-flex gap-2">
                <button className="btn btn-info" onClick={handleAddAirport}>
                  Add Airport
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

      {editAirport && (
        <div className="airport-popup">
          <div className="popup-content card shadow-sm">
            <div className="card-body">
              <h3>Edit Airport: {editAirport.code}</h3>
              <div className="row">
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Airport Name"
                    value={editAirport.name}
                    onChange={(e) => setEditAirport({ ...editAirport, name: e.target.value })}
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="IATA Code (e.g., BLR)"
                    value={editAirport.code}
                    onChange={(e) => setEditAirport({ ...editAirport, code: e.target.value })}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="City"
                    value={editAirport.city}
                    onChange={(e) => setEditAirport({ ...editAirport, city: e.target.value })}
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="number"
                    className="form-control mb-3"
                    placeholder="Number of Terminals"
                    value={editAirport.terminals}
                    onChange={(e) => setEditAirport({ ...editAirport, terminals: e.target.value })}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <input
                    type="number"
                    className="form-control mb-3"
                    placeholder="Number of Runways"
                    value={editAirport.runways}
                    onChange={(e) => setEditAirport({ ...editAirport, runways: e.target.value })}
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Coordinates (e.g., 12.9716° N, 77.5946° E)"
                    value={editAirport.coordinates}
                    onChange={(e) => setEditAirport({ ...editAirport, coordinates: e.target.value })}
                  />
                </div>
              </div>
              <div className="edit-buttons d-flex gap-2">
                <button className="btn btn-success" onClick={handleUpdateAirport}>
                  Save Changes
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => setEditAirport(null)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {deletePopup && (
        <div className="airport-popup">
          <div className="popup-content card shadow-sm">
            <div className="card-body">
              <h3>Confirm Delete</h3>
              <p>Are you sure you want to delete the airport with IATA Code: <strong>{deletePopup.code}</strong>?</p>
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

export default ManageAirports;