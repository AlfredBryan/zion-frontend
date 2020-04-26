import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Spinner from "../hoc/Spinner";
import "./style.css";
import apiUrl from "../../api";

class Login extends Component {
  state = {
    phone: "",
    password: "",
    loading: false,
    error: null,
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onLogin = (e) => {
    e.preventDefault();
    const { phone, password } = this.state;
    this.setState({
      loading: true,
    });
    axios
      .post(`${apiUrl}/user_login`, {
        phone,
        password,
      })
      .then((res) => {
        console.log(res)
        if (res.status === 200) {
          localStorage.setItem("token", res.data.token);
          this.setState({
            loading: false,
          });
          this.props.history.push("/");
        }
      })
      .catch((err) => {
        this.setState({
          error: "invalid user or password",
          loading: false,
        });
      });
  };

  render() {
    const { phone, password, error, loading } = this.state;
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

export default Login;
