import WeatherWidget from "../../components/WeatherWidget";
import News from '../../components/News/New'

export default function Dashboard(props) {
  return (
    <>
      <WeatherWidget weather={props.weather} town={props.town} />
      <News town={props.town}/>
    </>
  );
}
