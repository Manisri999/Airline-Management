import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./UserProfile.css";
import { useAuth } from "../../AuthContext"; // Adjusted path
import { FaUserCircle } from "react-icons/fa";

function UserProfile() {
  const { loggedInUser } = useAuth();

  if (!loggedInUser) return <div>Loading...</div>;

  return (
    <div className="user-profile container mt-5">
      <h2 className="qatar-title">My Travel Profile</h2>
      <div className="profile-card card shadow-sm p-4">
        <div className="card-body text-center">
          <FaUserCircle size={100} className="mb-3" style={{ color: "#6f4e37" }} />
          <h4>{loggedInUser.name}</h4>
          <p><strong>Email:</strong> {loggedInUser.email}</p>
          <p><strong>Membership:</strong> Privilege Club</p>
          <p><strong>Joined:</strong> {new Date().toLocaleDateString()}</p>
          <button className="btn btn-coffee mt-3">Edit Profile</button>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;