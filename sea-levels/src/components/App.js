import React, { useState, useEffect } from "react";
import { auth } from "../services/firebase";
import app from "../services/firebase";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import SignUp from "../screens/SignUp/SignUp";
import AuthProvider from "../contexts/AuthContext";
import Dashboard from "../screens/Dashboard/Dashboard";
import Login from "../screens/Login/Login";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./ForgotPassword";
import UpdateProfile from "../screens/UpdateProfile/UpdateProfile";
import Navbar from "./Navbar";
import Map from "./Map";
import Profile from "../screens/Profile/Profile";
import "../styles/app.css";
import { useSelector } from "react-redux";
import Sos from "./Sos/Sos";
import Main from "../screens/Main";
import Emergencies from "../screens/Emergencies/Emergencies";
import Blog from "./Blog";
import Contact from "./Contact";
import About_Main from "./About_Main";
import FAQ from "./FAQ";
import SignOut from "../screens/SignOut/SignOut";

function App() {
  const [weather, setWeather] = useState([]);
  const [user, setUser] = useState("");
  const [profile, setProfile] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const location = useSelector((state) => state.location);
  const [toggleFetch, setToggleFetch] = useState(false)

  //Gets user objects
  useEffect(() => {
    const fetchUsersAuth = async () => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          setUser(user.uid);
        } else {
          setUser(null);
        }
      });
    };
    fetchUsersAuth();
  }, []);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const db = app.firestore();
        const doc = await db.collection(`users`).doc(user).get();
        const userInfo = doc.data();
        setProfile(userInfo);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserData();
  }, [user]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseOne = await axios.get(
          `https://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_API_KEY}&q=${location}&aqi=no`
        );
        const weatherInfo = responseOne.data;
        setWeather(weatherInfo);
        console.log('%cWeatherInfo',"color:yellow; font-weight:bold",weatherInfo);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [location]);

  return (
    <Router>
      <AuthProvider>
        <Navbar setIsOpen={setIsOpen} isOpen={isOpen} user={user} />
        {isOpen ? (
          <Sos
            user={user}
            setIsOpen={setIsOpen}
            isOpen={isOpen}  setToggleFetch={setToggleFetch}
            profile={profile}
          />
        ) : (
          ""
        )}
        <Switch>
          <Route exact path="/" component={Main} />
          <PrivateRoute path="/update-profile" component={UpdateProfile} />
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={Login} />
          <Route path="/signout" component={SignOut} />
          <Route path="/forgot-password" component={ForgotPassword} />
          <Route path="/map" component={Map} />
          <Route path="/about-us" component={About_Main} />
          <Route path="/blog" component={Blog} />
          <Route path="/contact" component={Contact} />
          <Route path="/faq" component={FAQ} />
          <Route path="/emergencies">
            <Emergencies
              toggleFetch={toggleFetch}  user={user} profile={profile}
            />
          </Route>
          <Route path="/profile">
            <Profile user={user} profile={profile}/>
          </Route>
          <Route path="/dashboard">
            <Dashboard weather={weather} profile={profile} user={user} setIsOpen={setIsOpen} 
            isOpen={isOpen}/>
          </Route>
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
