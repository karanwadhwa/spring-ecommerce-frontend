import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getMyProducts } from "../../store/actions";
import NavBar from "../common/NavBar";
import ProductCard from "./ProductCard";

class SellerHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
    };
  }

  componentDidMount() {
    const { getMyProducts, user } = this.props;
    getMyProducts(user.userid);
  }

  handleTextChange = (event) =>
    this.setState({ [event.target.name]: event.target.value });

  renderEmptyProductsPage = () => (
    <div className="text-center" style={{ marginTop: "20%" }}>
      <span>You do not have any inventory!</span>
      <br />
      <Link to="/product/new">
        <button type="button" className="btn btn-outline-primary mt-3">
          Create a new Product Listing
        </button>
      </Link>
    </div>
  );

  render() {
    return (
      <div className="container">
        <NavBar />
        <div className="h3">My Products</div>
        {this.props.allItems.length === 0 ? (
          this.renderEmptyProductsPage()
        ) : (
          <div>
            {/* <input
              type="search"
              name="searchTerm"
              placeholder="Search"
              value={this.state.searchTerm}
              onChange={this.handleTextChange}
              className="form-control me-2 mb-3"
            /> */}
            <div className="row row-cols-4">
              {this.props.allItems.map((product) => (
                <div key={product.id} className="col mb-3 mt-3">
                  <ProductCard product={product} editButton />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  allItems: state.products.allItems,
});

const mapDispatchToProps = { getMyProducts };

export default connect(mapStateToProps, mapDispatchToProps)(SellerHome);
