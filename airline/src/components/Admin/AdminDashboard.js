// import React from "react";
// import { Link } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./AdminDashboard.css";

// function AdminDashboard() {
//   return (
//     <div className="admin-dashboard container mt-5">
//       <h2 className="mb-4">Admin Control Center</h2>
//       <p>Manage all aspects of the airline system efficiently.</p>
//       <div className="dashboard-grid">
//         <Link to="/manage-flights" className="dashboard-card card shadow-sm">
//           <div className="card-body">
//             <h5>Manage Flights</h5>
//             <p>Schedule and update flight details</p>
//           </div>
//         </Link>
//         <Link to="/manage-airports" className="dashboard-card card shadow-sm">
//           <div className="card-body">
//             <h5>Manage Airports</h5>
//             <p>Add or modify airport information</p>
//           </div>
//         </Link>
//         <Link to="/manage-airplanes" className="dashboard-card card shadow-sm">
//           <div className="card-body">
//             <h5>Manage Airplanes</h5>
//             <p>Oversee aircraft fleet</p>
//           </div>
//         </Link>
//       </div>
//     </div>
//   );
// }

// export default AdminDashboard;




import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AdminDashboard.css";

function AdminDashboard() {
  return (
    <div className="admin-dashboard container mt-5">
      <h2 className="mb-4">Admin Control Center</h2>
      <p>Manage all aspects of the airline system efficiently.</p>
      <div className="dashboard-grid">
        <Link to="/manage-flights" className="dashboard-card card shadow-sm">
          <div className="card-body">
            <h5>Manage Flights</h5>
            <p>Schedule and update flight details</p>
          </div>
        </Link>
        <Link to="/manage-airports" className="dashboard-card card shadow-sm">
          <div className="card-body">
            <h5>Manage Airports</h5>
            <p>Add or modify airport information</p>
          </div>
        </Link>
        <Link to="/manage-airplanes" className="dashboard-card card shadow-sm">
          <div className="card-body">
            <h5>Manage Airplanes</h5>
            <p>Oversee aircraft fleet</p>
          </div>
        </Link>
        <Link to="/manage-customers" className="dashboard-card card shadow-sm">
          <div className="card-body">
            <h5>Manage Customers</h5>
            <p>View customer details and bookings</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default AdminDashboard;
