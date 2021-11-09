import React from "react";
import contact from "../images/ic-contact.png";
import location from "../images/ic-location.png";
import heart from "../images/ic-heart.png";
import { useEffect, useState } from "react";
import app from "../services/firebase";
import "./ContactsWeather.css";



const ContactsWeather = (props) => {
  const [lists, setLists] = useState([]);
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
console.log(lists)
  return (
    <div className="contacts-weather">
      <h3>Contact</h3>
      {lists.map((list) => (
        <div key={list.name} className="contact-card">
          <div className="contact-info">
            <span>
              <div className="img-wrapper">
                <img src={contact} alt='name-tag'/>
              </div>
              <span className="contact-name">{list.name}</span>
              <div className="img-wrapper">
                <img src={heart} alt='icon-tag'/>
              </div>
            </span>

            <span>
              <div className="img-wrapper">
                <img src={location} alt='place-icon'/>
              </div>
              <span>
                {list.city},{list.state} {list.zipCode}
              </span>
            </span>
          </div>
        </div>
      ))}

      <button className="new-contact" onClick={toggleIsOpen}>
        Add New Contact
      </button>
    </div>
  );
};

export default ContactsWeather;
