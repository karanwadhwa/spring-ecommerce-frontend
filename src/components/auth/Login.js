import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { loginUser } from "../../store/actions/AuthActions";

import "./login.css";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
  }

  handleTextChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.loginUser(this.state.email, this.state.password);
  };

  render() {
    const { email, password } = this.state;

    return !!this.props.user ? (
      <Navigate to="/" />
    ) : (
      <div className="login-container">
        <form className="login-form" onSubmit={this.handleSubmit}>
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="email">
              Email address
            </label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={email}
              onChange={this.handleTextChange}
            />
          </div>

          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={password}
              onChange={this.handleTextChange}
            />
          </div>

          <div className="d-grid mb-4 text-center">
            <span className="auth-error">{this.props.error}</span>
            <button
              type="submit"
              className="btn btn-primary btn-block mb-2"
              onClick={this.handleSubmit}
            >
              Login
            </button>
            <Link to="/signup" style={{ textDecoration: "none" }}>
              <span className="text-center">Create an account</span>
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  error: state.auth.error,
  user: state.auth.user,
});

const mapDispatchToProps = { loginUser };

export default connect(mapStateToProps, mapDispatchToProps)(Login);
