import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';
import Home from "../components/Home/Home";
import Search from "../components/Search/Search";
import Navbar from "../components/Navbar/Navbar.tsx";
import Login from "../components/Login/Login.tsx";
import Signup from "../components/Signup/Signup.tsx";
import CalendarComp from "../components/CalendarComp/CalendarComp";

function Index() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    loginStatus();
  }, []);

  const handleLogin = (data) => {
    setIsLoggedIn(true);
    setUser(data.user);
  };

  const handleLogout = () => {
    const url = "/logout";
    if (isLoggedIn) {
      setIsLoggedIn(false);
      setUser({});
    }
    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch(url, {
      method: "POST",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log(response);
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok");
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log("Logout was not done correctly ", error));
  };

  const loginStatus = () => {
    const url = "/logged_in";

    fetch(url, {
      credentials: "include",
    })
      .then((response) => {
        console.log(response);
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network Response was not ok");
      })
      .then((response) => {
        console.log(response);
        if (response.logged_in) {
          handleLogin(response);
        }
      })
      .catch((error) => console.log("login/logout api errors:", error));
  };

  return (
    <Router>
      <Navbar handleLogout={handleLogout} isLoggedIn={isLoggedIn} />
      <Route render={({location}) => (
        <TransitionGroup>
          <CSSTransition
            key={location.key}
            timeout={300}
            classNames="fade"
          >
            <Switch location={location}>
              <Route
                path="/"
                exact
                render={(props) => <Home {...props} isLoggedIn={isLoggedIn} user={user}/>}
              />
              <Route
                exact
                path="/login"
                render={(props) => <Login {...props} handleLogin={handleLogin} />}
              />
              <Route
                exact
                path="/signup"
                render={(props) => <Signup {...props} handleLogin={handleLogin} />}
              />
              <Route exact path="/api/v1/show/:name" component={Search} />
              <Route
                path="/calendar"
                exact
                render={(props) => <CalendarComp {...props} isLoggedIn={isLoggedIn} user={user}/>}
              />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      )}/>
      
    </Router>
  );
}

export default Index;
