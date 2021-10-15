import React from "react";
import "weather-icons/css/weather-icons.css";

const WeatherWidget = ({weather}) => {
  console.log('WEATHER',weather);
  return (
    <div className="container text-dark">
      <h1>Weather</h1>
      <img src={weather.properties?.periods[0].icon} alt="" />
      <h2>Temp {weather.properties?.periods[0].temperature}</h2>
      <h2>Wind Speeds {weather.properties?.periods[0].windSpeed} {weather.properties?.periods[0].windDirection}</h2>
      <h2>{weather.properties?.periods[0].detailedForecast}</h2>
      {/* <div className="Card"> */}
        {/* <h1 className="text-black py-3">{weather.cityname}</h1> */}
        {/* <h5 className="py-4"> */}
          {/* <i className={`wi ${weather.icon} display-1`} />
        </h5> */}

        {/* Get Celsius */}
        {/* {weather.temp_celsius ? ( */}
          {/* // <h1 className="py-2">{weather.temp_celsius}&deg;</h1> */}
        {/* // ) : null} */}

        {/* show max and min temp */}
        {/* {maxminTemp(props.temp_min, props.temp_max)} */}

        {/* <span className="px-4">{weather.data?.coord.lon}&deg;</span> */}
        {/* <span className="px-4">
        {(weather.data.main.temp_max*1.8000)+32}&deg;
        </span> */}

        {/* Weather description */}
        {/* <h4 className="py-3">{weather.description}</h4> */}
      {/* </div> */}
    </div>
  );
};

export default WeatherWidget;
