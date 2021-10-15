import React, { useRef, useState } from "react"
import { Card } from 'react-bootstrap'

export default function WeatherWidget() {

    const [temperature, setTemperature] = useState(32)
    const API_Key = '58944c43fae9ee14a34e9ff2936275eb';
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=${API_Key}`)
    .then(response => response.json())
    .then((data) => {
        console.log(data);

        //more state sets for all the nice data
        setTemperature(data.main.temp_min)
    });

    return (
        <div>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Current Weather Conditions</h2>
                    <h5 className="py-4">
                        <i className="wi wi-day-sunny display-1" />
                    </h5>
                    <h1 className="py-2">25&deg;</h1>
                    {temperature}
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