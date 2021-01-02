import React, { useState, MouseEventHandler } from "react";
import { useHistory, withRouter, Link, NavLink, RouteComponentProps } from "react-router-dom";
import "./Navbar.css";



interface NavbarProps extends RouteComponentProps<any> {
  handleLogout: MouseEventHandler;
  isLoggedIn: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ handleLogout, isLoggedIn }) => {
  const [tagSearch, setTagSearch] = useState("");
  let history = useHistory();

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    setTagSearch(event.currentTarget.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
                <NavLink exact to="/" className="nav-link" activeClassName="active">
                  Home
                </NavLink>
              </li>
              {!isLoggedIn ? (
                <React.Fragment>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link" activeClassName="active">
                      Login
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/signup" className="nav-link" activeClassName = "active">
                      Signup
                    </NavLink>
                  </li>
                </React.Fragment>
              ) : (
                <>
                <li className="nav-item">
                  <NavLink to="/calendar" className="nav-link" activeClassName="active">
                    Calendar
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/" className="nav-link" onClick={handleLogout} activeClassName="active">
                    Logout
                  </NavLink>
                </li>

                </>
              )}
            </ul>
          </div>
        </nav>
      </div>

      {isLoggedIn && (<div className="navbar_Right">
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
      </div>)}
    </div>
  );
}

export default withRouter(Navbar);
