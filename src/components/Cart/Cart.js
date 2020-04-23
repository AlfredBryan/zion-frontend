import React, { Component } from 'react';
import axios from 'axios';

import Loader from '../hoc/Loader';
import CustomNav from '../Navbar/CustomNav';
import PaystackButton from './PayStackButton';
import { connect } from 'react-redux';

import { getUser } from '../../actions/userActions';

class Cart extends Component {
  state = {
    cart: [],
    loading: true,
    count: {},
    itemTotal: 0,
    cart_data: {},
  };

  removeItem = (id) => {
    const token = localStorage.getItem('token');
    const { cart_data } = this.state;

    axios
      .get(
        `http://localhost:4000/api/v1/cart/delete/${cart_data._id}?product=${id}`,
        {
          headers: {
            token: token,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          this.viewCart();
        }
      })
      .catch((error) => {
        if (error) {
          this.setState({ loading: false });
        }
      });
  };

  // clearCart = () => {
  //   this.setState(
  //     () => {
  //       return { cart: [] };
  //     },
  //     () => {
  //       this.setProducts();
  //       this.addTotals();
  //     }
  //   );
  // };

  // addTotals = () => {
  //   let subTotal = 0;
  //   this.state.cart.map((item) => (subTotal += item.total));
  //   const tempTax = subTotal * 0.1;
  //   const tax = parseFloat(tempTax.toFixed(2));
  //   const total = subTotal + tax;
  //   this.setState(() => {
  //     return {
  //       cartSubTotal: subTotal,
  //       cartTax: tax,
  //       cartTotal: total,
  //     };
  //   });
  // };

  callback = (response) => {
    // console.log(response); // card charged successfully, get reference here
  };

  viewCart = () => {
    const token = localStorage.getItem('token');
    const products = [];
    axios
      .get('http://localhost:4000/api/v1/cart', {
        headers: {
          token: token,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          // console.log(res.data);
          res.data.data.map((product) => {
            products.push(product);
          });
          this.setState({ cart: products, loading: false });
          this.setState({ cart_data: res.data.cart, loading: false });
        }
      })
      .catch((error) => {
        if (error) {
          this.setState({ loading: false });
        }
      });
  };

  adjust = (id, type) => {
    // const { cart } = this.state;
    // for (let i = 0; i < cart.length; i++) {
    //   if (cart[i].id === id) {
    //     if (type === 'increment') cart[i].quantity += 1;
    //     else cart[i].quantity -= 1
    //     cart[i].cost = cart[i].quantity * cart[i].price;
    //     this.setState({ cart: cart, loading: false });
    //   }
    // }
    const token = localStorage.getItem('token');

    axios
      .get(
        `http://localhost:4000/api/v1/adjust_product/${id}?type=${type}`,
        {
          headers: {
            token: token,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          this.viewCart()
        }
      })
      .catch((error) => {
        if (error) {
          this.setState({ loading: false });
        }
      });
    return;
  };

  // decrement = (id) => {
  //   const { cart } = this.state;

  //   for (let i = 0; i < cart.length; i++) {
  //     if (cart[i].id === id && cart[i].quantity > 1) {
  //       cart[i].quantity -= 1;
  //       cart[i].cost = cart[i].quantity * cart[i].price;
  //       this.setState({ cart: cart, loading: false });
  //       return true;
  //     }
  //   }
  //   return;
  // };

  fetchUser = () => {
    this.props.dispatch(getUser());
  };

  componentDidMount() {
    // this.viewCart();
    this.fetch = setInterval(() => this.viewCart(), 1000);
    this.fetchUser();
  }

  componentWillMount() {
    clearInterval(this.fetch);
  }

  render() {
    const { cart, loading, count } = this.state;
    const { user } = this.props;
    let totalCost = 0;
    cart.map((product) => {
      totalCost += product.cost;
    });
    // console.log(cart);
    if (loading) {
      return (
        <React.Fragment>
          <CustomNav />
          <div style={{ marginTop: '20em' }}>
            <Loader />
          </div>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <CustomNav />
          <div className='cart_main'>
            <div className='design_header'>
              <h5 className='section-title h1'>Your Cart</h5>
              <hr className='header_underline' />
            </div>
            {cart && cart.length < 1 ? (
              <div className='empty_cart card'>
                <h3>Nothing in cart</h3>
                <p>Please proceed to add designs to cart</p>
              </div>
            ) : (
              <div>
                {cart &&
                  cart.map(
                    (product) => (
                      <div className='row my-2 text-capitalize  text-center' key={product._id}>
                        <div className='col-10 mx-auto single_product col-lg-2'>
                          <img
                            src={product.image}
                            style={{ width: '5rem', height: '5rem' }}
                            className='img-fluid'
                            alt='product'
                          />
                        </div>
                        <div className='col-10 mx-auto adjust_cart  col-lg-2'>
                          {product.name}
                        </div>
                        <div className='col-10 mx-auto adjust_cart text-white col-lg-2'>
                          <span className=''>price : </span>
                          {product.price}
                        </div>
                        <div className='col-10 mx-auto col-lg-2 my-2 my-lg-0'>
                          <div className='d-flex adjust_btn justify-content-center'>
                            <div>
                              <span
                                className='btn btn-black mx-1'
                                onClick={() => this.adjust(product.id, 'decrement')}
                              >
                                -
                              </span>
                              <span className='btn btn-black mx-1'>
                                {product.quantity}
                              </span>
                              <span
                                className='btn btn-black mx-1'
                                onClick={() => this.adjust(product.id, 'increment')}
                              >
                                +
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className='col-10 adjust_btn mx-auto col-lg-2'>
                          <div className='cart-icon'>
                            <i
                              className='fa fa-trash'
                              onClick={() => this.removeItem(product.id)}
                            />
                          </div>
                        </div>
                        <div className='col-10 adjust_btn text-white mx-auto col-lg-2'>
                          <strong>item total : ₦{product.cost}</strong>
                        </div>
                      </div>
                    )
                  )}
              </div>
            )}
          </div>

          <div className='pay_div'>
            <div className='item_right text-white'>
              <strong>Total items: ₦{totalCost}</strong>
            </div>
            <div className='center_pay'>
              <PaystackButton
                total={totalCost * 100
                }
                email={user.email}
                style={{ textAlign: 'center' }}
                phone={user.phone}
                name={user.name}
                callback={this.callback()}
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
