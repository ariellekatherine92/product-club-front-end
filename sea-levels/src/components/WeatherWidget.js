import React from 'react';
import { useSelector } from 'react-redux';
import contact from '../images/ic-contact.png';
import location from '../images/ic-location.png';
import users from '../images/ic-users.png';
import home from '../images/ic-home.png';
import uv from '../images/ic-uv.png';
import './WeatherWidget.css';

const WeatherWidget = ({ username, weather, ...props  }) => {
  const zip = useSelector(({ location }) => location);

  return (
    <div className="weather-widget">
      <div className="user-details">
        <h5><img src={contact} /> {username}</h5>

        <span>
          <div className="img-wrapper">
            <img src={location} />
          </div>
          <span>{`${weather.location?.name}, ${weather.location?.region} ${zip}`}</span>
        </span>

        <span>
          <div className="img-wrapper">
            <img src={users} />
          </div>
          <span>Occupants: 5</span>
        </span>
        
        <span>
          <div className="img-wrapper">
            <img src={home} />
          </div>
          <span>
            Status: <span className="safe">safe</span>
          </span>
        </span>
      </div>

      <div className="weather-details">
        <div className="conditions">
          <img className="weather-icon" src={weather?.current?.condition?.icon} />
          <span className="temp">{weather.current?.temp_f}</span>
        </div>

        <div>
          <span>{`Feels like ${weather.current?.feelslike_f}°`}</span>
        </div>

        <div className="uv">
          <img src={uv} />
          <span>{`${weather.current?.uv * 100}%`}</span>
        </div>

        <button>View Full Forecast</button>
      </div>
    </div>
  );
};

export default WeatherWidget;
