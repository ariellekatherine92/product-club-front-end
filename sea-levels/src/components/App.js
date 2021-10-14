import React,{ useState } from "react";
import { auth } from '../firebase'
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
import WeatherWidget from "./WeatherWidget";
import '../styles/app.css';
import "weather-icons/css/weather-icons.css"

//api call api.openweathermap.org/data/2.5/weather?q=London,uk&appid={API key}
const API_key = '58944c43fae9ee14a34e9ff2936275eb'

function App() {
const [user, setUser] = useState({})
  auth.onAuthStateChanged(user => {
    if(user) {
    setUser(user.uid)
  }
})
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Switch>
          <Route exact path ="/" component={LandingPage} />
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <PrivateRoute path="/update-profile" component={UpdateProfile} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/forgot-password" component={ForgotPassword} />
          <Route path="/about" component={About} />
          <Route path="/map" component={Map} />
          <Route path="/weather-widget" component={WeatherWidget} />
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
