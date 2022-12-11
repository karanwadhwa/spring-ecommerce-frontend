import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { signupUser } from "../../store/actions/AuthActions";

import "./login.css";

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fname: "",
      lname: "",
      email: "",
      password: "",
      usertype: "customer",
    };
  }

  handleTextChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const payload = { ...this.state };
    this.props.signupUser(payload);
  };

  render() {
    const { fname, lname, email, password, usertype } = this.state;

    return !!this.props.user ? (
      <Navigate to="/" />
    ) : (
      <div className="login-container">
        <form className="login-form" onSubmit={this.handleSubmit}>
          <div className="row form-outline mb-4">
            <div className="col">
              <label className="form-label" htmlFor="fname">
                First Name
              </label>
              <input
                type="text"
                name="fname"
                className="form-control"
                value={fname}
                required
                onChange={this.handleTextChange}
              />
            </div>
            <div className="col">
              <label className="form-label" htmlFor="lname">
                Last Name
              </label>
              <input
                type="text"
                name="lname"
                className="form-control"
                value={lname}
                onChange={this.handleTextChange}
              />
            </div>
          </div>

          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="email">
              Email address
            </label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={email}
              required
              onChange={this.handleTextChange}
            />
          </div>

          <div className="row form-outline mb-4">
            <div className="col">
              <label className="form-label" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                name="password"
                className="form-control"
                required
                value={password}
                onChange={this.handleTextChange}
              />
            </div>
            <div className="col">
              <label className="form-check-label" htmlFor="usertype">
                Usertype
              </label>
              <div className="mt-3">
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="usertype"
                    value="customer"
                    onChange={this.handleTextChange}
                    checked={usertype === "customer"}
                  />
                  <label className="form-check-label" htmlFor="usertype">
                    Customer
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="usertype"
                    value="seller"
                    onChange={this.handleTextChange}
                    checked={usertype === "seller"}
                  />
                  <label className="form-check-label" htmlFor="usertype">
                    Seller
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="d-grid mb-4 text-center">
            <span className="auth-error">{this.props.error}</span>

            <button
              type="submit"
              className="btn btn-primary btn-block mb-2"
              onClick={this.handleSubmit}
            >
              Sign up
            </button>
            <Link to="/login" style={{ textDecoration: "none" }}>
              <span className="text-center">Have an account? Login now.</span>
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  error: state.auth.error,
});

const mapDispatchToProps = { signupUser };

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
