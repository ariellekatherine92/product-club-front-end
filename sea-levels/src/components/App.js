import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import Signup from "./Signup";
import AuthProvider from "../contexts/AuthContext";
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
import "../styles/app.css";

function App() {
  const [weather, setWeather] = useState([])
  const [user, setUser] = useState({});
  
  //Gets user objects
  auth.onAuthStateChanged((user) => {
    if (user) {
      setUser(user);
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseOne = await axios.get(
          `http://api.openweathermap.org/data/2.5/weather?q=Providence,usa&appid=${process.env.REACT_APP_API_KEY}`
        );
        const coordinates = responseOne.data;
        let longitude = coordinates?.coord.lon;
        let latitude = coordinates?.coord.lat;
  
        const responseTwo = await axios.get(
          `https://api.weather.gov/points/${latitude},${longitude}`
        );
        const grid = responseTwo.data.properties;
        let office = grid?.gridId;
        let gridX = grid?.gridX;
        let gridY = grid?.gridY;
        
  
        const responseThree = await axios.get(`https://api.weather.gov/gridpoints/${office}/${gridX},${gridY}/forecast`);
        const weatherData = responseThree.data;
        setWeather(weatherData);
      
      } catch(error) {
        console.log(error)
      }

    };
    fetchData();
  }, []);


  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <PrivateRoute path="/update-profile" component={UpdateProfile} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/forgot-password" component={ForgotPassword} />
          <Route path="/about" component={About} />
          <Route path="/map" component={Map} />
          <Route path="/profile">
            <Profile user={user} />
          </Route>
          <Route path="/dashboard" >
            <Dashboard weather={weather}/>
          </Route>
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
