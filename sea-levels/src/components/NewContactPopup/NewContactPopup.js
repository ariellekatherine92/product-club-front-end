import { useState, useEffect } from "react";
import app from "../../services/firebase";

const NewContactPopup = (props) => {
  const [contacts, setContacts] = useState({});
  const [contactForm, setContactForm] = useState({
    name: "",
    city: "",
    state: "",
    zipCode: "",
    userID: props.user,
  });

  const deleteContact = async () => {
    try {
      const db = app.firestore();
      await db.collection("contacts").doc(props.user).update({});
      await db.collection("contacts").doc(props.user).delete();
    } catch (error) {
      console.log(error);
    }
  };

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
    } catch (error) {
      throw Error;
    }
    // props.setToggle(!props.Toggle)
    // props.setIsOpen(!props.isOpen);
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
        <button onClick={deleteContact}>X</button>
      </form>
    </div>
  );
};

export default NewContactPopup;
