import React, { useEffect, useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import WeatherWidget from '../../components/WeatherWidget';
import ContactsWeather from '../../components/ContactsWeather';
import News from '../../components/News/New';
import './Dashboard.css';

export default function Dashboard(props) {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const auth = firebase.auth();
    setUsername(auth?.currentUser?.email);
  }, []);

  return (
    <div className="dashboard-page">
      <section>
        <h2>{`Welcome back, ${username}!`}</h2>
        <WeatherWidget
          username={username}
          weather={props.weather}
          town={props.town}
        />
        <ContactsWeather />
      </section>
      <article>
        <News town={props.town} />
      </article>
    </div>
  );
}
