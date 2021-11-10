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
          console.log(doc)
          items.push({...doc.data(),docID: doc.id});
        });
        setLists(items);
      
      });
    };
    fetchContactsList();
  }, [props.user]);

  const deleteContact = async (docID) => {
    console.log(docID)
    try {
      const db = app.firestore();
      db.collection('contacts').doc(docID).delete()
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
          <button onClick={deleteContact.bind(this,list.docID)}>Delete</button>
        </div>
      ))}

      <button className="new-contact" onClick={toggleIsOpen}>
        Add New Contact
      </button>
    </div>
  );
};

export default ContactsWeather;
