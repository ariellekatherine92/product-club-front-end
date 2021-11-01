import React from "react";
import contact from "../images/ic-contact.png";
import location from "../images/ic-location.png";
import heart from "../images/ic-heart.png";
import sunny from "../images/ic-sunny.png";
import tornado from "../images/ic-tornado.png";
import fire from "../images/ic-fire.png";
import heat from "../images/ic-heat.png";
import { useEffect, useState } from "react";
import { ALERTS } from "./WeatherAlertLegend";
import app from "../services/firebase";
import axios from "axios";
import "./ContactsWeather.css";

const CONTACTS = [
  {
    name: "Joe V.",
    location: "Dallas, TX",
    weather: {
      alert: ALERTS.NORMAL.type,
      icon: sunny,
      temp: 24,
    },
  },
  {
    name: "Joe V.",
    location: "Dallas, TX",
    weather: {
      alert: ALERTS.WATCH.type,
      icon: tornado,
      temp: 24,
    },
  },
  {
    name: "Joe V.",
    location: "Dallas, TX",
    weather: {
      alert: ALERTS.WARNING.type,
      icon: fire,
      temp: 24,
    },
  },
  {
    name: "Joe V.",
    location: "Dallas, TX",
    weather: {
      alert: ALERTS.ADVISORY.type,
      icon: heat,
      temp: 24,
    },
  },
];

const ContactsWeather = (props) => {
  const [lists, setLists] = useState([]);
  const [temp, setTemp] = useState([]);
  const toggleIsOpen = () => {
    props.setIsOpen(!props.isOpen);
  };

  useEffect(() => {
    const fetchContactsList = async () => {
      const ref = await app.firestore().collection("contacts");
      ref.where("userID", "==", props.user).onSnapshot((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push(doc.data());
        });
        setLists(items);
        console.log(items);
      });
    };
    fetchContactsList();
  }, [props.user]);

  const getWeather = async () => {
    const fetchWeather = await axios.get(
      `https://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_API_KEY}&q=${lists.zipCode}&aqi=no`
    );
    const response = fetchWeather.data.current.temp_f;
  };



  return (
    <div className="contacts-weather">
      <h3>Contact</h3>
      {lists.map((list) => (
        <div /*key={`contact-card-${idx}`}*/ className="contact-card">
          <div className="contact-info">
            <span>
              <div className="img-wrapper">
                <img src={contact} />
              </div>
              <span className="contact-name">{list.name}</span>
              <div className="img-wrapper">
                <img src={heart} />
              </div>
            </span>

            <span>
              <div className="img-wrapper">
                <img src={location} />
              </div>
              <span>
                {list.city},{list.state} {list.zipCode}
              </span>
            </span>
          </div>

          {/* <div className="weather-info">
                        <div className={`alert-status ${weather.alert}`} /> */}
          {/* 
                        <div className="icon-wrapper">
                            <img src={weather.icon} />
                        </div> */}

          <div className="temperature">
            <span>{list?.temp}</span>
          </div>

          {/* </div> */}
        </div>
      ))}

      <button className="new-contact" onClick={toggleIsOpen}>
        Add New Contact
      </button>
    </div>
  );
};

export default ContactsWeather;
