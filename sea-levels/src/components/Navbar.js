import React from "react";
import { Link } from "react-router-dom";

export default function Navbar(props) {
  return (
    <nav className="page-nav">
      <ul>
        <li>
          <button className="sos-btn" onClick={() => props.setIsOpen(!props.isOpen)}>
            SOS
          </button>
        </li>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/emergencies">Emergencies</Link>
        </li>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/signup">
            <div className="signup-btn">Signup</div>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
