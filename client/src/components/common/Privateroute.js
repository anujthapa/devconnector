import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Privateroute = ({ component: Component, auth, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        auth.isAuthenticated === true ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

Privateroute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapsStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapsStateToProps,
  {}
)(Privateroute);
