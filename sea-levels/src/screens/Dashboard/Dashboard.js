import WeatherWidget from '../../components/WeatherWidget';
import ContactsWeather from '../../components/ContactsWeather';
import News from '../../components/News/New';
import WeatherAlertLegend from '../../components/WeatherAlertLegend';
import './Dashboard.css';

export default function Dashboard(props) {
 
  return (
    <div className="dashboard-page">
      <section>
        <h2>{`Welcome back, ${props.profile.firstName}!`}</h2>
        <WeatherWidget
          profile={props.profile}
          weather={props.weather}
          town={props.town}
        />
        <ContactsWeather />
      </section>
      <article>
        <News />
        <WeatherAlertLegend />
      </article>
    </div>
  );
}
