import React,{ useState, useEffect} from "react";
import { auth } from '../firebase'
import { baseURL } from "../services";
import { Form } from "react-bootstrap"
import Signup from './Signup';
import AuthProvider from "../contexts/AuthContext";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Dashboard from "./Dashboard";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./ForgotPassword";
import UpdateProfile from "./UpdateProfile";
import LandingPage from "./LandingPage";
import Navbar from "./Navbar";
import About from "./About";
import Map from "./Map";
import Profile from "./Profile";
import '../styles/app.css';
import axios from "axios";

// class weatherApp extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       city: undefined,
//       country: undefined,
//       icon: undefined,
//       main: undefined,
//       celsius: undefined,
//       temp_max: null,
//       temp_min: null,
//       description: "",
//       error: false
//     };

//     this.weatherIcon = {
//       Thunderstorm: "wi-thunderstorm",
//       Drizzle: "wi-sleet",
//       Rain: "wi-storm-showers",
//       Snow: "wi-snow",
//       Atmosphere: "wi-fog",
//       Clear: "wi-day-sunny",
//       Clouds: "wi-day-fog"
//     };
//   }

//   get_WeatherIcon(icons, rangeId) {
//     switch (true) {
//       case rangeId >= 200 && rangeId < 232:
//         this.setState({ icon: icons.Thunderstorm });
//         break;
//       case rangeId >= 300 && rangeId <= 321:
//         this.setState({ icon: icons.Drizzle });
//         break;
//       case rangeId >= 500 && rangeId <= 521:
//         this.setState({ icon: icons.Rain });
//         break;
//       case rangeId >= 600 && rangeId <= 622:
//         this.setState({ icon: icons.Snow });
//         break;
//       case rangeId >= 701 && rangeId <= 781:
//         this.setState({ icon: icons.Atmosphere });
//         break;
//       case rangeId === 800:
//         this.setState({ icon: icons.Clear });
//         break;
//       case rangeId >= 801 && rangeId <= 804:
//         this.setState({ icon: icons.Clouds });
//         break;
//       default:
//         this.setState({ icon: icons.Clouds });
//     }
//   }

//   calCelsius(temp) {
//     let cell = Math.floor(temp - 273.15);
//     return cell;
//   }

//   getWeather = async e => {
//     e.preventDefault();

//     const country = e.target.elements.country.value;
//     const city = e.target.elements.city.value;

//     if (country && city) {
//       const api_call = await fetch(
//         `http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=${API_Key}`
//       );


//       const response = await api_call.json();

//       this.setState({
//         city: `${response.name}, ${response.sys.country}`,
//         country: response.sys.country,
//         main: response.weather[0].main,
//         celsius: this.calCelsius(response.main.temp),
//         temp_max: this.calCelsius(response.main.temp_max),
//         temp_min: this.calCelsius(response.main.temp_min),
//         description: response.weather[0].description,
//         error: false
//       });

//       // seting icons
//       this.get_WeatherIcon(this.weatherIcon, response.weather[0].id);

//       console.log(response);
//     } else {
//       this.setState({
//         error: true
//       });
//     }
//   };

//   render() {
//     return (
//       <div className="App">
//         <Form loadweather={this.getWeather} error={this.state.error} />
//         <Weather
//           cityname={this.state.city}
//           weatherIcon={this.state.icon}
//           temp_celsius={this.state.celsius}
//           temp_max={this.state.temp_max}
//           temp_min={this.state.temp_min}
//           description={this.state.description}
//         />
//       </div>
//     );
//   }
// }





function App() {
const [weather, setWeather] = useState ([])
const [user, setUser] = useState({})
useEffect(() => {
 const fetchWeather = async () => {
   const response = await axios.get(baseURL)
   setWeather(response)
   console.log(response)
 } 
 fetchWeather()
}, [])
  auth.onAuthStateChanged(user => {
    if(user) {
    setUser(user)
    console.log(user)
  }
})
  return (
    <Router>
      <AuthProvider>
        <Navbar /> 
        <Switch> 
          <Route exact path ="/" component={LandingPage} />
          <PrivateRoute path="/update-profile" component={UpdateProfile} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/forgot-password" component={ForgotPassword} />
          <Route path="/about" component={About} />
          <Route path="/map" component={Map} />
          <Route path="/profile"> <Profile user={user}/> </Route>
         <Route path = "/dashboard"> <Dashboard weather={weather}/> </Route> 
        </Switch> 
      </AuthProvider>
    </Router>
  );
}

export default App;