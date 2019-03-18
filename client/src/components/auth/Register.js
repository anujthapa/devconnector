import React, { Component } from "react";
import propTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../../action/authAction";
import TextFieldGroup from "../common/TextFieldGroup";

class Register extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    password2: "",
    errors: {}
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  valueHandaler = e => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    this.setState({ [name]: value });
  };

  submitHandaler = e => {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
    this.props.registerUser(newUser, this.props.history);
  };
  render() {
    const { errors } = this.state;
    return (
      <div>
        <div className="register">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Sign Up</h1>
                <p className="lead text-center">
                  Create your DevConnector account
                </p>
                <form onSubmit={this.submitHandaler}>
                  <TextFieldGroup
                    palceholder="Please enter name "
                    name="name"
                    type="name"
                    value={this.state.name}
                    onChange={this.valueHandaler}
                    error={errors.name}
                  />

                  <TextFieldGroup
                    palceholder="Please enter email "
                    name="email"
                    type="email"
                    value={this.state.email}
                    onChange={this.valueHandaler}
                    error={errors.email}
                    info="This site uses Gravatar so if you want a profile image,
                    use a Gravatar email"
                  />

                  <TextFieldGroup
                    palceholder="Please enter password "
                    name="password"
                    type="password"
                    value={this.state.password}
                    onChange={this.valueHandaler}
                    error={errors.password}
                  />

                  <TextFieldGroup
                    palceholder="Please enter password2 "
                    name="password2"
                    type="password2"
                    value={this.state.password2}
                    onChange={this.valueHandaler}
                    error={errors.password2}
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

Register.propTypes = {
  registerUser: propTypes.func.isRequired,
  auth: propTypes.object.isRequired,
  errors: propTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
