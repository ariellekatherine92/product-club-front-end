import WeatherWidget from "../../components/WeatherWidget";

export default function Dashboard(props) {
  return (
    <>
      <WeatherWidget weather={props.weather} town={props.town} />
    </>
  );
}
