import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar(props) {
  const unauthenticated = (
    <div className='unauth-links'>
      <Link to="/signup">
        <div className="signup-btn">Signup</div>
      </Link>
      <Link to="/login">Login</Link>
    </div>
  );

  const authenticated = (
    <div className='auth-links'>
      <Link to="/dashboard">Dashboard</Link>

      <Link to="/signout">Sign Out</Link>

      {/* <li className="nav-user-name">{props.client?.name}</li> */}
    </div>
  );

  return (
    <nav className="page-nav">
      <ul>
        <li>
          <button
            className="sos-btn"
            onClick={() => props.setIsOpen(!props.isOpen)}
          >
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
          {props.user ? authenticated : unauthenticated}
        </li>
      </ul>
    </nav>
  );
}
