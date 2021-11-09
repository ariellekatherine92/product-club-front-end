import { useState } from "react";
import {v4 as uuidv4 } from 'uuid'
import app from "../../services/firebase";

const NewContactPopup = (props) => {
  const [contactForm, setContactForm] = useState({
    name: "",
    city: "",
    state: "",
    zipCode: "",
    alert: '',
    contactID: uuidv4(),
    userID: props.user,
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactForm({
      ...contactForm,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const db = app.firestore();
      await db.collection("contacts").add({ ...contactForm });
      setContactForm({
      name: "",
      city: "",
      state: "",
      zipCode: "",
      icon: '',
      temp:'',
      alert: '',
      userID:'',
      })
    } catch (error) {
      throw Error;
    }
    props.setIsOpen(!props.isOpen);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="box">
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={contactForm.name}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="City"
          name="city"
          value={contactForm.city}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="State...example RI"
          name="state"
          value={contactForm.state}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Zip Code"
          name="zipCode"
          value={contactForm.zipCode}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
        <button
          className="close-icon"
          onClick={() => props.setIsOpen(!props.isOpen)}
        >
          X
        </button>
        {props.content}
      </form>
    </div>
  );
};

export default NewContactPopup;
