// import React from "react";
// import { Routes, Route, Link, Navigate } from "react-router-dom";
// import { FaPlane, FaHome, FaSignInAlt, FaSignOutAlt, FaTools, FaPlaneDeparture, FaBuilding } from "react-icons/fa";
// import Home from "./components/Home";
// import FlightResults from "./components/FlightResults";
// import LoginRegister from "./components/LoginRegister";
// import UserDashboard from "./components/User/UserDashboard";
// import UserBookings from "./components/User/UserBookings";
// import UserSupport from "./components/User/UserSupport";
// import UserWallet from "./components/User/UserWallet";
// import UserNavbar from "./components/User/UserNavbar";
// import UserProfile from "./components/User/UserProfile";
// import AdminDashboard from "./components/Admin/AdminDashboard";
// import ManageFlights from "./components/Admin/ManageFlights";
// import ManageAirports from "./components/Admin/ManageAirports";
// import ManageAirplanes from "./components/Admin/ManageAirplanes";
// import { AuthProvider, useAuth } from "./AuthContext"; // Adjust path if needed
// import { PaymentProvider } from "./PaymentContext"; // Adjust Leasing
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./App.css";

// const ProtectedUserRoute = ({ children }) => {
//   const { isLoggedIn, isAdmin } = useAuth();
//   return isLoggedIn && !isAdmin ? children : <Navigate to="/login-register" replace />;
// };

// const ProtectedAdminRoute = ({ children }) => {
//   const { isAdmin } = useAuth();
//   return isAdmin ? children : <Navigate to="/login-register" replace />;
// };

// function AppContent() {
//   const { isLoggedIn, isAdmin, loggedInUser, logout } = useAuth();

//   return (
//     <div className="app-container">
//       <nav className="navbar navbar-expand-lg navbar-dark bg-coffee-dark"> 
//         <div className="container">
//           <Link className="navbar-brand" to="/">
//             <FaPlane className="me-2" /> Namma Airlines
//           </Link>
//           <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
//             <span className="navbar-toggler-icon"></span>
//           </button>
//           <div className="collapse navbar-collapse" id="navbarNav">
//             <ul className="navbar-nav me-auto">
//               {!isAdmin && (
//                 <li className="nav-item">
//                   <Link className="nav-link" to="/"><FaHome /> Home</Link>
//                 </li>
//               )}
//               {!isLoggedIn && (
//                 <li className="nav-item">
//                   <Link className="nav-link" to="/login-register"><FaSignInAlt /> Login/Register</Link>
//                 </li>
//               )}
//               {isAdmin && (
//                 <>
//                   <li className="nav-item"><Link className="nav-link" to="/admin-dashboard"><FaTools /> Admin</Link></li>
//                   <li className="nav-item"><Link className="nav-link" to="/manage-flights"><FaPlaneDeparture /> Flights</Link></li>
//                   <li className="nav-item"><Link className="nav-link" to="/manage-airports"><FaBuilding /> Airports</Link></li>
//                   <li className="nav-item"><Link className="nav-link" to="/manage-airplanes"><FaPlane /> Airplanes</Link></li>
//                 </>
//               )}
//             </ul>
//             {isLoggedIn && (
//               <button className="btn btn-outline-light" onClick={logout}>
//                 <FaSignOutAlt /> Logout
//               </button>
//             )}
//           </div>
//         </div>
//       </nav>

//       {isLoggedIn && !isAdmin && <UserNavbar />}
      
//       <div className="container mt-4">
//         <Routes>
//           <Route path="/" element={!isAdmin ? <Home loggedInUser={loggedInUser} /> : <Navigate to="/admin-dashboard" replace />} />
//           <Route path="/results" element={<FlightResults />} />
//           <Route path="/login-register" element={<LoginRegister />} />
//           <Route path="/user-dashboard" element={<ProtectedUserRoute><UserDashboard /></ProtectedUserRoute>} />
//           <Route path="/user-bookings" element={<ProtectedUserRoute><UserBookings /></ProtectedUserRoute>} />
//           <Route path="/user-support" element={<ProtectedUserRoute><UserSupport /></ProtectedUserRoute>} />
//           <Route path="/user-wallet" element={<ProtectedUserRoute><UserWallet /></ProtectedUserRoute>} />
//           <Route path="/user-profile" element={<ProtectedUserRoute><UserProfile /></ProtectedUserRoute>} />
//           <Route path="/admin-dashboard" element={<ProtectedAdminRoute><AdminDashboard /></ProtectedAdminRoute>} />
//           <Route path="/manage-flights" element={<ProtectedAdminRoute><ManageFlights /></ProtectedAdminRoute>} />
//           <Route path="/manage-airports" element={<ProtectedAdminRoute><ManageAirports /></ProtectedAdminRoute>} />
//           <Route path="/manage-airplanes" element={<ProtectedAdminRoute><ManageAirplanes /></ProtectedAdminRoute>} />
//           <Route path="*" element={<h2 className="text-coffee-dark">404 - Page Not Found</h2>} />
//         </Routes>
//       </div>
//     </div>
//   );
// }

// function App() {
//   return (
//     <AuthProvider>
//       <PaymentProvider>
//         <AppContent />
//       </PaymentProvider>
//     </AuthProvider>
//   );
// }

// export default App;








import React from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import { FaPlane, FaHome, FaSignInAlt, FaSignOutAlt, FaTools, FaPlaneDeparture, FaBuilding } from "react-icons/fa";
import Home from "./components/Home";
import FlightResults from "./components/FlightResults";
import LoginRegister from "./components/LoginRegister";
import UserDashboard from "./components/User/UserDashboard";
import UserBookings from "./components/User/UserBookings";
import UserSupport from "./components/User/UserSupport";
import UserWallet from "./components/User/UserWallet";
import UserNavbar from "./components/User/UserNavbar";
import UserProfile from "./components/User/UserProfile";
import AdminDashboard from "./components/Admin/AdminDashboard";
import ManageFlights from "./components/Admin/ManageFlights";
import ManageAirports from "./components/Admin/ManageAirports";
import ManageAirplanes from "./components/Admin/ManageAirplanes";
import ManageCustomers from "./components/Admin/ManageCustomers"; // Added new component
import { AuthProvider, useAuth } from "./AuthContext";
import { PaymentProvider } from "./PaymentContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const ProtectedUserRoute = ({ children }) => {
  const { isLoggedIn, isAdmin } = useAuth();
  return isLoggedIn && !isAdmin ? children : <Navigate to="/login-register" replace />;
};

const ProtectedAdminRoute = ({ children }) => {
  const { isAdmin } = useAuth();
  return isAdmin ? children : <Navigate to="/login-register" replace />;
};

function AppContent() {
  const { isLoggedIn, isAdmin, loggedInUser, logout } = useAuth();

  return (
    <div className="app-container">
      <nav className="navbar navbar-expand-lg navbar-dark bg-coffee-dark"> 
        <div className="container">
          <Link className="navbar-brand" to="/">
            <FaPlane className="me-2" /> Namma Airlines
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              {!isAdmin && (
                <li className="nav-item">
                  <Link className="nav-link" to="/"><FaHome /> Home</Link>
                </li>
              )}
              {!isLoggedIn && (
                <li className="nav-item">
                  <Link className="nav-link" to="/login-register"><FaSignInAlt /> Login/Register</Link>
                </li>
              )}
              {isAdmin && (
                <>
                  <li className="nav-item"><Link className="nav-link" to="/admin-dashboard"><FaTools /> Admin</Link></li>
                  <li className="nav-item"><Link className="nav-link" to="/manage-flights"><FaPlaneDeparture /> Flights</Link></li>
                  <li className="nav-item"><Link className="nav-link" to="/manage-airports"><FaBuilding /> Airports</Link></li>
                  <li className="nav-item"><Link className="nav-link" to="/manage-airplanes"><FaPlane /> Airplanes</Link></li>
                  <li className="nav-item"><Link className="nav-link" to="/manage-customers">Customers</Link></li> {/* Added new link */}
                </>
              )}
            </ul>
            {isLoggedIn && (
              <button className="btn btn-outline-light" onClick={logout}>
                <FaSignOutAlt /> Logout
              </button>
            )}
          </div>
        </div>
      </nav>

      {isLoggedIn && !isAdmin && <UserNavbar />}
      
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={!isAdmin ? <Home loggedInUser={loggedInUser} /> : <Navigate to="/admin-dashboard" replace />} />
          <Route path="/results" element={<FlightResults />} />
          <Route path="/login-register" element={<LoginRegister />} />
          <Route path="/user-dashboard" element={<ProtectedUserRoute><UserDashboard /></ProtectedUserRoute>} />
          <Route path="/user-bookings" element={<ProtectedUserRoute><UserBookings /></ProtectedUserRoute>} />
          <Route path="/user-support" element={<ProtectedUserRoute><UserSupport /></ProtectedUserRoute>} />
          <Route path="/user-wallet" element={<ProtectedUserRoute><UserWallet /></ProtectedUserRoute>} />
          <Route path="/user-profile" element={<ProtectedUserRoute><UserProfile /></ProtectedUserRoute>} />
          <Route path="/admin-dashboard" element={<ProtectedAdminRoute><AdminDashboard /></ProtectedAdminRoute>} />
          <Route path="/manage-flights" element={<ProtectedAdminRoute><ManageFlights /></ProtectedAdminRoute>} />
          <Route path="/manage-airports" element={<ProtectedAdminRoute><ManageAirports /></ProtectedAdminRoute>} />
          <Route path="/manage-airplanes" element={<ProtectedAdminRoute><ManageAirplanes /></ProtectedAdminRoute>} />
          <Route path="/manage-customers" element={<ProtectedAdminRoute><ManageCustomers /></ProtectedAdminRoute>} /> {/* Added new route */}
          <Route path="*" element={<h2 className="text-coffee-dark">404 - Page Not Found</h2>} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <PaymentProvider>
        <AppContent />
      </PaymentProvider>
    </AuthProvider>
  );
}

export default App;