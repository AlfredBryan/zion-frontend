import React, { Component } from "react";
import axios from "axios";

import Loader from "../hoc/Loader";
import CustomNav from "../Navbar/CustomNav";
import PaystackButton from "./PayStackButton";
import { connect } from "react-redux";

import { getUser } from "../../actions/userActions";

class Cart extends Component {
  state = {
    cart: [],
    loading: true,
    count: {},
    itemTotal: 0,
  };

  increment = (id) => {
    let tempCart = this.state.cart.map((products) =>
      products.map((newProduct) =>
        newProduct.map((updatedProduct) => updatedProduct)
      )
    );
    const selectedProduct = tempCart.find((item) => item._id === id);

    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];

    product.count = product.count + 1;
    product.total = product.count * product.price;

    this.setState(
      () => {
        return { cart: [...tempCart] };
      },
      () => {
        this.addTotals();
      }
    );
  };

  decrement = (id) => {
    let tempCart = [...this.state.cart];
    const selectedProduct = tempCart.find((item) => item._id === id);

    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];

    product.count = product.count - 1;
    if (product.count === 0) {
      this.removeItem(id);
    } else {
      product.total = product.count * product.price;

      this.setState(
        () => {
          return { cart: [...tempCart] };
        },
        () => {
          this.addTotals();
        }
      );
    }
  };

  removeItem = (id) => {
    let tempProducts = [...this.state.products];
    let tempCart = [...this.state.cart];

    tempCart = tempCart.filter((item) => item._id !== id);

    const index = tempProducts.indexOf(this.getItem(id));
    let removedProduct = tempProducts[index];
    removedProduct.inCart = false;
    removedProduct.count = 0;
    removedProduct.total = 0;

    this.setState(
      () => {
        return {
          cart: [...tempCart],
          products: [...tempProducts],
        };
      },
      () => {
        this.addTotals();
      }
    );
  };

  clearCart = () => {
    this.setState(
      () => {
        return { cart: [] };
      },
      () => {
        this.setProducts();
        this.addTotals();
      }
    );
  };

  addTotals = () => {
    let subTotal = 0;
    this.state.cart.map((item) => (subTotal += item.total));
    const tempTax = subTotal * 0.1;
    const tax = parseFloat(tempTax.toFixed(2));
    const total = subTotal + tax;
    this.setState(() => {
      return {
        cartSubTotal: subTotal,
        cartTax: tax,
        cartTotal: total,
      };
    });
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

  fetchUser = () => {
    this.props.dispatch(getUser());
  };

  componentDidMount() {
    this.viewCart();
    // this.fetch = setInterval(() => this.viewCart(), 1000);
    this.fetchUser();
  }

  componentWillMount() {
    clearInterval(this.fetch);
  }

  render() {
    const { cart, loading, count } = this.state;
    const { user } = this.props;
    console.log(user.email);
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
                                <span className="btn btn-black mx-1">{}</span>
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
                            <strong>item total : ₦{}</strong>
                          </div>
                        </div>
                      ))
                    )
                  )}
              </div>
            )}
          </div>

          <div className="pay_div">
            <div className="center_pay">
              <PaystackButton
                total={100}
                email={user.email}
                style={{ textAlign: "center" }}
                phone={user.phone}
                name={user.name}
              />
            </div>
          </div>
        </React.Fragment>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  user: state.user.user,
});

export default connect(mapStateToProps)(Cart);
