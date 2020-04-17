import React, { Component } from "react";
import "./spinner.css";

export class Spinner extends Component {
  render() {
    return (
      <div className="spinner_wrapper">
        <div className="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }
}

export default Spinner;
