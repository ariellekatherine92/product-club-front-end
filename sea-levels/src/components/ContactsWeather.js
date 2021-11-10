import React from "react";
import axios from "axios";
import contact from "../images/ic-contact.png";
import location from "../images/ic-location.png";
import heart from "../images/ic-heart.png";
import { useEffect, useState, useMemo } from "react";
import app from "../services/firebase";
import "./ContactsWeather.css";

const ContactsWeather = (props) => {
  const [lists, setLists] = useState([]);
  const [zipWeather, setZipWeather] = useState({});

  const toggleIsOpen = () => {
    props.setIsOpen(!props.isOpen);
  };

  useEffect(() => {
    const fetchContactsList = async () => {
      const ref = await app.firestore().collection("contacts");
      ref.where("userID", "==", props.user).onSnapshot((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          console.log(doc);
          items.push({ ...doc.data(), docID: doc.id });
        });
        setLists(items);
      });
    };
    fetchContactsList();
  }, [props.user]);

  const uniqueZips = useMemo(() => {
    return lists.reduce((acc, { zipCode }) => {
      if (!acc.includes(zipCode)) {
        acc.push(zipCode);
      }
      return acc;
    }, []);
  }, [lists]);

  useEffect(() => {
    const weatherPromises = uniqueZips.map((zip) => {
      return new Promise((resolve, reject) => {
        const baseURL = "https://api.weatherapi.com/v1/current.json";
        axios
          .get(
            `${baseURL}?key=${process.env.REACT_APP_API_KEY}&q=${zip}&aqi=no`
          )
          .then(
            (resp) => {
              resolve({ ...resp?.data?.current, zip });
            },
            (error) => {
              reject(error);
            }
          );
      });
    });

    Promise.all(weatherPromises).then((resp) => {
      const weatherResps = resp.reduce((acc, { zip, ...weather }) => {
        acc[zip] = weather;

        return acc;
      }, {});

      setZipWeather(weatherResps);
    });
  }, [uniqueZips]);

  console.log(zipWeather);

  const deleteContact = async (docID) => {
    console.log(docID);
    try {
      const db = app.firestore();
      db.collection("contacts").doc(docID).delete();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="contacts-weather">
      <h3>Contacts</h3>
      {lists.map((list) => (
        <div key={list.contactID} className="contact-card">
          <div className="contact-info">
            <span>
              <div className="img-wrapper">
                <img src={contact} alt="name-tag" />
              </div>
              <span className="contact-name">{list.name}</span>
              <div className="img-wrapper">
                <img src={heart} alt="icon-tag" />
              </div>
            </span>

            <span>
              <div className="img-wrapper">
                <img src={location} alt="place-icon" />
              </div>
              <span>
                {list.city},{list.state} {list.zipCode}
              </span>
            </span>
          </div>
          <div className="weather-info">
            <div className="icon-wrapper">
              <img
                src={zipWeather[list.zipCode]?.condition.icon}
                alt={zipWeather[list.zipCode]?.condition.text}
              />
            </div>{" "}
            *
            <div className="temperature">
              <span>{Math.round(zipWeather[list.zipCode]?.temp_f).toString()}</span>
            </div>
          </div>
          <button className='contact-delete-btn' onClick={deleteContact.bind(this, list.docID)}>X</button>
        </div>
      ))}

      <button className="new-contact" onClick={toggleIsOpen}>
        Add New Contact
      </button>
    </div>
  );
};

export default ContactsWeather;
