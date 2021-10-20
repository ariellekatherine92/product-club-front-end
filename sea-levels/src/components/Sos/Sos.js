import { useState } from "react";
import { useHistory } from "react-router-dom"
import app from "../../services/firebase";
import './Sos.css'

const Sos = (props) => {
  const [form, setForm] = useState({
    name: "",
    location: "",
    needs: [],
    type: "",
    dateTime: new Date().toLocaleString(),
    active: false,
  });
  const history = useHistory()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const db = app.firestore()
      const data = await db.collection('emergencies').doc(props.user).set({...form})

    } catch(error) {
      throw Error
    }
    history.push('/emergencies')
  };

  return (
    <div className="popup-box">
      <form onSubmit={handleSubmit} className='box'>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Location"
          name="location"
          value={form.location}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Needs"
          name="needs"
          value={form.needs}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Type"
          name="type"
          value={form.type}
          onChange={handleChange}
        />
        {/* <input
          type="datetime-local"
          placeholder="Date"
          name="dateTime"
          value={dateFormate.toLocaleDateString("en-US")}
          onChange={handleChange}
        /> */}
        <label htmlFor="active"> Active</label>
        <input
          type="radio"
          placeholder="Active"
          name="active"
          id="active"
          checked={form.active}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      <button className='close-icon' onClick={() => props.setIsOpen(!props.isOpen)}>X</button>
      {props.content}
      </form>
    </div>
  );
};

export default Sos;
