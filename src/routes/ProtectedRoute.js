import React, { Component } from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";

class ProtectedRoute extends Component {
  render() {
    const { user, children } = this.props;

    return !!user ? children : <Navigate to="/login" replace={true} />;
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRoute);
