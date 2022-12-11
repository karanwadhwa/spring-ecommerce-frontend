import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, orderCheckout, removeFromCart } from "../../store/actions";
import NavBar from "../common/NavBar";

class OrderPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      order: {},
    };
  }

  componentDidMount() {
    const id = parseInt(this.props.params.id);
    const order = this.props.orders.find((o) => o.orderId === id);
    console.log(order, id);
    this.setState({ order });
  }

  renderItems = (item) => (
    <li className="list-group-item" key={item.orderId}>
      <div className="row mt-3 mb-3">
        <div className="col-auto">
          <img
            src={
              item.thumbnail_url ??
              "https://curbside.ph/assets/uploads/2022/06/curbside-ph.jpg"
            }
            alt="product_image"
            className="img-thumbnail rounded float-start"
            style={{ maxWidth: 100 }}
          />
        </div>
        <div className="col-auto me-auto">
          <h5>{item.name}</h5>
          <span>Price: ${item.price}</span>
          <br />
          <span>Quantity: {item.quantity}</span>
          <br />
        </div>
        <div className="col-auto float-right text-end">
          <h5 className="mt-3 text-end">${item.totalPrice}</h5>
        </div>
      </div>
      <hr />
    </li>
  );

  render() {
    const { order } = this.state;

    console.log(this.props);
    return (
      <div className="container mb-4">
        <NavBar />
        {!order ? (
          <div className="text-center" style={{ marginTop: "20%" }}>
            <span>Invalid order id. Please try again</span>
            <br />
            <Link to="/">
              <button type="button" className="btn btn-outline-primary mt-3">
                Continue Shopping
              </button>
            </Link>
          </div>
        ) : (
          <div>
            <div className="mt-4 mb-4">
              <h2>Order #{order.orderId}</h2>
              <h5>Date: {new Date(order.createdOn).toLocaleString()}</h5>
              <h5>
                Status:{" "}
                <span class="badge bg-success text-capitalize">
                  {order.status}
                </span>
              </h5>
            </div>
            {order.items?.map(this.renderItems)}
            <div className="row ms-1">
              <h5 className="col">Total</h5>
              <h5 className="col text-end">${order.orderTotal}</h5>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  orders: state.products.orders,
  user: state.auth.user,
});

const mapDispatchToProps = { removeFromCart, addToCart, orderCheckout };

export default connect(mapStateToProps, mapDispatchToProps)(OrderPage);
