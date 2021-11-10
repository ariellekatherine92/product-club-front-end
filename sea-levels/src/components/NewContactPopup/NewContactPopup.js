import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import app from '../../services/firebase';
import './NewContactPopup.css';

const NewContactPopup = ({ setIsOpen, user }) => {
  const [contactForm, setContactForm] = useState({
    name: '',
    city: '',
    state: '',
    zipCode: '',
    alert: '',
    contactID: uuidv4(),
    userID: user,
  });

  const close = () => {
    setIsOpen(false);
  };

  const handleChange = e => {
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

      await db.collection('contacts').add({ ...contactForm });

      setContactForm({
        name: '',
        city: '',
        state: '',
        zipCode: '',
        icon: '',
        temp:'',
        alert: '',
        userID:'',
      });
    } catch (error) {
      throw error;
    }

    close();
  };

  return (
    <div className="contact-modal-container">
      <div className="modal-background" onClick={close} />

      <div className="contact-modal">
        <form onSubmit={handleSubmit}>
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
            placeholder="State"
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

          <div className="button-wrapper">
            <button onClick={close}>Cancel</button>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewContactPopup;
