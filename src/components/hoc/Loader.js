import React, { Component } from "react";
import "./loader.css";

export class Loader extends Component {
  render() {
    return (
      <div className="spinner_wrapper">
        <div className="lds-grid">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }
}

export default Loader;
