import React, { Component } from "react";
import propTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../action/authAction";
import TextFieldGroup from "../common/TextFieldGroup";
import { log } from "util";

class Login extends Component {
  state = {
    email: "",
    password: "",
    errors: {}
  };
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
      console.log(nextProps);
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  changeHandaler = e => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    this.setState({ [name]: value });
  };

  submitHandaler = e => {
    e.preventDefault();
    const newLoginData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(newLoginData);
  };

  render() {
    const { errors } = this.state;
    return (
      <div>
        <div className="login">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Log In</h1>
                <p className="lead text-center">
                  Sign in to your DevConnector account
                </p>
                <form noValidate onSubmit={this.submitHandaler}>
                  <TextFieldGroup
                    palceholder="Please enter Email "
                    name="email"
                    type="email"
                    value={this.state.email}
                    onChange={this.changeHandaler}
                    error={errors.email}
                  />

                  <TextFieldGroup
                    palceholder="Please enter Password "
                    name="password"
                    type="password"
                    value={this.state.password}
                    onChange={this.changeHandaler}
                    error={errors.password}
                  />

                  <input
                    type="submit"
                    className="btn btn-info btn-block mt-4"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
loginUser.propTypes = {
  loginUser: propTypes.func.isRequired,
  auth: propTypes.object.isRequired,
  errors: propTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
