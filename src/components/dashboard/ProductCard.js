import React from "react";
import { connect } from "react-redux";
import { addToCart } from "../../store/actions";

export const ProductCard = ({ product, addToCart, cart }) => {
  return (
    <div className="card">
      <img
        src={
          product.thumbnail_url ??
          "https://curbside.ph/assets/uploads/2022/06/curbside-ph.jpg"
        }
        alt="product_image"
        className="card-img-to rounded-top"
      />
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <h6 className="text-muted mb2">${product.price}</h6>
        {cart.some((i) => i.id === product.id) ? (
          <button className="btn btn-outline-primary" disabled>
            Added to Cart
          </button>
        ) : (
          <button
            className="btn btn-primary"
            onClick={() => addToCart(product, 1)}
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  cart: state.products.cart,
});

const mapDispatchToProps = { addToCart };

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);
