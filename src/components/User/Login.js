import React, { Component } from "react";
import { Link } from "react-router-dom";

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

  render() {
    const { phone, password } = this.state;
    return (
      <div>
        <main class="container my-5">
          <div class="row">
            <section class="col-md-6 my-5 offset-md-3">
              <div class="card shadow p-5">
                <form>
                  <h3 class="text-center text-uppercase mb-4">Login</h3>
                  <hr className="login_hr" />

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

                  <div class="form-group">
                    <label>Password</label>
                    <input
                      type="password"
                      placeholder="Password"
                      class="form-control login_input"
                      name="password"
                      value={password}
                      onChange={this.handleChange}
                    />
                  </div>

                  <button class="btn btn_login btn-block btn-secondary rounded-pill mt-3">
                    Login
                  </button>

                  <p class="mt-3 text-white">
                    Don't have an Account ?
                    <Link to="/sign_up" class="text-white">
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
