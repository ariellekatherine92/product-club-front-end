import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import app from '../services/firebase';

import './Navbar.css';

const ProfileImage = ({ avatar }) => {
    return (
        <Link to="/profile">
            <div className="avatar-container">
                <div className="avatar-mask">
                    <img
                        className="avatar"
                        src={avatar}
                        alt="Upload Photo"
                    />
                </div>
            </div>
        </Link>
    );
};

const AuthLinks = ({ isAuthenticated, avatar }) => isAuthenticated ? (
    <>
        <li>
            <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
            <Link to="/signout">Sign Out</Link>
        </li>
        <li>
            <ProfileImage avatar={avatar} />
        </li>
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

const Navbar = ({ user, isOpen, setIsOpen, avatar }) => {
    const toggleIsOpen = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="page-nav">
            <ul>
                <li>
                    {user ? <button className="sos-btn" onClick={toggleIsOpen}>SOS Request</button> : <Link to='/signup'><button className='sos-btn'>SOS Request</button></Link>}
                </li>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/emergencies">Ongoing Emergencies</Link>
                </li>

                <AuthLinks isAuthenticated={!!user} avatar={avatar} />
            </ul>
        </nav>
    );
};

export default Navbar;
