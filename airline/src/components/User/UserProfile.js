// import React from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./UserProfile.css";
// import { useAuth } from "../../AuthContext"; // Adjusted path
// import { FaUserCircle } from "react-icons/fa";

// function UserProfile() {
//   const { loggedInUser } = useAuth();

//   if (!loggedInUser) return <div>Loading...</div>;

//   return (
//     <div className="user-profile container mt-5">
//       <h2 className="qatar-title">My Travel Profile</h2>
//       <div className="profile-card card shadow-sm p-4">
//         <div className="card-body text-center">
//           <FaUserCircle size={100} className="mb-3" style={{ color: "#6f4e37" }} />
//           <h4>{loggedInUser.name}</h4>
//           <p><strong>Email:</strong> {loggedInUser.email}</p>
//           <p><strong>Membership:</strong> Privilege Club</p>
//           <p><strong>Joined:</strong> {new Date().toLocaleDateString()}</p>
//           <button className="btn btn-coffee mt-3">Edit Profile</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default UserProfile;




import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./UserProfile.css";
import { useAuth } from "../../AuthContext"; // Adjusted path
import { FaUserCircle } from "react-icons/fa";

function UserProfile() {
  const { loggedInUser, setLoggedInUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [tempProfile, setTempProfile] = useState({
    name: loggedInUser?.name || "",
    email: loggedInUser?.email || "",
    phoneNumber: loggedInUser?.phoneNumber || "",
    dateOfBirth: loggedInUser?.dateOfBirth || "",
    gender: loggedInUser?.gender || "",
    membership: loggedInUser?.membership || "Silver", // Default to Silver if not set
  });

  if (!loggedInUser) return <div>Loading...</div>;

  const handleEditToggle = () => {
    setTempProfile({
      name: loggedInUser.name || "",
      email: loggedInUser.email || "",
      phoneNumber: loggedInUser.phoneNumber || "",
      dateOfBirth: loggedInUser.dateOfBirth || "",
      gender: loggedInUser.gender || "",
      membership: loggedInUser.membership || "Silver",
    });
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Update loggedInUser in AuthContext
    const updatedUser = { ...loggedInUser, ...tempProfile };
    setLoggedInUser(updatedUser);

    // Update users in localStorage
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = storedUsers.map((user) =>
      user.email === loggedInUser.email ? { ...user, ...tempProfile } : user
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className="user-profile container mt-5">
      <h2 className="qatar-title">My Travel Profile</h2>
      <div className="profile-card card shadow-sm p-4">
        <div className="card-body text-center">
          <FaUserCircle size={100} className="mb-3" style={{ color: "#6f4e37" }} />
          <h4>{loggedInUser.name}</h4>
          <p><strong>Email:</strong> {loggedInUser.email}</p>
          <p><strong>Phone:</strong> {loggedInUser.phoneNumber || "Not set"}</p>
          <p><strong>Date of Birth:</strong> {loggedInUser.dateOfBirth || "Not set"}</p>
          <p><strong>Gender:</strong> {loggedInUser.gender || "Not set"}</p>
          <p><strong>Membership:</strong> {loggedInUser.membership || "Silver"}</p>
          <p><strong>Joined:</strong> {new Date().toLocaleDateString()}</p>
          <button className="btn btn-coffee mt-3" onClick={handleEditToggle}>
            Edit Profile
          </button>
        </div>
      </div>

      {isEditing && (
        <div className="edit-popup">
          <div className="popup-content card shadow-sm">
            <div className="card-body">
              <h3>Edit Profile</h3>
              <div className="form-group">
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={tempProfile.name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group mt-2">
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={tempProfile.email}
                  onChange={handleChange}
                  disabled // Email is typically not editable
                />
              </div>
              <div className="form-group mt-2">
                <label>Phone Number:</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  className="form-control"
                  value={tempProfile.phoneNumber}
                  onChange={handleChange}
                  pattern="[0-9]{10}"
                  placeholder="Enter 10-digit phone number"
                />
              </div>
              <div className="form-group mt-2">
                <label>Date of Birth:</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  className="form-control"
                  value={tempProfile.dateOfBirth}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group mt-2">
                <label>Gender:</label>
                <div className="gender-options">
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value="Female"
                      checked={tempProfile.gender === "Female"}
                      onChange={handleChange}
                    /> Female
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value="Male"
                      checked={tempProfile.gender === "Male"}
                      onChange={handleChange}
                    /> Male
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value="Others"
                      checked={tempProfile.gender === "Others"}
                      onChange={handleChange}
                    /> Others
                  </label>
                </div>
              </div>
              <div className="form-group mt-2">
                <label>Membership:</label>
                <select
                  name="membership"
                  className="form-control"
                  value={tempProfile.membership}
                  onChange={handleChange}
                >
                  <option value="Silver">Silver</option>
                  <option value="Gold">Gold</option>
                </select>
              </div>
              <div className="edit-buttons mt-3">
                <button className="btn btn-coffee me-2" onClick={handleSave}>
                  Save
                </button>
                <button className="btn btn-secondary" onClick={handleCancel}>
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

export default UserProfile;