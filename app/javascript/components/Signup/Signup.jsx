import React, { useState } from "react";
import { useHistory, withRouter } from "react-router-dom";

function Signup(props) {
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
    .then(response => {
        if(response.ok) {
            return response.json()
        }
        throw new Error("Network respones was not ok")
    })
    .then(response => {
        console.log(response)
        if(response.status == "created") {
            props.handleLogin(response)
            redirect()
        } else {
            setErrors(response.errors)
        }
    })
    .catch((error) => console.log("api signup not ok: " , error))
  };

  const redirect = () => {
    history.push('/')
  }

  return (
    <div className="signup">
      <h1>Sign Up</h1>
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
        <input
          placeholder="password confirmation"
          type="password"
          name="password_confirmation"
          value={password_confirmation}
          onChange={(e) => setPassword_confirmation(e.target.value)}
        />

        <button placeholder="submit" type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default withRouter(Signup);
