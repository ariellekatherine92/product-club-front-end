import { useState, useEffect } from 'react';
import moment from 'moment';
import app from '../../services/firebase';
import './Emergencies.css';

const Emergencies = (props) => {
    const [alerts, setAlerts] = useState([]);

    useEffect(() => {
        const fetchAlerts = async () => {
            const db = app.firestore();
            await db.collection('emergencies').get().then((querySnapshot) => {
                const data = querySnapshot.docs.map((doc) => doc.data());
                setAlerts(data);
            });
        };

        fetchAlerts();
    }, [props.toggleFetch]);

    console.log('Alerts',alerts);

    return (
        <div className="emergencies-container">
            <div className="table-wrapper">
                <div className="table-header">
                    <div className="title">
                        <h3>Ongoing Emergencies</h3>
                    </div>
                    <div className="controls" />
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Contact</th>
                            <th>Location</th>
                            <th>Emergency</th>
                            <th>Needs</th>
                            <th>Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {alerts.filter(alert => alert.location === props.profile.town).map(({ dateTime, emergency, location, name, needs, avatar }, idx) => (
                            <tr key={`alert-${dateTime}-${idx}`}>
                                <td className="contact">
                                    <div>
                                      {avatar ? <img src={avatar} alt={name} width='50'/>:  <div className="avatar" /> }
                                      
                                      
                                        {name}
                                    </div>
                                </td>
                                <td><div>{location}</div></td>
                                <td><div>{emergency}</div></td>
                                <td className="multi-line">
                                    <div>
                                        <span>{needs}</span>
                                        <br/>
                                        <span className="time">{moment(dateTime).fromNow()
                                        }</span>
                                    </div>
                                </td>
                                <td className="multi-line">
                                    <div>
                                        <span className="date">{moment(dateTime).format('ll')}</span>
                                        <br/>
                                        <span className="time">{moment(dateTime).format('LT')}</span>
                                    </div>
                                </td>
                                <td><div>Active</div></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Emergencies;
