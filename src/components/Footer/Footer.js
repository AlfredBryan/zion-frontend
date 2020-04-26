import React, { Component } from "react";
import "./style.css";

class Footer extends Component {
  render() {
    return (
      <div>
        <footer className="mainfooter" role="contentinfo">
          <div className="row">
            <div className="col-md-12 copy">
              <p className="text-center">
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
