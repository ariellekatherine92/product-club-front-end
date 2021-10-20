import React from "react";
import "weather-icons/css/weather-icons.css";
import { useSelector } from "react-redux";

const WeatherWidget = ({weather, town}) => {
  const location = useSelector((state) => state.location)
  console.log('WEATHER',weather);
  return (
    <div className="container text-dark">
      <h1>Weather Widget</h1>
      <h2>City: {location}</h2>
      <img src={weather.properties?.periods[0].icon} alt="" />
      <h2>Temp {weather.properties?.periods[0].temperature}</h2>
      <h2>Wind Speeds {weather.properties?.periods[0].windSpeed} {weather.properties?.periods[0].windDirection}</h2>
      <h2>{weather.properties?.periods[0].detailedForecast}</h2>
    </div>
  );
};

export default WeatherWidget;
