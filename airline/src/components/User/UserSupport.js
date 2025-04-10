import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./UserSupport.css";

function UserSupport() {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = () => {
    setStatus("Your request has been submitted to our crew!");
    setMessage("");
  };

  return (
    <div className="user-support container mt-5">
      <h2 className="qatar-title">Contact Our Crew</h2>
      <div className="support-form card shadow-sm">
        <div className="card-body">
          <textarea
            className="form-control mb-3"
            rows="5"
            placeholder="How may we assist you today?"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className="btn qatar-btn" onClick={handleSubmit}>
            Send Request
          </button>
          {status && <div className="support-status mt-3 text-success">{status}</div>}
        </div>
      </div>
    </div>
  );
}

export default UserSupport;
