import React from "react";
import { connect } from "react-redux";
import { Navigate, useParams, useSearchParams } from "react-router-dom";

export const ProtectedRoute = (props) => {
  const params = useParams();
  const [searchParams] = useSearchParams();
  const { user, children, apiError } = props;

  return !!user ? (
    <div>
      {apiError && (
        <div
          class="alert alert-danger"
          role="alert"
          style={{ position: "absolute", top: 100, right: 20, zIndex: 100 }}
        >
          <strong>Error: </strong>
          {apiError}
        </div>
      )}
      {React.cloneElement(children, { params, searchParams })}
    </div>
  ) : (
    <Navigate to="/login" replace={true} />
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  apiError: state.apiError.error,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRoute);
