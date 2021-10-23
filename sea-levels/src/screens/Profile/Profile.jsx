import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import app from '../../services/firebase'


const Profile = ({user}) => {
  const history = useHistory();
  const [form, setForm] = useState({
    firstName:'',
    lastName:'',
    streetNumber:'',
    streetName:'',
    town:'',
    state:'',
    zipCode:''
  })

  const handleChange = (e) => {
    const {name, value} = e.target;
    setForm({
      ...form,
      [name]: value
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const db = app.firestore()
    await db.collection('users').doc(user.uid).set({...form})

    history.push('/')
  }

  return (
    <div className = "signup-wrapper">
      <form className="signup-form" onSubmit={handleSubmit}>
        <label htmlFor="firstName">First Name: </label>
        <input type="text" name='firstName' id='firstName' value={form.firstName} onChange={handleChange}/>
        <label htmlFor="lastName">Last Name: </label>
        <input type="text" name='lastName' id='lastName' value={form.lastName} onChange={handleChange}/>
        <label htmlFor="streetNumber">Street Number: </label>
        <input type="text" name='streetNumber' id='streetNumber' value={form.streetNumber} onChange={handleChange}/>
        <label htmlFor="streetName">Street Name: </label>
        <input type="text" name='streetName' id='streetName' value={form.streetName} onChange={handleChange}/>
        <label htmlFor="town">Town: </label>
        <input type="text" name='town' id='town' value={form.town} onChange={handleChange}/>
        <label htmlFor="state">State: </label>
        <input type="text" name='state' id='state' value={form.state} onChange={handleChange}/>
        <label htmlFor="zipCode">Zip Code: </label>
        <input type="text" name='zipCode' id='zipCode' value={form.zipCode} onChange={handleChange}/>
        <input type="submit" />
      </form>
    </div>
  );
};

export default Profile;
