import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
    return (
        <nav className="page-nav">
            <ul>
                <li>
                <Link to="SOS">
                    <div className="sos-btn">
                        SOS
                    </div>
                </Link>
                </li>
                <li>
                <Link to="/">Home</Link>
                </li>
                <li>
                <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>
                    <Link to="/login">Login</Link>
                </li>
                <li>
                    <Link to="/signup">
                        <div className="signup-btn">
                            Signup
                        </div>
                    </Link>
                </li>
            </ul>
        </nav>
    )

}
