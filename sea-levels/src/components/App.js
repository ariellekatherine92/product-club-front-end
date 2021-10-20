import React, { useState, useEffect } from "react";
import { auth } from "../services/firebase";
import app from "../services/firebase";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import Signup from "../screens/SignUp/Signup";
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
console.log(process.env.REACT_APP_API_KEY)

function App() {
  const [weather, setWeather] = useState([]);
  const [user, setUser] = useState("");
  const [town, setTown] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [toggleFetch, setToggleFetch] = useState(false);
  const location = useSelector((state) => state.location);

 //Gets user objects
  auth.onAuthStateChanged((user) => {
    if (user) {
      setUser(user.uid);
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const db = app.firestore();
        // const doc = await db.collection(`users`).doc(user).get();
        // const userInfo = doc.data();
        // const town = userInfo.town;
        // setTown(town);

        // console.log("Town", town);

        const responseOne = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_API_KEY}&q=${location}&aqi=no`
        );
        console.log('key',process.env.REACT_APP_WEATHER_API_KEY)
        const weatherInfo = responseOne.data;
        console.log(weatherInfo)
        
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [location, user]);

  return (
    <Router>
      <AuthProvider>
        <Navbar setIsOpen={setIsOpen} isOpen={isOpen} />
        {isOpen ? (
          <Sos user={user} setIsOpen={setIsOpen} isOpen={isOpen} toggle={toggleFetch} setToggle={setToggleFetch}/>
        ) : (
          ""
        )}
        <Switch>
          <Route exact path="/" component={Main} />
          <PrivateRoute path="/update-profile" component={UpdateProfile} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/forgot-password" component={ForgotPassword} />
          <Route path="/map" component={Map} />
          <Route path="/emergencies">
            <Emergencies toggle={toggleFetch} setToggle={setToggleFetch} user={user} />
          </Route>
          <Route path="/profile">
            <Profile user={user} />
          </Route>
          <Route path="/dashboard">
            <Dashboard weather={weather} town={town} />
          </Route>
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
