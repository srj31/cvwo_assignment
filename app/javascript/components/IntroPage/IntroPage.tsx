import React from "react";
import "./IntroPage.css";
import IntroPic from "../../../assets/images/IntroPic.svg";

interface IntroPageProps {}

const IntroPage: React.FC<IntroPageProps> = ({}) => {
  return (
    <div className="introPage container">
      <div className="introPage__body">
        <p>
        <h1 style={{ color: "#FFE400" }}> Welcome to DoTO </h1>
          This is a CRUD application using Rails on the Backend and React as the
          Frontend Please Signup if you don't have an account or Login to use
          your own To-Do List
        </p>
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
