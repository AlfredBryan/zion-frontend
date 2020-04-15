import React, { Component } from "react";
import CustomNav from "../Navbar/CustomNav";
import Typed from "react-typed";

import "./style.css";

class Home extends Component {
  render() {
    return (
      <React.Fragment>
        <CustomNav />
        <div>
          <img
            className="home_main"
            src={require("../../images/zionbg.jpg")}
            alt="bg_img"
          />
          <div className="desc">
            <h2>Zion Enterprise</h2>
            <h4>We Reach out to the World</h4>
            <div className="react-typed">
              <div className="typed">
                <Typed
                  strings={[
                    "Best sales across Nigeria...",
                    "Try us today we're very affordable...",
                    "We offer you the Best...",
                  ]}
                  typeSpeed={40}
                  backSpeed={50}
                  className="typed-info text-center"
                  loop
                />
              </div>
            </div>
          </div>
        </div>
        <div className="design_header">
          <h5 className="section-title h1">Available Products</h5>
          <hr className="header_underline" />
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
