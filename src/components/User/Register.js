import React, { Component } from "react";
import { Link } from "react-router-dom";

import states from "../../state";
import "./style.css";

class Register extends Component {
  state = {
    name: "",
    state: "",
    address: "",
    phone: "",
    password: "",
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { name, state, address, phone, password } = this.state;
    return (
      <div>
        <main className="container my-5">
          <div className="row">
            <section className="col-md-6 my-5 offset-md-3">
              <div className="card shadow p-5">
                <form>
                  <h3 className="text-center text-uppercase mb-4">SIGN UP</h3>
                  <hr className="login_hr" />

                  <div class="form-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      placeholder="Full Name"
                      className="form-control login_input"
                      name="name"
                      value={name}
                      onChange={this.handleChange}
                    />
                  </div>

                  <div class="form-group">
                    <label>Phone</label>
                    <input
                      type="phone"
                      placeholder="Phone Number"
                      class="form-control login_input"
                      name="phone"
                      value={phone}
                      onChange={this.handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>State</label>
                    <select
                      id="user_time_zone"
                      name="state"
                      className="form-control login_input"
                      value={state}
                      onChange={this.handleChange}
                    >
                      <option value="">--Select--</option>
                      {states.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div class="form-group">
                    <label>Address</label>
                    <input
                      type="text"
                      placeholder="Address"
                      class="form-control login_input"
                      name="address"
                      value={address}
                      onChange={this.handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>Password</label>
                    <input
                      type="password"
                      placeholder="Password"
                      className="form-control login_input"
                      name="password"
                      value={password}
                      onChange={this.handleChange}
                    />
                  </div>

                  <button className="btn btn_login btn-block btn-secondary rounded-pill mt-3">
                    Sign Up
                  </button>

                  <p className="mt-3 text-white">
                    Already have an Account ?
                    <Link to="/login" className="text-white">
                      Login Here
                    </Link>
                  </p>
                </form>
              </div>
            </section>
          </div>
        </main>
      </div>
    );
  }
}

export default Register;
