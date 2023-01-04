import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { createProduct, updateProduct } from "../../store/actions";
import NavBar from "../common/NavBar";
import ProductCard from "./ProductCard";

class NewProduct extends Component {
  constructor(props) {
    super(props);

    const { searchParams } = this.props;

    this.state = {
      name: searchParams.get("name") ?? "",
      quantity: !!searchParams.get("quantity")
        ? parseInt(searchParams.get("quantity"))
        : 1,
      price: !!searchParams.get("price")
        ? parseInt(searchParams.get("price"))
        : 0,
      thumbnail_url:
        searchParams.get("thumbnail_url") ??
        "https://curbside.ph/assets/uploads/2022/06/curbside-ph.jpg",
      description: searchParams.get("description") ?? "",
      category: searchParams.get("category") ?? "",
    };
  }

  handleInput = (event) =>
    this.setState({ [event.target.name]: event.target.value });

  handleSubmit = () => {
    const { editing, user, createProduct, updateProduct, searchParams } =
      this.props;
    const product = { ...this.state, seller: user.userid };
    if (editing) {
      product.id = parseInt(searchParams.get("id"));
      if (!product.id) alert("Error updating product");
      else updateProduct(product);
    } else createProduct(product);
  };

  render() {
    const { name, quantity, price, thumbnail_url, category, description } =
      this.state;
    const editing = !!this.props?.searchParams?.get("name");
    return (
      <div className="container">
        <NavBar />
        <div className="row" style={{ margin: "10% 0px" }}>
          <div className="col-3">
            <h4>Product Preview:</h4>
            <ProductCard product={this.state} disableButton />
          </div>
          <form className="col-7" onSubmit={this.handleSubmit}>
            <h4>{editing ? "Edit" : "New"} Product:</h4>
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
                rows="5"
                name="description"
                value={description}
                onChange={this.handleInput}
              />
            </div>

            <div className="text-end">
              <Link to="/">
                <button
                  type="button"
                  className="btn btn-outline-primary mb-2 me-4"
                >
                  Cancel
                </button>
              </Link>
              {this.props.editing && (
                <button
                  type="button"
                  className="btn btn-outline-danger mb-2 me-4"
                  onClick={() =>
                    this.setState({ quantity: 0 }, this.handleSubmit)
                  }
                >
                  Mark out of Stock
                </button>
              )}
              <Link to="/">
                <button
                  type="button"
                  className={
                    this.props.editing
                      ? "btn btn-success mb-2"
                      : "btn btn-primary mb-2"
                  }
                  onClick={this.handleSubmit}
                >
                  {this.props.editing
                    ? "Update Product Listing"
                    : "Create Product Listing"}
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

const mapDispatchToProps = { createProduct, updateProduct };

export default connect(mapStateToProps, mapDispatchToProps)(NewProduct);
