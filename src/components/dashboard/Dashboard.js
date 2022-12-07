import React, { Component } from "react";
import { connect } from "react-redux";
import CustomerHome from "./CustomerHome";
import SellerHome from "./SellerHome";

class Dashboard extends Component {
  render() {
    return this.props.user?.usertype === "customer" ? (
      <CustomerHome />
    ) : (
      <SellerHome />
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
