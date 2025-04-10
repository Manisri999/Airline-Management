import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "./LoginRegister.css";

function LoginRegister() {
  const [formData, setFormData] = useState({ email: "", password: "", name: "" });
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
      const newUser = { ...formData, bookings: [] };
      const updatedUsers = [...users, newUser];
      setUsers(updatedUsers);
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      setMessage("Registration successful! Logging you in...");
      setTimeout(() => {
        setIsLoggedIn(true);
        setIsAdmin(false);
        setLoggedInUser({ email: newUser.email, name: newUser.name, role: "user" });
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
          setLoggedInUser({ email: user.email, name: user.name, role: "user" });
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
      <div className="login-register-box bg-coffee-light">
        <h2 className="text-coffee-dark">{isSignUp ? "Sign Up" : "Login"}</h2>
        {message && <p className="message-text">{message}</p>}
        <form onSubmit={handleSubmit}>
          {isSignUp && (
            <div className="form-group">
              <label className="text-coffee-dark">Name:</label>
              <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} required />
            </div>
          )}
          <div className="form-group mt-2">
            <label className="text-coffee-dark">Email:</label>
            <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group mt-2">
            <label className="text-coffee-dark">Password:</label>
            <input type="password" name="password" className="form-control" value={formData.password} onChange={handleChange} required />
          </div>
          <button type="submit" className="btn btn-coffee mt-3 btn-block"> {isSignUp ? "Sign Up" : "Login"}</button>
        </form>
        <button className="btn btn-link mt-2 text-coffee-dark" onClick={() => setIsSignUp((prev) => !prev)}>
          {isSignUp ? "Already have an account? Login" : "New user? Sign Up"}
        </button>
      </div>
    </div>
  );
}

export default LoginRegister;