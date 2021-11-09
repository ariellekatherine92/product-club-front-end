import { useState, useEffect } from 'react';
import moment from 'moment';
import app from '../../services/firebase';
import './Emergencies.css';

const Emergencies = (props) => {
    const [alerts, setAlerts] = useState([]);

    useEffect(() => {
        const db = app.firestore();

        const fetchAlerts = new Promise(resolve => {
            db.collection('emergencies').get().then(querySnapshot => {
                const alerts = querySnapshot.docs.map(doc => {
                    const data = doc.data();
                    const userId = doc.id;

                    return { ...data, userId };
                });

                resolve(alerts);
            });
        });

        fetchAlerts.then(alerts => {
            const alertsWithAvatars = alerts.map(alert => {
                const fetchAvatar = new Promise(resolve => {
                    db.collection('users').doc(alert.userId).get().then(userSnapshot => {
                        const userData = userSnapshot.data();
                        console.log(userData);
                        resolve(userData.photoURL);
                    });
                });

                return fetchAvatar.then(photoURL => {
                    console.log(photoURL);
                    return { ...alert, photoURL };
                });
            });


            Promise.all(alertsWithAvatars).then(alerts => {
                setAlerts(alerts);
            });
        });
    }, [props.toggleFetch]);

    console.log(alerts);

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
                        {alerts.map(({ photoURL, dateTime, emergency, location, name, needs }, idx) => {
                            console.log(photoURL);
                            return (
                                <tr key={`alert-${dateTime}-${idx}`}>
                                    <td className="contact">
                                        <div>
                                            <div 
                                                className="avatar" 
                                                style={{ 
                                                    backgroundImage : !!photoURL ? `url('${photoURL}')` : undefined,
                                                }}
                                            />
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
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Emergencies;
