import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../action/profileAction";
import Loading from "../common/Loading";
import { Link } from "react-router-dom";
import ProfileAction from "./ProfileAction";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }
  deleteHandaler = () => {
    this.props.deleteAccount();
  };
  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashBoardContent;

    if (profile === null || loading) {
      dashBoardContent = <Loading />;
    } else {
      //check if login user have data
      if (Object.keys(profile).length > 0) {
        dashBoardContent = (
          <div>
            <p class="lead text-muted">
              Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
              <ProfileAction />
              <div style={{ marginBottom: "60px" }} />
              <button onClick={this.deleteHandaler} className="btn btn-danger">
                Delete my account
              </button>
            </p>
          </div>
        );
      } else {
        //user is loged in but has no profile
        dashBoardContent = (
          <div>
            <p class="lead text-muted">Welcome {user.name}</p>
            <p>You have not setUp profile. Please add some info</p>
            <Link to="/createprofile" className="btn btn-lg btn-info">
              Create Profile
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="dashbaord">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">{dashBoardContent}</h1>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount }
)(Dashboard);
