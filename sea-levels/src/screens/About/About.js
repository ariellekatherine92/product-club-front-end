import React from 'react'
import { Link } from 'react-router-dom'

export default function About() {
    return (
        <div className="mission-statement">
            <h1>What we do</h1>

            <div className="description-container">
                <div className="description-item">
                    <div className="image-wrapper display" />
                    <p>To display accurate, easy-to-digest weather forecasts across the country.</p>
                </div>

                <div className="description-item">
                    <div className="image-wrapper anticipate" />
                    <p>To anticipate disastrous weather events and give adequate preparation time.</p>
                </div>

                <div className="description-item">
                    <div className="image-wrapper provide" />
                    <p>To provide a resource for community-based coordination, especially during times of crisis.</p>
                </div>
            </div>

            <div className="btn-wrapper">
            <Link to="/about-us">
                <button>Learn More</button> 
            </Link>
            </div>
        </div>
        
    )
}
