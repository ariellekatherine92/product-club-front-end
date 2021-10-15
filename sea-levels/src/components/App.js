import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import { apiKey } from "../services";
import { Form } from "react-bootstrap";
import Signup from "./Signup";
import AuthProvider from "../contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
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
import axios from "axios";



function App() {
  const [weather, setWeather] = useState([]);
  const [user, setUser] = useState({});
  useEffect(() => {
    const fetchWeather = async () => {
      const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=Providence,usa&appid=${process.env.REACT_APP_API_KEY}`);
      setWeather(response);
      console.log(response);
    };
    fetchWeather();
  }, []);
  auth.onAuthStateChanged((user) => {
    if (user) {
      setUser(user);
      console.log(user);
    }
  });
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
            {" "}
            <Profile user={user} />{" "}
          </Route>
          <Route path="/dashboard">
            {" "}
            <Dashboard weather={weather} />{" "}
          </Route>
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
