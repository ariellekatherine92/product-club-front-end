import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import app from '../../services/firebase'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { updateProfile } from 'firebase/auth';

const MAX_FILE_SIZE = 2097152;

const uploadUserAvatar = file => {
    const storage = getStorage();
    const ext = file.name.substring(file.name.lastIndexOf('.') + 1);
    const user = app.auth().currentUser;
    const avatarRef = ref(storage, `user-avatars/${user.uid}.${ext}`);

    return new Promise((resolve, reject) => {
        uploadBytes(avatarRef, file).then(({ ref }) => {
            if (!!ref) {
                getDownloadURL(ref).then(downloadURL => {
                    if (!!downloadURL) {
                        updateProfile(user, { photoURL: downloadURL }).then(() => {
                            resolve(downloadURL);
                        }).catch(error => {
                            reject(error);
                        });
                    } else {
                        reject('Uplaod failed!');
                    }
                });
            } else {
                reject('Upload failed!');
            }
        });
    });
};

const Profile = ({user}) => {
  const history = useHistory();
  const [form, setForm] = useState({
    firstName:'',
    lastName:'',
    occupants:'',
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
    await db.collection('users').doc(user).set({...form})

    history.push('/')
  }

  const onFileChange = ({ target }) => {
      if (!target.files[0]) return;

      if (target.files[0].size > MAX_FILE_SIZE) {
          console.error('File too large!');

          return;
      }

      console.log('uploading...');

      uploadUserAvatar(target.files[0]).then(photoURL => {
          const db = app.firestore();

          db.collection('users').doc(user).update({ photoURL });
          console.log(photoURL);
          console.log('done!');
      }, error => {
          console.error(error);
          console.log('done!');
      });
  };

  const currentUser = app.auth().currentUser;

  console.log(currentUser.photoURL);

  ///HYeKTTjwssbMKbw71ZmEWvtcuHr2 

  return (
    <div className = "signup-wrapper">
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="avatar-container">
          <input
            id="avatar-file"
            name="avatar-file"
            className="file-input"
            type="file"
            accept="image/*"
            onChange={onFileChange}
          />
          <label htmlFor="avatar-file">
              <div className="avatar-mask">
                  <img className="avatar" src="" alt="" />
              </div>
          </label>
        </div>

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
