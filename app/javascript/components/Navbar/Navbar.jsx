import React, { useState } from "react";
import { useHistory ,withRouter} from "react-router-dom";


function Navbar(props) {

  const [tagSearch, setTagSearch] = useState("");
  let history = useHistory();

  const handleChange =(event) => {
    setTagSearch(event.target.value)
  }

  const handleSubmit = () => {
    history.push(`/api/v1/show/${tagSearch}`)
  }

  return (
    <div className="navbar bg-light">
      <div className="navbar_Left">
        <nav className="navbar navbar-expand-lg navbar-light">
          <a className="navbar-brand" href="/">
            DoTo
          </a>
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
              <li className="nav-item active">
                <a className="nav-link" href="/">
                  Home <span className="sr-only">(current)</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Features
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Pricing
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link disabled"
                  href="#"
                  tabIndex="-1"
                  aria-disabled="true"
                >
                  Disabled
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      <div className="navbar_Right">
        <form className="form-inline my-2 my-lg-0" onSubmit={handleSubmit}>
          <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" onChange={handleChange}/>
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
