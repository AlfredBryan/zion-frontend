import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
} from "reactstrap";

import "./style.css";

class CustomNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      cart: [],
      user: "",
    };
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  render() {
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
              <img className="logo_resize" src={require("../../images/logo.jpeg")} alt="logo"/>
            </NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="mr-auto" navbar>
                <NavItem className="nav_items">
                  <Link to="/add_products">Products</Link>
                </NavItem>
                <NavItem className="nav_items">
                  <Link to="/about_us">About Us</Link>
                </NavItem>
                <NavItem className="nav_items">
                  <Link to="/cart">
                    <div className="cart_details">
                      <i className="fa fa-shopping-cart cart">
                        <div className="cart_item">
                          <p>0</p>
                        </div>
                      </i>
                    </div>
                  </Link>
                </NavItem>
              </Nav>
              <form class="form-inline my-2 my-lg-0 nav_input">
                <input
                  class="form-control mr-sm-2"
                  type="search"
                  placeholder="Search Products"
                  aria-label="Search"
                />
                <button
                  class="btn btn-outline-success my-2 my-sm-0"
                  type="submit"
                >
                  Search
                </button>
              </form>
            </Collapse>
          </Navbar>
        </div>
      </React.Fragment>
    );
  }
}

export default CustomNav;
