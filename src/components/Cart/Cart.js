import React, { Component } from "react";
import axios from "axios";

import Loader from "../hoc/Loader";
import CustomNav from "../Navbar/CustomNav";

class Cart extends Component {
  state = {
    cart: [],
    loading: true,
    count: {},
    itemTotal: 0,
  };

  increment = (id) => {
    this.setState({ count: { [id]: this.state.count[id] + 1 } });
    //'this.state.count[id] += 1;
    console.log(this.state.count[id], "inc");
  };

  viewCart = () => {
    const token = localStorage.getItem("token");
    const products = [];
    axios
      .get("https://zion-backend.herokuapp.com/api/v1/cart", {
        headers: {
          token: token,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          res.data.map((cart) => products.push(cart.product));
          this.setState({ cart: products, loading: false });
        }
      })
      .catch((error) => {
        if (error) {
          this.setState({ loading: false });
        }
      });
  };

  componentDidMount() {
    this.viewCart();
    // this.fetch = setInterval(() => this.viewCart(), 1000);
  }

  componentWillMount() {
    clearInterval(this.fetch);
  }

  render() {
    const { cart, loading, count } = this.state;
    console.log(cart);
    if (loading) {
      return (
        <React.Fragment>
          <CustomNav />
          <div style={{ marginTop: "20em" }}>
            <Loader />
          </div>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <CustomNav />
          <div className="cart_main">
            <div className="design_header">
              <h5 className="section-title h1">Your Cart</h5>
              <hr className="header_underline" />
            </div>
            {cart && cart.length < 1 ? (
              <div className="empty_cart card">
                <h3>Nothing in cart</h3>
                <p>Please proceed to add designs to cart</p>
              </div>
            ) : (
              <div>
                {cart &&
                  cart.map((products) =>
                    products.map((product) =>
                      product.map((newProduct) => (
                        <div className="row my-2 text-capitalize  text-center">
                          <div className="col-10 mx-auto single_product col-lg-2">
                            {count[newProduct._id] === undefined
                              ? (count[newProduct._id] = 1)
                              : ""}
                            <img
                              src={newProduct.image}
                              style={{ width: "5rem", height: "5rem" }}
                              className="img-fluid"
                              alt="product"
                            />
                          </div>
                          <div className="col-10 mx-auto adjust_cart  col-lg-2">
                            {newProduct.product_name}
                          </div>
                          <div className="col-10 mx-auto adjust_cart text-white col-lg-2">
                            <span className="">price : </span>
                            {newProduct.price}
                          </div>
                          <div className="col-10 mx-auto col-lg-2 my-2 my-lg-0">
                            <div className="d-flex adjust_btn justify-content-center">
                              <div>
                                <span
                                  className="btn btn-black mx-1"
                                  onClick={() => this.decrement(newProduct._id)}
                                >
                                  -
                                </span>
                                <span className="btn btn-black mx-1">
                                  {count}
                                </span>
                                <span
                                  className="btn btn-black mx-1"
                                  onClick={() => this.increment(newProduct._id)}
                                >
                                  +
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="col-10 adjust_btn mx-auto col-lg-2">
                            <div className="cart-icon">
                              <i
                                className="fa fa-trash"
                                onClick={() => this.removeItem(newProduct._id)}
                              />
                            </div>
                          </div>
                          <div className="col-10 adjust_btn text-white mx-auto col-lg-2">
                            <strong>
                              item total : ₦
                              {newProduct.price *
                                this.state.count[newProduct._id]}
                            </strong>
                          </div>
                        </div>
                      ))
                    )
                  )}
              </div>
            )}
          </div>
        </React.Fragment>
      );
    }
  }
}

export default Cart;
