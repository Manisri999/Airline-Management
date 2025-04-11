// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../AuthContext";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./LoginRegister.css";

// function LoginRegister() {
//   const [formData, setFormData] = useState({ email: "", password: "", name: "" });
//   const [isSignUp, setIsSignUp] = useState(false);
//   const [users, setUsers] = useState(() => JSON.parse(localStorage.getItem("users")) || []);
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();
//   const { setIsLoggedIn, setIsAdmin, setLoggedInUser } = useAuth();

//   const adminCredentials = { email: "admin@gmail.com", password: "admin123" };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setMessage("");

//     if (isSignUp) {
//       if (users.some((user) => user.email === formData.email)) {
//         setMessage("User already registered! Please login.");
//         return;
//       }
//       const newUser = { ...formData, bookings: [] };
//       const updatedUsers = [...users, newUser];
//       setUsers(updatedUsers);
//       localStorage.setItem("users", JSON.stringify(updatedUsers));
//       setMessage("Registration successful! Logging you in...");
//       setTimeout(() => {
//         setIsLoggedIn(true);
//         setIsAdmin(false);
//         setLoggedInUser({ email: newUser.email, name: newUser.name, role: "user" });
//         setMessage("Logged in successfully!");
//         setTimeout(() => navigate("/"), 2000); // Redirect after 2 seconds
//       }, 1000);
//     } else {
//       if (formData.email === adminCredentials.email && formData.password === adminCredentials.password) {
//         setIsAdmin(true);
//         setIsLoggedIn(true);
//         setLoggedInUser({ email: formData.email, role: "admin" });
//         setMessage("Logged in successfully!");
//         setTimeout(() => navigate("/admin-dashboard"), 2000); // Redirect to admin dashboard
//       } else {
//         const user = users.find((user) => user.email === formData.email && user.password === formData.password);
//         if (user) {
//           setIsLoggedIn(true);
//           setIsAdmin(false);
//           setLoggedInUser({ email: user.email, name: user.name, role: "user" });
//           setMessage("Logged in successfully!");
//           setTimeout(() => navigate("/"), 2000); // Redirect to home page
//         } else {
//           setMessage("Invalid email or password.");
//         }
//       }
//     }
//   };

//   return (
//     <div className="login-register-container animate__animated animate__fadeIn">
//       <div className="login-register-box bg-coffee-light">
//         <h2 className="text-coffee-dark">{isSignUp ? "Sign Up" : "Login"}</h2>
//         {message && <p className="message-text">{message}</p>}
//         <form onSubmit={handleSubmit}>
//           {isSignUp && (
//             <div className="form-group">
//               <label className="text-coffee-dark">Name:</label>
//               <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} required />
//             </div>
//           )}
//           <div className="form-group mt-2">
//             <label className="text-coffee-dark">Email:</label>
//             <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required />
//           </div>
//           <div className="form-group mt-2">
//             <label className="text-coffee-dark">Password:</label>
//             <input type="password" name="password" className="form-control" value={formData.password} onChange={handleChange} required />
//           </div>
//           <button type="submit" className="btn btn-coffee mt-3 btn-block"> {isSignUp ? "Sign Up" : "Login"}</button>
//         </form>
//         <button className="btn btn-link mt-2 text-coffee-dark" onClick={() => setIsSignUp((prev) => !prev)}>
//           {isSignUp ? "Already have an account? Login" : "New user? Sign Up"}
//         </button>
//       </div>
//     </div>
//   );
// }
// export default LoginRegister;








import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "./LoginRegister.css";

function LoginRegister() {
  const [formData, setFormData] = useState({ 
    email: "", 
    password: "", 
    name: "",
    dateOfBirth: "",
    gender: "",
    phoneNumber: "",
    confirmPassword: ""
  });
  const [isSignUp, setIsSignUp] = useState(false);
  const [users, setUsers] = useState(() => JSON.parse(localStorage.getItem("users")) || []);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { setIsLoggedIn, setIsAdmin, setLoggedInUser } = useAuth();

  const adminCredentials = { email: "admin@gmail.com", password: "admin123" };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("");

    if (isSignUp) {
      if (users.some((user) => user.email === formData.email)) {
        setMessage("User already registered! Please login.");
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setMessage("Passwords do not match!");
        return;
      }
      const newUser = { 
        email: formData.email,
        password: formData.password,
        name: formData.name,
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender,
        phoneNumber: formData.phoneNumber,
        bookings: []
      };
      const updatedUsers = [...users, newUser];
      setUsers(updatedUsers);
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      setMessage("Registration successful! Logging you in...");
      setTimeout(() => {
        setIsLoggedIn(true);
        setIsAdmin(false);
        setLoggedInUser({ 
          email: newUser.email, 
          name: newUser.name, 
          role: "user",
          dateOfBirth: newUser.dateOfBirth,
          gender: newUser.gender,
          phoneNumber: newUser.phoneNumber
        });
        setMessage("Logged in successfully!");
        setTimeout(() => navigate("/"), 2000); // Redirect after 2 seconds
      }, 1000);
    } else {
      if (formData.email === adminCredentials.email && formData.password === adminCredentials.password) {
        setIsAdmin(true);
        setIsLoggedIn(true);
        setLoggedInUser({ email: formData.email, role: "admin" });
        setMessage("Logged in successfully!");
        setTimeout(() => navigate("/admin-dashboard"), 2000); // Redirect to admin dashboard
      } else {
        const user = users.find((user) => user.email === formData.email && user.password === formData.password);
        if (user) {
          setIsLoggedIn(true);
          setIsAdmin(false);
          setLoggedInUser({ 
            email: user.email, 
            name: user.name, 
            role: "user",
            dateOfBirth: user.dateOfBirth,
            gender: user.gender,
            phoneNumber: user.phoneNumber
          });
          setMessage("Logged in successfully!");
          setTimeout(() => navigate("/"), 2000); // Redirect to home page
        } else {
          setMessage("Invalid email or password.");
        }
      }
    }
  };

  return (
    <div className="login-register-container animate__animated animate__fadeIn">
      {isSignUp ? (
        <div className="signup-box bg-coffee-light">
          <h2 className="text-coffee-dark">Sign Up</h2>
          {message && <p className="message-text">{message}</p>}
          <form onSubmit={handleSubmit}>
            <div className="signup-grid">
              <div className="form-group">
                <label className="text-coffee-dark">Name:</label>
                <input 
                  type="text" 
                  name="name" 
                  className="form-control" 
                  value={formData.name} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              <div className="form-group">
                <label className="text-coffee-dark">Date of Birth:</label>
                <input 
                  type="date" 
                  name="dateOfBirth" 
                  className="form-control" 
                  value={formData.dateOfBirth} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              <div className="form-group gender-group">
                <label className="text-coffee-dark">Gender:</label>
                <div className="gender-options">
                  <label>
                    <input 
                      type="radio" 
                      name="gender" 
                      value="Female" 
                      checked={formData.gender === "Female"} 
                      onChange={handleChange} 
                      required 
                    /> Female
                  </label>
                  <label>
                    <input 
                      type="radio" 
                      name="gender" 
                      value="Male" 
                      checked={formData.gender === "Male"} 
                      onChange={handleChange} 
                    /> Male
                  </label>
                  <label>
                    <input 
                      type="radio" 
                      name="gender" 
                      value="Others" 
                      checked={formData.gender === "Others"} 
                      onChange={handleChange} 
                    /> Others
                  </label>
                </div>
              </div>
              <div className="form-group">
                <label className="text-coffee-dark">Phone Number:</label>
                <input 
                  type="tel" 
                  name="phoneNumber" 
                  className="form-control" 
                  value={formData.phoneNumber} 
                  onChange={handleChange} 
                  pattern="[0-9]{10}"
                  placeholder="Enter 10-digit phone number"
                  required 
                />
              </div>
              <div className="form-group">
                <label className="text-coffee-dark">Email:</label>
                <input 
                  type="email" 
                  name="email" 
                  className="form-control" 
                  value={formData.email} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              <div className="form-group">
                <label className="text-coffee-dark">Password:</label>
                <input 
                  type="password" 
                  name="password" 
                  className="form-control" 
                  value={formData.password} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              <div className="form-group">
                <label className="text-coffee-dark">Confirm Password:</label>
                <input 
                  type="password" 
                  name="confirmPassword" 
                  className="form-control" 
                  value={formData.confirmPassword} 
                  onChange={handleChange} 
                  required 
                />
              </div>
            </div>
            <button type="submit" className="btn btn-coffee mt-3 btn-block">Sign Up</button>
          </form>
          <button 
            className="btn btn-link mt-2 text-coffee-dark" 
            onClick={() => setIsSignUp(false)}
          >
            Already have an account? Login
          </button>
        </div>
      ) : (
        <div className="login-box bg-coffee-light">
          <h2 className="text-coffee-dark">Login</h2>
          {message && <p className="message-text">{message}</p>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="text-coffee-dark">Email:</label>
              <input 
                type="email" 
                name="email" 
                className="form-control" 
                value={formData.email} 
                onChange={handleChange} 
                required 
              />
            </div>
            <div className="form-group mt-2">
              <label className="text-coffee-dark">Password:</label>
              <input 
                type="password" 
                name="password" 
                className="form-control" 
                value={formData.password} 
                onChange={handleChange} 
                required 
              />
            </div>
            <button type="submit" className="btn btn-coffee mt-3 btn-block">Login</button>
          </form>
          <button 
            className="btn btn-link mt-2 text-coffee-dark" 
            onClick={() => setIsSignUp(true)}
          >
            New user? Sign Up
          </button>
        </div>
      )}
    </div>
  );
}

export default LoginRegister;