import React, { useState } from "react";
import { useHistory, withRouter } from "react-router-dom";
import ErrorComp from "../ErrorComp/ErrorComp";

function Signup({handleLogin}) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPassword_confirmation] = useState("");
  const [errors, setErrors] = useState("");

  let history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    const user = {
      username: username,
      email: email,
      password: password,
      password_confirmation: password_confirmation,
    };

    const url = "/users";
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
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network respones was not ok");
      })
      .then((response) => {
        console.log(response);
        if (response.status == "created") {
          handleLogin(response);
          redirect();
        } else {
          setErrors(response.errors);
        }
      })
      .catch((error) => console.log("api signup not ok: ", error));
  };

  const redirect = () => {
    history.push("/");
  };

  return (
    <div className="signup container">
      <h1 style={{ color: "#FFE400" }}>Sign Up</h1>
      {errors && <ErrorComp errors = {errors}/>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            placeholder="Enter Username"
            className="form-control-plaintext mr-3 my-3 py-3"
            autoComplete="username"
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            placeholder="Enter Email"
            className="form-control-plaintext mr-3 my-3 py-3"
            autoComplete="email"
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="Password"
            autoComplete="new-password"
            className="form-control-plaintext mr-3 my-3 py-3"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            placeholder="Password Confirmation"
            autoComplete="new-password"
            className="form-control-plaintext mr-3 my-3 py-3"
            type="password"
            name="password_confirmation"
            value={password_confirmation}
            onChange={(e) => setPassword_confirmation(e.target.value)}
          />
        </div>
        <div
          className="signup__buttons"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <button className="btn btn-success" type="submit">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}

export default withRouter(Signup);
