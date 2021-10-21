import React from "react";
import { Link } from "react-router-dom";
import './Navbar.css'

export default function Navbar(props) {
  const unauthenticated = (
    <>
      <Link to="/signup">
        <div className="signup-btn">Signup</div>
      </Link>

      <Link to="/login">Login</Link>
    </>
  );

  const authenticated = (
    <>
      <Link className='link' to="/dashboard">Dashboard</Link>

      <Link  to="/signout">Sign Out</Link>

      {/* <li className="nav-user-name">{props.client?.name}</li> */}
    </>
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
        <li>{props.user ? authenticated : unauthenticated}</li>
      </ul>
    </nav>
  );
}
