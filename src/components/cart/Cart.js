import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, orderCheckout, removeFromCart } from "../../store/actions";
import AddNewAddress from "../common/AddNewAddress";
import AddressCard from "../common/AddressCard";
import NavBar from "../common/NavBar";

class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cartTotal: 0,
      cartQuantity: 0,
      address: {},
    };
  }

  componentDidMount() {
    this.calculateTotals();
  }

  componentDidUpdate(prevProps) {
    if (this.props.cart !== prevProps.cart) this.calculateTotals();
  }

  calculateTotals = () => {
    let cartTotal = 0;
    let cartQuantity = 0;
    this.props.cart.forEach(({ price, cartQuantity }) => {
      const itemTotal = price * cartQuantity;
      cartTotal += itemTotal;
      cartQuantity += cartQuantity;
    });

    this.setState({ cartTotal, cartQuantity });
  };

  renderItem = (item) => (
    <li className="list-group-item" key={item.id.toString()}>
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
          <span className="badge rounded-pill text-bg-warning text-capitalize">
            {item.category}
          </span>
          <h5>{item.name}</h5>
          <button
            type="button"
            className="btn btn-outline-danger btn-sm mt-2"
            onClick={() => this.props.removeFromCart(item.id)}
          >
            Remove
          </button>
        </div>
        <div className="col-auto float-right text-end">
          <span>${item.price}</span>
          <br />
          <div className="btn-group btn-group-sm mt-1" role="group">
            <button
              type="button"
              className="btn btn-danger"
              disabled={item.cartQuantity < 2}
              onClick={() => this.props.addToCart(item, item.cartQuantity - 1)}
            >
              -
            </button>
            <button type="button" className="btn" disabled>
              {item.cartQuantity}
            </button>{" "}
            <button
              type="button"
              className="btn btn-success"
              onClick={() => this.props.addToCart(item, item.cartQuantity + 1)}
            >
              +
            </button>
          </div>
          <br />
          <h6 className="mt-3 text-end">
            ${(item.price * item.cartQuantity).toFixed(2)}
          </h6>
        </div>
      </div>
    </li>
  );

  render() {
    const { cartTotal, address } = this.state;
    const { cart, orderCheckout, user } = this.props;
    const checkoutEnabled = cart.length > 0 && !!this.state.address.street;

    return (
      <div className="container mb-4">
        <NavBar />
        <div className="h3">Cart</div>
        <ul className="list-group list-group-flush">
          {cart.map(this.renderItem)}
        </ul>
        <hr />
        <div className="row ms-1 me-1">
          <h5 className="col">Total</h5>
          <h5 className="col text-end">${cartTotal.toFixed(2)}</h5>
        </div>
        <hr />
        <h6 className="col mt-4 mb-2">Shipping Address:</h6>
        <div className="row row-cols-4">
          {user.addresses.map((add) => (
            <div className="col">
              <AddressCard
                showButton
                address={add}
                // eslint-disable-next-line
                buttonText={address == add ? "Selected" : "Select"}
                onButtonClick={() => this.setState({ address: add })}
                // eslint-disable-next-line
                disableButton={address == add}
              />
            </div>
          ))}
        </div>
        <AddNewAddress />
        <div className="row text-end">
          {checkoutEnabled && (
            <Link to="/orders">
              <button
                type="button"
                className="btn btn-outline-primary mt-4 col-3 ms-auto me-2"
                onClick={() =>
                  orderCheckout(
                    { cartTotal, items: cart, address },
                    user.userid
                  )
                }
              >
                Checkout
              </button>
            </Link>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cart: state.products.cart,
  user: state.auth.user,
});

const mapDispatchToProps = { removeFromCart, addToCart, orderCheckout };

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
