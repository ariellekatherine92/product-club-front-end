import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <div className="footer-main">
            <h1 className="title-heading">Weather Together</h1>
            <div className="contact-info">
            <p>Email: xyz@gmail.com
            Phone Number: (612) 555-0364</p>
            </div>
            <div className="about-links">
                <h3 className="about-header">About</h3>
                <ul>
                    <li>
                    <Link to="/about-us">About Us</Link>
                    </li>
                    <li>
                    <Link to="/blog">Blog</Link>
                    </li>
                    <li>
                    <Link to="/contact">Contact</Link>
                    </li>
                </ul>
                </div>
                <div className="service-links">
                <h3 className="service-header">Service</h3>
                <ul>
                    <li>
                    <Link to="/weather">Weather</Link>
                    </li>
                    <li>
                    <Link to="/emergencies">Emergencies</Link>
                    </li>
                    <li>
                    <Link to="/our-data">Our Data</Link>
                    </li>
                </ul>
            </div>
            <div className="subscribe-form">
            <form className="email-form">
                <input type="text" email="email" />
            </form>
            <button onSubmit className="subscribe-btn">
                Subscribe
            </button>
            </div>
        </div>
    )
}
