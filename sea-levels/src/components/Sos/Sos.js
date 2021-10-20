import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom"
import app from "../../services/firebase";
import './Sos.css'

const Sos = (props) => {
  const [alert, setAlert] = useState({})
  const [form, setForm] = useState({
    name: "",
    location: "",
    needs: [],
    type: "",
    dateTime: new Date().toLocaleString(),
    active: false,
  });
  
  const history = useHistory();

  const deleteAlert = async () => {
    try {
      const db = app.firestore()
      await db.collection('emergencies').doc(props.user).update({})
      await db.collection('emergencies').doc(props.user).delete()
  } catch (error) {
    console.log(error)
    }
  }

  useEffect(() => {
    const getOneEmergence = async () => {
      const db = app.firestore()
      const fetchOneEmergence = await db.collection('emergencies').doc(props.user).get()
      const oneEmergence = fetchOneEmergence.data();
      setAlert(oneEmergence)
    }
    getOneEmergence()
  },[props.user]);


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
      await db.collection('emergencies').doc(props.user).set({...form})

    } catch(error) {
      throw Error
    }
    props.setToggle(!props.Toggle)
    props.setIsOpen(!props.isOpen)
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
      {alert ? <div>{alert?.name} {alert?.location} {alert?.needs} {alert?.type} <button onClick={deleteAlert}>X</button></div>:''}
      
      </form>
    </div>
  );
};

export default Sos;
