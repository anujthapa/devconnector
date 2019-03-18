import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import InputGroup from "../common/InputGroup";
import SelectListGroup from "../common/SelectListGroup";
import { createProfile } from "../../action/profileAction";

class CreateProfile extends Component {
  state = {
    displaySocialInput: false,
    handle: "",
    company: "",
    website: "",
    location: "",
    status: "",
    skills: "",
    githubusername: "",
    bio: "",
    twitter: "",
    facebook: "",
    linkedin: "",
    youtube: "",
    intagram: "",
    errors: {}
  };

  ChangeHandaler = e => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    this.setState({ [name]: value });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  handleOnSubmit = e => {
    e.preventDefault();

    const profileData = {
      handle: this.state.handle,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      status: this.state.status,
      skills: this.state.skills,
      githubusername: this.state.githubusername,
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      youtube: this.state.youtube,
      intagram: this.state.instagram
    };
    this.props.createProfile(profileData, this.props.history);
  };

  render() {
    const { errors, displaySocialInput } = this.state;
    //select option for status
    const options = [
      {
        label: "Select Professional Status",
        value: 0
      },
      {
        label: "Developer",
        value: "Developer"
      },
      {
        label: "junior Developer",
        value: "junior Developer"
      },
      {
        label: "Senior Developer",
        value: "Senior Developer"
      },
      {
        label: "internship",
        value: "internship"
      },
      {
        label: "Student",
        value: "Student"
      }
    ];
    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Create Your Profile</h1>
              <p className="lead text-center">
                Let's get some information to make your profile stand out
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.handleOnSubmit}>
                <TextFieldGroup
                  palceholder=" * Profile handle"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.ChangeHandaler}
                  error={errors.handle}
                />

                <SelectListGroup
                  palceholder="status"
                  name="status"
                  value={this.state.status}
                  onChange={this.ChangeHandaler}
                  option={options}
                  error={errors.status}
                  info="Give us an idea of where you are at your career"
                />
                <TextFieldGroup
                  palceholder="Company"
                  name="company"
                  value={this.state.company}
                  onChange={this.ChangeHandaler}
                  error={errors.handle}
                  info="Could be your own company or place you are working "
                />
                <TextFieldGroup
                  palceholder="website"
                  name="website"
                  value={this.state.website}
                  onChange={this.ChangeHandaler}
                  error={errors.handle}
                  info="Could be your own Website or place you are working "
                />
                <TextFieldGroup
                  palceholder="LOCATION"
                  name="LOCATION"
                  value={this.state.LOCATION}
                  onChange={this.ChangeHandaler}
                  error={errors.handle}
                />

                <TextFieldGroup
                  palceholder="Skills"
                  name="skills"
                  value={this.state.skills}
                  onChange={this.ChangeHandaler}
                  error={errors.handle}
                  info="Please use comma seprated values (eg .HTML,CSS,JAVASCRIPT)"
                />
                <TextFieldGroup
                  palceholder="Github user name"
                  name="githubusername"
                  value={this.state.githubusername}
                  onChange={this.ChangeHandaler}
                  error={errors.handle}
                  info="If you want your lates repos and a github link,include your username"
                />
                <TextAreaFieldGroup
                  palceholder="Short Bio"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.ChangeHandaler}
                  error={errors.bio}
                  info="Tell us a little about yourself"
                />
                <div className="md-3">
                  <button
                    onClick={() =>
                      this.setState(prevState => ({
                        displaySocialInput: !prevState.displaySocialInput
                      }))
                    }
                    className="btn btn-light"
                  >
                    Add Social Network Links
                  </button>
                  <span className="text-muted">Optional</span>
                  {displaySocialInput ? (
                    <div>
                      <InputGroup
                        palceholder="Twitter Profile URL"
                        name="twitter"
                        icon="fab fa-twitter"
                        value={this.state.twitter}
                        onChange={this.ChangeHandaler}
                        error={errors.twitter}
                      />
                      <InputGroup
                        palceholder="linkedin Profile URL"
                        name="linkedin"
                        icon="fab fa-linkedin"
                        value={this.state.linkedin}
                        onChange={this.ChangeHandaler}
                        error={errors.linkedin}
                      />
                      <InputGroup
                        palceholder="Facebook Profile URL"
                        name="facebook"
                        icon="fab fa-facebook"
                        value={this.state.facebook}
                        onChange={this.ChangeHandaler}
                        error={errors.facebook}
                      />
                      <InputGroup
                        palceholder="instagram Profile URL"
                        name="instagram"
                        icon="fab fa-instagram"
                        value={this.state.instagram}
                        onChange={this.ChangeHandaler}
                        error={errors.instagram}
                      />
                      <InputGroup
                        palceholder="youtube Profile URL"
                        name="youtube"
                        icon="fab fa-youtube"
                        value={this.state.youtube}
                        onChange={this.ChangeHandaler}
                        error={errors.youtube}
                      />
                      <br />
                      <p className="btn btn-sucessful">This works</p>
                    </div>
                  ) : (
                    ""
                  )}
                  <TextAreaFieldGroup
                    palceholder="Short Bio"
                    name="bio"
                    value={this.state.bio}
                    onChange={this.ChangeHandaler}
                    error={errors.bio}
                    info="Tell us a little about yourself"
                  />
                </div>
                <button type="submit">Save</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProfile }
)(withRouter(CreateProfile));
