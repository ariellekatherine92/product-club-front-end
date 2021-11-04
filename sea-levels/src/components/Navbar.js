import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const AuthLinks = ({ isAuthenticated }) =>
  isAuthenticated ? (
    <>
      <li>
        <Link to="/dashboard">Dashboard</Link>
      </li>
      <li>
        <Link to="/signout">Sign Out</Link>
      </li>
      {/* <li className="nav-user-name">{props.client?.name}</li> */}
    </>
  ) : (
    <>
      <li>
        <Link to="/login">Login</Link>
      </li>
      <li>
        <Link to="/signup">
          <button className="signup-btn">Signup</button>
        </Link>
      </li>
    </>
  );

const Navbar = ({ user, isOpen, setIsOpen }) => {
  const toggleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="page-nav">
      <ul>
        <li>
          {user ? (
            <button className="sos-btn" onClick={toggleIsOpen}>
              SOS
            </button>
          ) : (
            <Link to="/signup">
              <button className="sos-btn">SOS</button>
            </Link>
          )}
        </li>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/emergencies">Emergencies</Link>
        </li>

        <AuthLinks isAuthenticated={!!user} />
      </ul>
    </nav>
  );
};

export default Navbar;
