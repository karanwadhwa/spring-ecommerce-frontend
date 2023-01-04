import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../../store/actions";
import { apiURL } from "../../variable";
import NavBar from "../common/NavBar";
import { assembleEditURL } from "./ProductCard";

const fetchProduct = (id, setProduct, setSeller) => {
  return axios
    .get(`${apiURL}/product/${id}`)
    .then((res) => {
      setProduct(res.data);
      axios
        .get(`${apiURL}/user/${res.data?.seller}`)
        .then((res) => setSeller(res.data));
    })
    .catch((err) => {
      console.log(err, err.response);
      setProduct(null);
    });
};

const ViewProduct = (props) => {
  const productId = props.params.id;
  const [product, setProduct] = useState(null);
  const [seller, setSeller] = useState(null);
  const cart = useSelector((state) => state.products.cart);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    fetchProduct(productId, setProduct, setSeller);
  }, [productId]);

  const dispatch = useDispatch();

  console.log(props, product);
  return (
    <div className="container">
      <NavBar />
      {!product ? (
        <div className="text-center" style={{ marginTop: "20%" }}>
          <span>Product could not be found! Please try again.</span>
          <br />
          <Link to="/">
            <button type="button" className="btn btn-outline-primary mt-3">
              Continue Shopping
            </button>
          </Link>
        </div>
      ) : (
        <div className="row">
          <h2 className="mb-4">View Product</h2>
          <div className="col-3">
            <img
              src={
                product.thumbnail_url ??
                "https://curbside.ph/assets/uploads/2022/06/curbside-ph.jpg"
              }
              alt="product_image"
              className="card-img-to rounded"
              style={{ width: "100%" }}
            />
          </div>
          <div className="col-6 ms-4 me-4">
            <h4>{product.name}</h4>
            <span class="badge rounded-pill text-bg-primary me-4 text-capitalize">
              {product.category}
            </span>
            {!!seller && (
              <Link to={`/seller/${product.seller}`}>
                Visit the {seller.fname} {seller.lname} store
              </Link>
            )}
            <br />
            <h5 className="mt-3 mb-2">Price: ${product.price}</h5>
            Remaining quantity: {product.quantity}
            <p className="mt-2 mb-4">{product.description}</p>
            {user.usertype === "seller" ? (
              <Link to={`/product/edit${assembleEditURL(product)}`}>
                <button className="btn btn-success">Edit Product</button>
              </Link>
            ) : product.quantity === 0 ? (
              <button className="btn btn-danger" disabled>
                Sold out
              </button>
            ) : (
              <Link to="/cart">
                {cart.some((i) => i.id === product.id) ? (
                  <button className="btn btn-outline-primary">
                    Go to Cart
                  </button>
                ) : (
                  <button
                    className="btn btn-primary"
                    onClick={() => dispatch(addToCart(product, 1))}
                  >
                    Add to Cart
                  </button>
                )}
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewProduct;
