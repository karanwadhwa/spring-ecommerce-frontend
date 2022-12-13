import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../../store/actions";

const assembleEditURL = (product) => {
  const url = new URL("/product/edit", "https://localhost:3000/");
  url.searchParams.set("id", product.id);
  url.searchParams.set("name", product.name);
  url.searchParams.set("price", product.price);
  url.searchParams.set("quantity", product.quantity);
  url.searchParams.set("category", product.category);
  url.searchParams.set("thumbnail_url", product.thumbnail_url);
  url.searchParams.set("description", product.description);
  return url.search;
};

export const ProductCard = ({
  product,
  addToCart,
  cart,
  disableButton = false,
  editButton = false,
}) => {
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
        {editButton ? (
          <Link to={`/product/edit${assembleEditURL(product)}`}>
            <button
              className="btn btn-success"
              // onClick={() => addToCart(product, 1)}
            >
              Edit Product
            </button>
          </Link>
        ) : cart.some((i) => i.id === product.id) ? (
          <button className="btn btn-outline-primary" disabled>
            Added to Cart
          </button>
        ) : (
          <button
            className="btn btn-primary"
            onClick={() => addToCart(product, 1)}
            disabled={disableButton}
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
