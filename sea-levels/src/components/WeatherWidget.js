import React from 'react'
import "weather-icons/css/weather-icons.css"


const WeatherWidget = props => {
    console.log(props.weather)
    return (
        <div className="container text-dark">
          <div className="Card">
            <h1 className="text-black py-3">{props.weather.cityname}</h1>
            <h5 className="py-4">
              <i className={`wi ${props.weatherIcon} display-1`} />
            </h5>
            
            {/* Get Celsius */}
            {props.temp_celsius ? (
              <h1 className="py-2">{props.temp_celsius}&deg;</h1>
            ) : null}
    
            {/* show max and min temp */}
            {/* {maxminTemp(props.temp_min, props.temp_max)} */}

            <span className="px-4">{props.weather.min}&deg;</span>
            <span className="px-4">({props.weather.max*9/5+32})&deg;</span>
             
    
            {/* Weather description */}
            <h4 className="py-3">
              {props.weather.description}
            </h4>
           
             </div>
        </div>
      );
    };

export default WeatherWidget;