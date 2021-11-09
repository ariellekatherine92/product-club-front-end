import { useState } from 'react'
import { storage } from '../../services/firebase'
import { useHistory } from 'react-router-dom'
import app from '../../services/firebase'


const Profile = ({user}) => {
  const history = useHistory();
  const [file, setFile] = useState(null);
  const [url, setURL] = useState('');
  const [form, setForm] = useState({
    firstName:'',
    lastName:'',
    occupants:'',
    streetNumber:'',
    streetName:'',
    town:'',
    state:'',
    zipCode:'',
    photoURL: '',
  })
  form.photoURL = url
  
  const handleFileChange = e => {
    setFile(e.target.files[0]);
  }
console.log('FILE',file?.name)

const handUpload = e => {
  e.preventDefault();
  
    const ref = storage.ref(`/${user}/${file?.name}`);
    const uploadTask = ref.put(file);
    uploadTask.on("state_changed", console.log, console.error, () => {
      ref
        .getDownloadURL()
        .then((url) => {
          setFile(null);
          setURL(url);
        });
    });

}

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
    await db.collection('users').doc(user).set({...form})

    history.push('/')
  }

  return (
    <div className = "signup-wrapper">
      <form onSubmit={handUpload}>
        <label htmlFor="photo">Photo</label>
        <input type="file" id='photo' onChange={handleFileChange}/>
        <button disabled={!file}>Upload</button>
      </form>
      <img src={url} width='300'/>
      <form className="signup-form" onSubmit={handleSubmit}>
        <label htmlFor="firstName">First Name: </label>
        <input type="text" name='firstName' id='firstName' value={form.firstName.charAt(0).toUpperCase() + form.firstName.slice(1).toLocaleLowerCase()} onChange={handleChange} required autoFocus/>
        <label htmlFor="lastName">Last Name: </label>
        <input type="text" name='lastName' id='lastName' value={form.lastName.charAt(0).toUpperCase() + form.lastName.slice(1).toLocaleLowerCase()} onChange={handleChange} required/>
        <label htmlFor="occupants">Occupants: </label>
        <input type="number" name='occupants' id='occupants' value={form.occupants} onChange={handleChange} required/>
        <label htmlFor="streetNumber">Street Number: </label>
        <input type="text" name='streetNumber' id='streetNumber' value={form.streetNumber} onChange={handleChange} required/>
        <label htmlFor="streetName">Street Name: </label>
        <input type="text" name='streetName' id='streetName' value={form.streetName} onChange={handleChange} required/>
        <label htmlFor="town">Town: </label>
        <input type="text" name='town' id='town' value={form.town} onChange={handleChange} required/>
        <label htmlFor="state">State: </label>
        <input type="text" name='state' id='state' value={form.state.toUpperCase()} onChange={handleChange} required maxLength='2'/>
        <label htmlFor="zipCode">Zip Code: </label>
        <input type="number" name='zipCode' id='zipCode' value={form.zipCode} onChange={handleChange} required maxLength="5" pattern="[0-9.]+" />
        <input type="submit" />
      </form>
    </div>
  );
};

export default Profile;
