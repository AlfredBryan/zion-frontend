import React, { Component } from "react";
import axios from "axios";

import Spinner from "../hoc/Spinner";
import CustomNav from "../Navbar/CustomNav";
import "./style.css";
import Footer from "../Footer/Footer";

class AddProducts extends Component {
  state = {
    product_name: "",
    price: "",
    description: "",
    image: "",
    loading: false,
    error: null,
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

  postProduct = async (e) => {
    e.preventDefault();
    const { product_name, price, description, image } = this.state;
    this.setState({ loading: true });
    const formData = new FormData();
    formData.set("product_name", product_name);
    formData.set("description", description);
    formData.set("price", price);
    formData.append("image", image);
    axios({
      method: "post",
      url: "https://zion-backend.herokuapp.com/api/v1/add_product",
      data: formData,
      config: {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    })
      .then((res) => {
        if (res.status === 201) {
          this.setState({ loading: false });
          this.props.history.push("/");
        }
      })
      .catch((err) => {
        this.setState({
          error: err,
          loading: false,
        });
      });
  };

  render() {
    const { product_name, price, description, loading, error } = this.state;
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
            <button type="submit" className="post_button">
              {loading ? <Spinner /> : "Post"}
            </button>
          </form>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

export default AddProducts;
