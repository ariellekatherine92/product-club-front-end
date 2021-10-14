import React from 'react'
import { Card } from 'react-bootstrap'

export default function WeatherWidget() {
    return (
        <div>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Current Weather Conditions</h2>
                    <h5 className="py-4">
                        <i className="wi wi-day-sunny display-1" />
                    </h5>
                    <h1 className="py-2">25&deg;</h1>

                    {/** show max and min temp */}
                    {minmaxTemp(24,19)}
                    <h4 className="py-3">Slow Rain</h4>
                </Card.Body>
            </Card>
        </div>
    )

    function minmaxTemp(min,max) {
        return (
            <h3>
                <span className="px-4">{min}&deg;</span>
                <span className="px-4">{max}&deg;</span>
            </h3>
        );
    }
}
