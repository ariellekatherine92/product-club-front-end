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
import '../styles/app.css';

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
          <Route path= "/signup" component={Signup} />
          <Route path= "/login" component={Login} />
          <Route path= "/forgot-password" component={ForgotPassword} />
          <Route path= "/about" component={About} />
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
