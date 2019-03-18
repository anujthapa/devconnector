import React, { Component } from "react";
import { Link } from "react-router-dom";
import propTypes from "prop-types";
import { connect } from "react-redux";
import { logOutUser } from "../../action/authAction";
import { clearCurrentProfile } from "../../action/profileAction";

class Navbar extends Component {
  onLogoutCLick = () => {
    this.props.clearCurrentProfile();
    this.props.logOutUser();
  };
  render() {
    const { isAuthenticated, user } = this.props.auth;
    const authLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Sign Up
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
      </ul>
    );
    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <a href="#" onClick={() => this.onLogoutCLick()} className="navlink">
            <img
              className="rounded-circle"
              src={user.avatar}
              style={{ width: "2.5rem", marginRight: "1rem" }}
              alt="userimage"
              title="Yo must have a gravater connected to your email to display email"
            />
            LOGOUT
          </a>
        </li>
      </ul>
    );
    return (
      <div>
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
          <div className="container">
            <Link className="navbar-brand" to="/">
              DevConnector
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#mobile-nav"
            >
              <span className="navbar-toggler-icon" />
            </button>

            <div className="collapse navbar-collapse" id="mobile-nav">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/profiles">
                    Developers
                  </Link>
                </li>
              </ul>
              {isAuthenticated ? guestLinks : authLinks}
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
Navbar.propTypes = {
  logOutUser: propTypes.func.isRequired,
  auth: propTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logOutUser, clearCurrentProfile }
)(Navbar);
