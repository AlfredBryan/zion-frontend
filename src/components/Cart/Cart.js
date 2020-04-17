import React, { Component } from "react";
import { connect } from "react-redux";

import Loader from "../hoc/Loader";
import CustomNav from "../Navbar/CustomNav";
import { fetchCart } from "../../actions/productActions";

class Cart extends Component {
  getCart = () => {
    this.props.dispatch(fetchCart());
  };

  componentDidMount() {
    this.fetch = setInterval(() => this.getCart(), 1000);
  }

  componentWillMount() {
    clearInterval(this.fetch);
  }

  render() {
    const { cart } = this.props;
    console.log(cart);
    return (
      <React.Fragment>
        <CustomNav />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  cart: state.products.cart,
});

export default connect(mapStateToProps)(Cart);
