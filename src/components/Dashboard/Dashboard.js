import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

import { getUser } from "../../actions/userActions";
import apiUrl from "../../api";

import CustomNav from "../Navbar/CustomNav";
import "./style.css";

class Dashboard extends Component {
  state = {
    orders: [],
  };

  getOrders = () => {
    axios.get(`${apiUrl}/user_order`).then((res) => {
      console.log(res);
    });
  };

  componentDidMount() {
    this.props.dispatch(getUser());
    this.getOrders();
  }

  render() {
    const { user } = this.props;
    return (
      <React.Fragment>
        <CustomNav />
        <div className="container profile_main">
          <div className="dashboard card">
            <div className="display_row">
              <div className="display_p">
                <h5>ACCOUNT DETAILS</h5>
                <hr className="p_hr" />
                <h6>{user.name}</h6>
                <p>{user.email}</p>
              </div>
              <div className="display_p_1">
                <h5>ADDRESS BOOK</h5>
                <hr className="p_hr" />
                <h6>your default shipping address:</h6>
                <span>{user.name}</span>
                <br />
                <span>{user.address}</span>
                <br />
                <span>{user.phone}</span>
              </div>
            </div>
            <div className="design_header">
              <h5 className="order_title h1">User Orders</h5>
              <hr className="header_underline" />
            </div>
            <table id="customers">
              <tr>
                <th>Company</th>
                <th>Contact</th>
                <th>Country</th>
              </tr>
              <tr>
                <td>Alfreds Futterkiste</td>
                <td>Maria Anders</td>
                <td>Germany</td>
              </tr>
              <tr>
                <td>Berglunds snabbköp</td>
                <td>Christina Berglund</td>
                <td>Sweden</td>
              </tr>
              <tr>
                <td>Centro comercial Moctezuma</td>
                <td>Francisco Chang</td>
                <td>Mexico</td>
              </tr>
              <tr>
                <td>Ernst Handel</td>
                <td>Roland Mendel</td>
                <td>Austria</td>
              </tr>
              <tr>
                <td>Island Trading</td>
                <td>Helen Bennett</td>
                <td>UK</td>
              </tr>
              <tr>
                <td>Königlich Essen</td>
                <td>Philip Cramer</td>
                <td>Germany</td>
              </tr>
              <tr>
                <td>Laughing Bacchus Winecellars</td>
                <td>Yoshi Tannamuri</td>
                <td>Canada</td>
              </tr>
              <tr>
                <td>Magazzini Alimentari Riuniti</td>
                <td>Giovanni Rovelli</td>
                <td>Italy</td>
              </tr>
              <tr>
                <td>North/South</td>
                <td>Simon Crowther</td>
                <td>UK</td>
              </tr>
              <tr>
                <td>Paris spécialités</td>
                <td>Marie Bertrand</td>
                <td>France</td>
              </tr>
            </table>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.user,
});

export default connect(mapStateToProps)(Dashboard);
