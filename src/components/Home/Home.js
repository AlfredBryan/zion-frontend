import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Typed from "react-typed";

import { fetchProducts, addToCart } from "../../actions/productActions";
import { getUser } from "../../actions/userActions";
import CustomNav from "../Navbar/CustomNav";
import Loader from "../hoc/Loader";
import "./style.css";
import Footer from "../Footer/Footer";

class Home extends Component {
  getProducts = () => {
    this.props.dispatch(fetchProducts());
  };

  fetchUser = () => {
    this.props.dispatch(getUser());
  };

  selected = () =>
    toast.success("Product added to Cart", {
      position: toast.POSITION.TOP_CENTER,
    });

  onAddToCart = (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      this.props.history.replace("/login");
    } else {
      this.props.dispatch(addToCart(id));
      this.selected();
    }
  };

  componentDidMount() {
    this.fetch = setInterval(() => this.getProducts(), 1000);
    this.timer = setInterval(() => this.fetchUser(), 1000);
  }

  componentWillMount() {
    clearInterval(this.fetch);
    clearInterval(this.timer);
  }
  render() {
    const { products, user } = this.props;
    return (
      <React.Fragment>
        <CustomNav />
        <ToastContainer />
        <div>
          <img
            className="home_main"
            src={require("../../images/zionbg.jpg")}
            alt="bg_img"
          />
          <div className="desc">
            <h2>Zion Enterprise</h2>
            <h4>We Reach out to the World</h4>
            <div className="react-typed">
              <div className="typed">
                <Typed
                  strings={[
                    "Best sales across Nigeria...",
                    "Try us today we're very affordable...",
                    "We offer you the Best...",
                  ]}
                  typeSpeed={40}
                  backSpeed={50}
                  className="typed-info text-center"
                  loop
                />
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="design_header">
            <h5 className="section-title h1">Available Products</h5>
            <hr className="header_underline" />
          </div>
          {products.length > 0 ? (
            <div className="row">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="col-xs-12 col-sm-6 col-md-4 display_product"
                >
                  <div className="image-flip">
                    <div className="card">
                      <img
                        className="product_img"
                        src={product.image}
                        alt="card"
                      />
                      <div className="card-body">
                        <h4 className="card-title text-uppercase">
                          {product.product_name}
                        </h4>
                        <h6>₦{product.price}</h6>
                        <p>{product.description}</p>
                        <span>
                          <Button
                            onClick={() => {
                              this.onAddToCart(product._id);
                            }}
                            variant="contained"
                            color="secondary"
                            className="add_cart"
                            disabled={user && product.picked.includes(user._id)}
                          >
                            ADD TO CART
                          </Button>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <Loader />
          )}
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.products.products,
  user: state.user.user,
});

export default connect(mapStateToProps)(Home);
