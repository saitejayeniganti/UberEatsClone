import React, { Component } from "react";
import { Route } from "react-router-dom";
import CustomerLogin from "../components/customer/customerLogin";
import NavBar from "../components/navbar";

class Routes extends Component {
  render() {
    return (
      <div>
        <Route path="/" component={NavBar} />
        <Route path="/customerlogin" component={CustomerLogin} />
      </div>
    );
  }
}

export default Routes;
