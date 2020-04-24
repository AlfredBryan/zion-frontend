import React, { Component } from "react";
//import the library
import PaystackButton from "react-paystack";
import { withRouter } from "react-router-dom";

class App extends Component {
  state = {
    key: process.env.REACT_APP_PUBLIC_KEY,
  };

  close = () => {
    console.log("Payment closed");
  };

  getReference = () => {
    //you can put any unique reference implementation code here
    let text = "";
    let possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-.=";

    for (let i = 0; i < 15; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  };

  render() {
    return (
      <div>
        <p>
          <PaystackButton
            text="Make Payment"
            class="payButton"
            callback={this.props.callback}
            close={this.close}
            embed={false}
            reference={this.getReference()}
            email={this.props.email}
            amount={this.props.total}
            paystackkey={this.state.key}
            tag="button"
            firstname={this.props.name}
            metadata={this.metadata}
          />
        </p>
      </div>
    );
  }
}

export default withRouter(App);
