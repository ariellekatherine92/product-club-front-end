import { useState, useEffect } from "react";
import app from "../../services/firebase";
import axios from 'axios'

const NewContactPopup = (props) => {
  const [contactForm, setContactForm] = useState({
    name: "",
    city: "",
    state: "",
    zipCode: "",
    icon: '',
    temp:'',
    alert: '',
    userID: props.user,
  });


    const getWeather = async () =>{
    
      const getCurrentWeather = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_API_KEY}&q=${contactForm.zipCode}&aqi=no`
      );
      const temp = getCurrentWeather.data.current.temp_f;
      const icon = getCurrentWeather.data.current.icon;
      
      contactForm.temp = temp
      
      
    }
    
    console.log(contactForm.temp)

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
      await getWeather(contactForm.zipCode)
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
    // props.setToggle(!props.Toggle)
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
        <button onClick={deleteContact}>X</button>
      </form>
    </div>
  );
};

export default NewContactPopup;
