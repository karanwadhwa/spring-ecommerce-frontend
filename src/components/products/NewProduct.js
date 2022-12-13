import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { createProduct } from "../../store/actions";
import NavBar from "../common/NavBar";
import ProductCard from "../dashboard/ProductCard";

class NewProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      quantity: 1,
      price: 0,
      thumbnail_url:
        "https://curbside.ph/assets/uploads/2022/06/curbside-ph.jpg",
      description: "",
      category: "",
    };
  }

  handleInput = (event) =>
    this.setState({ [event.target.name]: event.target.value });

  handleSubmit = (event) => {
    event.preventDefault();
    const product = { ...this.state, seller: this.props.user.userid };
    this.props.createProduct(product);
  };

  render() {
    const { name, quantity, price, thumbnail_url, category, description } =
      this.state;
    return (
      <div className="container">
        <NavBar />
        <div className="row" style={{ margin: "10% 0px" }}>
          <div className="col-3">
            <h4>Product Preview:</h4>
            <ProductCard product={this.state} disableButton />
          </div>
          <form className="col-7" onSubmit={this.handleSubmit}>
            <h4>New Product:</h4>
            <div className="col mb-4">
              <label className="form-label" htmlFor="password">
                Name
              </label>
              <input
                type="text"
                name="name"
                className="form-control"
                required
                value={name}
                onChange={this.handleInput}
              />
            </div>
            <div className="row form-outline mb-4">
              <div className="col-3">
                <label className="form-label" htmlFor="password">
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  className="form-control"
                  required
                  value={price}
                  min={0}
                  onChange={this.handleInput}
                />
              </div>
              <div className="col-3">
                <label className="form-label" htmlFor="usertype">
                  Quantity
                </label>
                <input
                  type="number"
                  name="quantity"
                  className="form-control"
                  required
                  value={quantity}
                  min={1}
                  onChange={this.handleInput}
                />
              </div>
              <div className="col">
                <label className="form-label" htmlFor="usertype">
                  Category
                </label>
                <input
                  type="text"
                  name="category"
                  className="form-control"
                  required
                  value={category}
                  onChange={this.handleInput}
                />
              </div>
            </div>

            <div className="row form-outline mb-4">
              <div className="col">
                <label className="form-label" htmlFor="fname">
                  Thumbnail URL:
                </label>
                <input
                  type="text"
                  name="thumbnail_url"
                  className="form-control"
                  value={thumbnail_url}
                  required
                  onChange={this.handleInput}
                />
              </div>
            </div>
            <div className="form-outline mb-4">
              <label className="form-label" htmlFor="email">
                Description
              </label>

              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                name="description"
              >
                {description}
              </textarea>
            </div>

            <div className="mb-4 text-end">
              <span className="auth-error">{this.props.error}</span>

              <Link to="/">
                <button
                  type="submit"
                  className="btn btn-primary mb-2"
                  onClick={this.handleSubmit}
                >
                  Create Product Listing
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

const mapDispatchToProps = { createProduct };

export default connect(mapStateToProps, mapDispatchToProps)(NewProduct);
