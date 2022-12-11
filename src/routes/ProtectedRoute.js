import React, { Component } from "react";
import { connect } from "react-redux";
import { Navigate, useParams } from "react-router-dom";

export const ProtectedRoute = (props) => {
  const params = useParams();
  const { user, children } = props;

  return !!user ? (
    React.cloneElement(children, { params })
  ) : (
    <Navigate to="/login" replace={true} />
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRoute);
