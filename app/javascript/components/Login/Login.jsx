import React, { useState } from "react";
import { Link, useHistory, withRouter } from "react-router-dom";

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
    .then(response => {
        console.log(response)
        if(response.ok) {
            return response.json();
        }
        throw new Error("Network response was not ok")
    })
    .then(response => {
        console.log(response)
        if(response.logged_in) {
            redirect()
            props.handleLogin(response)
        } else {
            setErrors(
                response.errors
            )
        }

    }).catch((error) => console.log("login was not done correctly ",error))
  };

  const redirect = () => {
      history.push('/')
  }

  return (
    <div className="login">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="username"
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          placeholder="email"
          type="text"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="password"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button placeholder="submit" type="submit">
          Log In
        </button>
        <div>
          or <Link to="/signup">sign up</Link>
        </div>
      </form>
    </div>
  );
}

export default withRouter(Login);
