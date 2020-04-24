import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import "./style.css";
import apiUrl from "../../api";
import token from "../../token";

class CustomNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      cart: [],
    };
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  logOut = () => {
    localStorage.clear("token");
    this.props.history.push("/login");
  };

  viewCart = () => {
    const products = [];
    axios
      .get(`${apiUrl}/cart`, {
        headers: {
          token: token,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          // console.log(res.data);
          res.data.data.map((product) => {
            return products.push(product);
          });
          this.setState({ cart: products, loading: false });
          // this.setState({ cart: res.data.cart, loading: false });
        }
      })
      .catch((error) => {
        if (error) {
          this.setState({ loading: false });
        }
      });
  };

  componentDidMount() {
    this.timer = setInterval(() => this.viewCart(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const { cart } = this.state;
    return (
      <React.Fragment>
        <div>
          <Navbar
            className="navbar_adjust"
            color="light"
            light
            expand="md"
            fixed="top"
          >
            <NavbarBrand href="/">
              <img
                className="logo_resize"
                src={require("../../images/logo.jpeg")}
                alt="logo"
              />
            </NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="mr-auto" navbar>
                <NavItem className="nav_items">
                  <Link to="/add_products">Products</Link>
                </NavItem>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    <i className="fa fa-user user-icon"></i>
                  </DropdownToggle>
                  <DropdownMenu right>
                    <Link to="/dashboard">
                      <DropdownItem>Profile</DropdownItem>
                    </Link>
                    <DropdownItem>
                      {token ? (
                        <div onClick={this.logOut}>
                          <span className="logout_button">LogOut</span>
                          <i className="fa fa-power-off"></i>
                        </div>
                      ) : (
                        <Link to="/sign_in">
                          <span className="logout_button">Sign In</span>
                          <i className="fa fa fa-sign-in"></i>
                        </Link>
                      )}
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>

                {token ? (
                  <NavItem className="nav_items">
                    <Link to="/cart">
                      <div className="cart_details">
                        <i className="fa fa-shopping-cart cart">
                          <div className="cart_item">
                            <p>{cart.length}</p>
                          </div>
                        </i>
                      </div>
                    </Link>
                  </NavItem>
                ) : (
                  ""
                )}
              </Nav>
              {/* <form className="form-inline my-2 my-lg-0 nav_input">
                <input
                  className="form-control mr-sm-2"
                  type="search"
                  placeholder="Search Products"
                  aria-label="Search"
                />
                <button
                  className="btn btn-outline-success my-2 my-sm-0"
                  type="submit"
                >
                  Search
                </button>
              </form> */}
            </Collapse>
          </Navbar>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(CustomNav);
