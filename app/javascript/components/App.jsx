import React from "react";
import Routes from "../routes/Index";
import "./App.css";
import store from "../store";
import { Provider } from "react-redux";

export default (props) => {
  return (
    <Provider store={store}>
      <div className="app">
        <Routes />
      </div>
    </Provider>
  );
};
