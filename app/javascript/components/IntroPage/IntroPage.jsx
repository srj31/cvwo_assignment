import React from "react";
import "./IntroPage.css";
import IntroPic from "../../../assets/images/IntroPic.svg"


const IntroPage = () => {
  return (
    <div className="introPage container">
      {console.log(IntroPic)}
      <div className="introPage__body">
        <div className="introPage__body__left">
        <h1 style={{ color: "#FFE400" }}> Welcome to DoTO </h1>
          This is a CRUD application using Rails on the Backend and React as the
          Frontend Please Signup if you don't have an account or Login to use
          your own To-Do List
        </div>
        <img
          src={IntroPic}
          className="img-fluid move_animation "
          alt="this me"
        />
      </div>
    </div>
  );
};

export default IntroPage;
