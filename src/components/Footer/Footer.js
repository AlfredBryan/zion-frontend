import React, { Component } from "react";
import "./style.css";

class Footer extends Component {
  render() {
    return (
      <div>
        <footer class="mainfooter" role="contentinfo">
          <div class="row">
            <div class="col-md-12 copy">
              <p class="text-center">
                &copy; {new Date().getFullYear()}- Zion Globe. All rights
                reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

export default Footer;
