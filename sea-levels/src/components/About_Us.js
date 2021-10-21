import React from 'react'
import './About_Us.css';


export default function About_Us() {
    return (
        <section className="landing-page about-us">
            <div className="bg-image" />
            <div className="content">
                <div className="wrapper">
                    <h1 className="about-heading">About us</h1>
                    <h2 className="sub-heading">We want you to feel safe.</h2>
                    <h3>Frost in Texas, floods in New York, flames in California.</h3>
                    <div className="about-content">
                        <p>
                            We’re at a point in time where the effects of climate change are impossible to ignore. 
                            Weather patterns are becoming more erratic and people are finding themselves in 
                            disastrous weather conditions like they’ve never seen before.
                        </p>
                        <p>
                            While hope is not lost on the reversal of global warming, 
                            these changes will take time to take effect. In the here and now, 
                            we all must learn how to build community, prepare how we can, and protect 
                            ourselves and our neighbors.
                        </p>
                    </div>
                    <h2>This is the vision of Weather Together!</h2>
                </div>
            </div>
        </section>
     
    )
}
