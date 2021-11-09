import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import app from '../../services/firebase';
import './Sos.css'

const Sos = ({ isOpen, setIsOpen, user, profile }) => {
    const [alert, setAlert] = useState({})
    const [form, setForm] = useState({
        dateTime: new Date().toLocaleString(),
        name: '',
        location: '',
        emergency: '',
        needs: '',
        email: '',
    });

    const history = useHistory();

   

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const db = app.firestore();
            await db.collection('emergencies').doc(user).set({ ...form });
        } catch(error) {
            throw Error;
        }

        setIsOpen(!isOpen);
        history.push('/emergencies');
    };


    return (
        <div className="popup-box">
            <div className="click-to-close" onClick={setIsOpen.bind(this, false)} />

            <form onSubmit={handleSubmit} className="sos-form">
                <h2>SOS</h2>
                <div className="input-wrapper">
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
                        placeholder="Emergency"
                        name="emergency"
                        value={form.emergency}
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
                        type="email"
                        placeholder="Email"
                        name="email"
                        checked={form.email}
                        onChange={handleChange}
                    />
                </div>

                <button type="submit">Submit</button>

                {/*alert ? (
                    <div>
                        {alert?.name} 
                        {alert?.location} 
                        {alert?.needs} 
                        {alert?.type} 
                        {alert?.email} 
                        <button onClick={deleteAlert}>X</button>
                    </div>
                ) : null*/}
            </form>
        </div>
    );
};

export default Sos;
