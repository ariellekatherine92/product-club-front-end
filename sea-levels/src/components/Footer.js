import React from 'react'
import { Link } from 'react-router-dom'
import './footer.css';

export default function Footer() {
    return (
        <div className="footer-main">
            <div className="column-wrapper">
                <div>
                    <h1>Weather Together</h1>
                    <div className="contact-info">
                        <span>Email: xyz@gmail.com </span>
                        <span>Phone Number: (612) 555-0364</span>
                    </div>
                </div>
                <div>
                    <h3>About</h3>
                    <ul className="link-list">
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
                <div>
                    <h3>Service</h3>
                    <ul className="link-list">
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
                <div>
                    <h5>Join our mailing list!</h5>
                    <form className="email-form">
                        <input type="text" email="email" />
                        <button  className="subscribe-btn">
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>
            <div className="copyright-div">
                <span>Copyright © 2021 · All Rights Reserved · Weather Together, LLC</span>
            </div>
        </div>
    )
}
