import React, { useState } from "react";
import { Link, useHistory, withRouter } from "react-router-dom";
import "./Login.css";
import ErrorComp from "../ErrorComp/ErrorComp";

function Login(props) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");
  let history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      username: username,
      email: email,
      password: password,
    };

    const url = "/login";
    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch(url, {
      method: "POST",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
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
        if (response.logged_in) {
          redirect();
          props.handleLogin(response);
        } else {
          console.log(response.errors);
          setErrors(response.errors);
        }
      })
      .catch((error) => console.log("login was not done correctly ", error));
  };

  const redirect = () => {
    history.push("/");
  };

  return (
    <div className="login container">
      {errors && <ErrorComp errors={errors}/>}
      <h1 style={{ color: "#FFE400" }}>Log In</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            placeholder="Username"
            className="form-control-plaintext mr-3 my-3 py-3"
            autoComplete="username"
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            placeholder="Email"
            className="form-control-plaintext mr-3 my-3 py-3"
            autoComplete="email"
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="Password"
            className="form-control-plaintext mr-3 my-3 py-3"
            autoComplete="current-password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="login__buttons">
          <button className="btn btn-success" type="submit" style={{marginBottom:20}}>
            Log In
          </button>
          <span style={{ color: "#ffffff", textAlign:"center"}}>OR</span>
          <Link to="/signup" className="btn btn-danger" style={{marginTop:20}}>
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
}

export default withRouter(Login);
