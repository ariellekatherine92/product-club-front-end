import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
    return (
        <nav className="page-nav">
            <ul>
                <li>
                    <Link to="/login">Login</Link>
                </li>
                <li>
                    <div className="signup-btn">
                        <Link to="/signup">Signup</Link>
                    </div>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                </li>
            </ul>
        </nav>
    )
}
