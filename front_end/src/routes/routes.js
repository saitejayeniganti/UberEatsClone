import React, { Component } from "react";
import { Route } from "react-router-dom";
import NavBar from "../components/navbar";

class Routes extends Component {
  render() {
    return (
      <div>
        <Route path="/" component={NavBar} />
      </div>
    );
  }
}

export default Routes;
