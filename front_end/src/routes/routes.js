import React, { Component } from "react";
import { Route } from "react-router-dom";
import CustomerLogin from "../components/customer/customerLogin";
import CustomerHome from "../components/customerHome/customerHome";
import NavBar from "../components/navbar";

class Routes extends Component {
  render() {
    return (
      <div>
        <Route path="/" component={NavBar} />
        <Route path="/customerlogin" component={CustomerLogin} />
        <Route path="/customer/home" component={CustomerHome} />
      </div>
    );
  }
}

export default Routes;
