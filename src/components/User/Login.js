import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { userLogin } from "../../actions/userActions";
import Spinner from "../hoc/Spinner";
import "./style.css";

class Login extends Component {
  state = {
    phone: "",
    password: "",
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onLogin = (e) => {
    e.preventDefault();
    const data = this.state;
    this.props.dispatch(userLogin(data));
  };

  render() {
    const { phone, password } = this.state;
    const { loading, error } = this.props;
    return (
      <div>
        <main className="container my-5">
          <div className="row">
            <section className="col-md-6 my-5 offset-md-3">
              <div className="card shadow p-5">
                <form onSubmit={this.onLogin}>
                  <h3 className="text-center text-uppercase mb-4">Login</h3>
                  <hr className="login_hr" />
                  {error !== null ? (
                    <p style={{ color: "red" }} className="mt-3">
                      invalid user or password
                    </p>
                  ) : (
                    ""
                  )}
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
                    {loading ? <Spinner /> : "Login"}
                  </button>

                  <p className="mt-3 text-white">
                    Don't have an Account ?
                    <Link to="/sign_up" className="text-white">
                      Create Here
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

export default connect(mapStateToProps)(Login);
