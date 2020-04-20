import React, { Component } from "react";
import { connect } from "react-redux";

import { addProduct } from "../../actions/productActions";
import Spinner from "../hoc/Spinner";
import CustomNav from "../Navbar/CustomNav";
import "./style.css";

class AddProducts extends Component {
  state = {
    product_name: "",
    price: "",
    description: "",
    image: "",
  };

  handleImageChange = (e) => {
    e.preventDefault();
    let imageFile = e.target.files[0];
    this.setState({ [e.target.name]: imageFile });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  postProduct = (e) => {
    e.preventDefault();
    const data = this.state;
    const { loading, error } = this.props;
    this.props.dispatch(addProduct(data));
    if (error === null) {
      this.props.history.push("/");
    }
  };

  render() {
    const { product_name, price, description } = this.state;
    const { loading, error } = this.props;
    return (
      <React.Fragment>
        <CustomNav />
        <div className="form-style-5 product_main">
          <form onSubmit={this.postProduct} encType="multipart/form-data">
            <fieldset>
              <legend>
                <span className="number">#</span> Post New Products
              </legend>
              {error !== null ? (
                <p style={{ color: "red" }}>Error posting product</p>
              ) : (
                ""
              )}
              <label htmlFor="product_name">Product Name</label>
              <input
                type="text"
                name="product_name"
                placeholder="Product Name"
                value={product_name}
                onChange={this.handleChange}
              />
              <label htmlFor="price">Price</label>
              <input
                type="text"
                name="price"
                placeholder="Product Price"
                value={price}
                onChange={this.handleChange}
              />
              <label htmlFor="description">Product Image</label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={this.handleImageChange}
              />
              <label htmlFor="description">Description</label>
              <textarea
                name="description"
                placeholder="About Product"
                value={description}
                onChange={this.handleChange}
              ></textarea>
            </fieldset>
            <button className="post_button">
              {loading ? <Spinner /> : "Post"}
            </button>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.products.loading,
  error: state.products.error,
});

export default connect(mapStateToProps)(AddProducts);
