import React from "react";
import { connect } from "react-redux";
import { Navigate, useParams, useSearchParams } from "react-router-dom";

export const ProtectedRoute = (props) => {
  const params = useParams();
  const [searchParams] = useSearchParams();
  const { user, children } = props;

  return !!user ? (
    React.cloneElement(children, { params, searchParams })
  ) : (
    <Navigate to="/login" replace={true} />
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRoute);
