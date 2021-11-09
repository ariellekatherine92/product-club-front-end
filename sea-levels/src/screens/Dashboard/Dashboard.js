import { useState } from 'react';
import WeatherWidget from '../../components/WeatherWidget';
import ContactsWeather from '../../components/ContactsWeather';
import News from '../../components/News/New';
import WeatherAlertLegend from '../../components/WeatherAlertLegend';
import NewContactPopup from '../../components/NewContactPopup/NewContactPopup';
import './Dashboard.css';

export default function Dashboard(props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="dashboard-page">
      <section>
        <h2>{`Welcome back, ${props.profile?.firstName}!`}</h2>
        <WeatherWidget
          profile={props.profile}
          weather={props.weather}
          town={props.town}
        />
        <ContactsWeather setIsOpen={setIsOpen} isOpen={isOpen} user={props.user}/>
      </section>
      <article>
        <News />
        <WeatherAlertLegend />
      </article>
      {isOpen ? (
          <NewContactPopup
            user={props.user}
            setIsOpen={setIsOpen}
            isOpen={isOpen} 
          />
        ) : (
          ""
        )}
    </div>
  );
}
