import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import app from '../services/firebase';
import defaultAvatar from '../images/default-avatar.png';
import './Navbar.css';

const ProfileImage = () => {
    const user = app.auth().currentUser;

    const avatar = useMemo(() => {
        if (!!user?.photoURL) {
            return user.photoURL;
        } else {
            return defaultAvatar;
        }
    }, [user]);

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

const AuthLinks = ({ isAuthenticated }) => isAuthenticated ? (
    <>
        <li>
            <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
            <Link to="/signout">Sign Out</Link>
        </li>
        <li>
            <ProfileImage />
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

const Navbar = ({ user, isOpen, setIsOpen }) => {
    const toggleIsOpen = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="page-nav">
            <ul>
                <li>
                    {user ? <button className="sos-btn" onClick={toggleIsOpen}>SOS</button> : <Link to='/signup'><button className='sos-btn'>SOS</button></Link>}
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
