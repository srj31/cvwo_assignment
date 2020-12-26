import React, { useState } from "react";
import { useHistory, withRouter, Link } from "react-router-dom";
import "./Navbar.css";

function Navbar({ handleLogout, isLoggedIn }) {
  const [tagSearch, setTagSearch] = useState("");
  let history = useHistory();

  const handleChange = (event) => {
    setTagSearch(event.target.value);
  };

  const handleSubmit = (event) => {
    history.push(`/api/v1/show/${tagSearch}`);
  };

  return (
    <div className="navbar">
      <div className="navbar_Left">
        <nav className="navbar navbar-expand-lg navbar-light">
          <Link to="/" className="navbar-brand">
            DoTO
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
              {!isLoggedIn ? (
                <span style={{display: "flex"}}>
                  <li className="nav-item">
                    <Link to="/login" className="nav-link">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/signup" className="nav-link">
                      Signup
                    </Link>
                  </li>
                </span>
              ) : (
                <li className="nav-item">
                  <Link to="/" className="nav-link" onClick={handleLogout}>
                    Logout
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </nav>
      </div>

      <div className="navbar_Right">
        <form className="form-inline my-2 my-lg-0" onSubmit={handleSubmit}>
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            onChange={handleChange}
          />
          <button
            className="btn btn-outline-success my-2 my-sm-0"
            type="submit"
          >
            Search by tag
          </button>
        </form>
      </div>
    </div>
  );
}

export default withRouter(Navbar);
