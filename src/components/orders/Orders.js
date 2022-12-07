import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getAllOrders } from "../../store/actions";
import NavBar from "../common/NavBar";

class Orders extends Component {
  componentDidMount() {
    this.props.getAllOrders(this.props.user.userid);
  }
  render() {
    return (
      <div className="container mb-4">
        <NavBar />
        {this.props.orders.length === 0 ? (
          <div className="text-center" style={{ marginTop: "20%" }}>
            <span>You do not have any orders yet!</span>
            <br />
            <Link to="/">
              <button type="button" className="btn btn-outline-primary mt-3">
                Continue Shopping
              </button>
            </Link>
          </div>
        ) : (
          <table className="table table-hover text-center">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Date</th>
                <th scope="col">Status</th>
                <th scope="col">Order Total</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {this.props.orders.map((order) => (
                <tr key={order.orderId}>
                  <td>{order.orderId}</td>
                  <td>{new Date(order.createdOn).toLocaleString()}</td>
                  <td>{order.status}</td>
                  <td>${order.orderTotal}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-outline-primary"
                      style={{ width: "80%" }}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  orders: state.products.orders,
});

const mapDispatchToProps = { getAllOrders };

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
