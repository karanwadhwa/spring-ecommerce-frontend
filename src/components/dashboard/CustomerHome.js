import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getAllProducts, logout } from "../../store/actions";
import NavBar from "../common/NavBar";
import ProductCard from "./ProductCard";

class CustomerHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
    };
  }

  componentDidMount() {
    this.props.getAllProducts();
  }

  handleTextChange = (event) =>
    this.setState({ [event.target.name]: event.target.value });

  render() {
    return (
      <div className="container">
        <NavBar />

        <input
          type="search"
          name="searchTerm"
          placeholder="Search"
          value={this.state.searchTerm}
          onChange={this.handleTextChange}
          className="form-control me-2 mb-3"
        />
        <div className="row row-cols-4">
          {this.props.products.allItems.map((product) => (
            <div key={product.id} className="col mb-3">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.products,
});

const mapDispatchToProps = { getAllProducts, logout };

export default connect(mapStateToProps, mapDispatchToProps)(CustomerHome);
