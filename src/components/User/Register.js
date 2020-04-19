import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { userRegister } from "../../actions/userActions";
import Spinner from "../hoc/Spinner";
import states from "../../state";
import "./style.css";

class Register extends Component {
  state = {
    name: "",
    state: "",
    address: "",
    phone: "",
    email: "",
    password: "",
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSignUp = (e) => {
    e.preventDefault();
    const data = this.state;
    this.props.dispatch(userRegister(data));
  };

  render() {
    const { name, state, address, phone, email, password } = this.state;
    const { loading, error } = this.props;
    console.log(error);
    return (
      <div>
        <main className="container my-5">
          <div className="row">
            <section className="col-md-6 my-5 offset-md-3">
              <div className="card shadow p-5">
                <form onSubmit={this.onSignUp}>
                  <h3 className="text-center text-uppercase mb-4">SIGN UP</h3>
                  <hr className="login_hr" />
                  {error !== null ? (
                    <p style={{ color: "red" }} className="mt-3">
                      please enter all fields ***
                    </p>
                  ) : (
                    ""
                  )}
                  <div className="form-group">
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

                  <div className="form-group">
                    <label>Phone</label>
                    <input
                      type="text"
                      placeholder="Phone Number"
                      className="form-control login_input"
                      name="phone"
                      value={phone}
                      onChange={this.handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="text"
                      placeholder="Email Address"
                      className="form-control login_input"
                      name="email"
                      value={email}
                      onChange={this.handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>State</label>
                    <select
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

                  <div className="form-group">
                    <label>Address</label>
                    <textarea
                      type="text"
                      placeholder="Address"
                      className="form-control login_input"
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

                  <button
                    type="submit"
                    className="btn btn_login btn-block btn-secondary rounded-pill mt-3"
                  >
                    {loading ? <Spinner /> : "Sign Up"}
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

const mapStateToProps = (state) => ({
  loading: state.user.loading,
  error: state.user.error,
});

export default connect(mapStateToProps)(Register);
