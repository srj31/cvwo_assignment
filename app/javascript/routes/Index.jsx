import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home/Home";
import Search from "../components/Search/Search";
import Navbar from "../components/Navbar/Navbar";

export default (
  <Router>
    <Navbar />
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/api/v1/show/:name" component={Search} />
    </Switch>
  </Router>
);
