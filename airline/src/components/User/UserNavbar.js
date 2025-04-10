


import React from "react";
import { Link } from "react-router-dom";
import { FaTachometerAlt, FaBook, FaHeadset, FaWallet, FaUser } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./UserNavbar.css";

function UserNavbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-coffee-dark mb-4"> {/* Changed to navbar-dark and bg-coffee-dark */}
      <div className="container">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/user-dashboard"><FaTachometerAlt /> Dashboard</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/user-bookings"><FaBook /> Bookings</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/user-support"><FaHeadset /> Support</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/user-wallet"><FaWallet /> Wallet</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/user-profile"><FaUser /> Profile</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default UserNavbar;
