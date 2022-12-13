import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { logout } from "../../store/actions";

const NavBar = (props) => {
  return (
    <div className="row mt-3 mb-3">
      <div className="col-auto me-auto">
        <Link to="/">
          <button
            type="button"
            className="btn btn-primary"
            // onClick={this.props.logout}
          >
            Home
          </button>
        </Link>
      </div>
      {props.usertype === "customer" && (
        <div className="col-auto">
          <Link to="/orders">
            <button type="button" className="btn btn-outline-primary">
              Orders
            </button>
          </Link>
        </div>
      )}
      {props.usertype === "customer" && (
        <div className="col-auto">
          <Link to="/cart">
            <button type="button" className="btn btn-outline-primary">
              Cart
            </button>
          </Link>
        </div>
      )}
      {props.usertype === "seller" && (
        <div className="col-auto">
          <Link to="/product/new">
            <button type="button" className="btn btn-outline-primary">
              New Product
            </button>
          </Link>
        </div>
      )}
      <div className="col-auto">
        <button type="button" className="btn btn-danger" onClick={props.logout}>
          Logout
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  usertype: state.auth.user.usertype,
});

const mapDispatchToProps = { logout };

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
