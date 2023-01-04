import axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getAllProducts, logout } from "../../store/actions";
import { apiURL } from "../../variable";
import NavBar from "../common/NavBar";
import ProductCard from "../products/ProductCard";

class CustomerHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      searchError: "",
      searchResults: [],
    };
  }

  componentDidMount() {
    this.props.getAllProducts();
  }

  handleTextChange = (event) =>
    this.setState(
      { [event.target.name]: event.target.value },
      this.fetchProductsByName
    );

  fetchProductsByName = () => {
    const { searchTerm } = this.state;
    if (!!searchTerm)
      axios
        .get(`${apiURL}/product/find-by-name/${searchTerm}`)
        .then((res) => {
          this.setState({ searchResults: res.data.splice(0, 4) });
          console.log(res);
        })
        .catch((err) => {
          console.log(err, err.response);
          // alert("Search failed.");
        });
  };

  render() {
    const { searchResults, searchTerm } = this.state;
    return (
      <div className="container">
        <NavBar />

        <input
          type="search"
          name="searchTerm"
          placeholder="Search"
          value={this.state.searchTerm}
          onChange={this.handleTextChange}
          className="form-control me-2"
          autoComplete="off "
        />
        {!!searchTerm && searchResults.length === 0 && (
          <ul className="list-group mt-2">
            <li className="list-group-item">No products found</li>
          </ul>
        )}
        {!!searchTerm && searchResults.length > 0 && (
          <div className="list-group mt-2">
            {searchResults.map((item) => (
              <Link
                to={`/product/${item.id}`}
                key={item.id}
                className="list-group-item list-group-item-action"
              >
                {item.name}
              </Link>
            ))}
          </div>
        )}
        <div className="row row-cols-4 mt-3">
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
