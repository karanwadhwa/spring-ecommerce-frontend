import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { apiURL } from "../../variable";
import NavBar from "../common/NavBar";
import ProductCard from "./ProductCard";

const fetchProducts = (sellerId, setProducts, setSeller) => {
  axios
    .get(`${apiURL}/product/find-by-seller/${sellerId}`)
    .then((prodResponse) => {
      setProducts(prodResponse.data);
      axios
        .get(`${apiURL}/user/${sellerId}`)
        .then((sellerResponse) => setSeller(sellerResponse.data));
    })
    .catch((err) => console.log(err, err.response));
};

const SellerStore = (props) => {
  const sellerId = props.params.id;
  const [products, setProducts] = useState([]);
  const [seller, setSeller] = useState({});

  useEffect(() => {
    fetchProducts(sellerId, setProducts, setSeller);
  }, [sellerId]);

  return (
    <div className="container">
      <NavBar />
      {products.length === 0 ? (
        <div className="text-center" style={{ marginTop: "20%" }}>
          <span>Seller could not be found! Please try again.</span>
          <br />
          <Link to="/">
            <button type="button" className="btn btn-outline-primary mt-3">
              Continue Shopping
            </button>
          </Link>
        </div>
      ) : (
        <div>
          <h2>
            Products by {seller.fname} {seller.lname}
          </h2>
          <div className="row row-cols-4">
            {products.map((product) => (
              <div key={product.id} className="col mb-3 mt-3">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerStore;
