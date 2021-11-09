import React, { useEffect, useState }from 'react';
import { useSelector } from 'react-redux';
import { ALERTS } from "./WeatherAlertLegend";
import contact from '../images/ic-contact.png';
import location from '../images/ic-location.png';
import users from '../images/ic-users.png';
import home from '../images/ic-home.png';
import './WeatherWidget.css';
import axios from 'axios';

const WeatherWidget = ({ username, weather, ...props  }) => {
  const zip = useSelector(({ location }) => location);
  const [severity, setSeverity] = useState()

  
  useEffect(() => {
    const fetchWeatherSeverity = async () => {
      const getSeverity = await axios.get(`https://api.weather.gov/alerts/active?area=${props.profile.state}`);
      const severityResponse = getSeverity.data;
      if (!!severityResponse.features[0]?.properties?.severity){
        setSeverity(severityResponse.features[0].properties.severity)
      }
    }
    fetchWeatherSeverity()
  },[props.profile?.state])

  const warningColors = () => {
    switch(severity){
      case undefined:
        return <div className='divDisplay'><span>{ALERTS.NORMAL.label}</span> <div className="alert-status normal" /></div>
      case 'Minor':
        return <div className='divDisplay'><span>{ALERTS.WATCH.label}</span> <div className="alert-status watch" /></div>
      case 'Moderate':
        return <div className='divDisplay'><span>{ALERTS.WATCH.label}</span> <div className="alert-status watch" /></div>;
      case 'Severe':
        return <div className='divDisplay'><span>{ALERTS.WARNING.label}</span> <div className="alert-status advisory" /></div>;
      case 'Extreme':
        return <div className='divDisplay'><span>{ALERTS.ADVISORY.label}</span> <div className="alert-status advisory" /></div>;
      default:
        return
    }
  }
  return (
    <div className="weather-widget">
      <div className="user-details">
        <h5><img src={contact} alt={props.profile.firstName}/> {props.profile.firstName}</h5>

        <span>
          <div className="img-wrapper">
            <img src={location} alt={location}/>
          </div>
          <span>{`${weather.location?.name}, ${weather.location?.region} ${zip}`}</span>
        </span>

        <span>
          <div className="img-wrapper">
            <img src={users} alt={users}/>
          </div>
          <span>Occupants: {props.profile.occupants}</span>
        </span>
        
        <span>
          <div className="img-wrapper">
            <img src={home} alt={home}/>
          </div>
          <span>
            Status: <span className="safe">safe</span>
          </span>
        </span>
      </div>

      <div className="weather-details">
        <div className="conditions">
          <img className="weather-icon" src={weather?.current?.condition?.icon} alt={weather?.current?.condition?.icon}/>
          <span className="temp">{weather.current?.temp_f}</span>
        </div>

        <div>
          <span>{`Feels like ${weather.current?.feelslike_f}°`}</span>
        </div>

        <div className="uv">
          {warningColors()}
        </div>

        <button>View Full Forecast</button>
      </div>
    </div>
  );
};

export default WeatherWidget;
