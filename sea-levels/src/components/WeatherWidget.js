import React from "react";
import "weather-icons/css/weather-icons.css";
import { useSelector } from "react-redux";
import coolicon from '../images/coolicon.png'
import './WeatherWidget.css'

const WeatherWidget = ({weather}) => {
  const location = useSelector((state) => state.location)
  // console.log(location)
  return (
    <div className="container">
      <h1 className="weather-name">Mary S.</h1>
      <img src={coolicon} alt="cool icon" />
      <p>{weather.location?.name}, {weather.location?.region} {location}</p>
      <p>{weather.current?.temp_f}</p>
      <p>Feels like {weather.current?.feelslike_f}</p>
      <p>uv {weather.current?.uv}</p>
    </div>
  );
};

export default WeatherWidget;
