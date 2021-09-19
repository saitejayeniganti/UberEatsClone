import React, { Component } from "react";
import { Route } from "react-router-dom";
import CountryCode from "../components/countryCode";
import CustomerLogin from "../components/customer/customerLogin";
import CustomerSignup from "../components/customer/customerSignUp";
import CustomerHome from "../components/customerHome/customerHome";
import NavBar from "../components/navbar";
import RestaurantLogin from "../components/restaurant/restaurantLogin";
import RestaurantCard from "../components/restaurantCard/restaurantCard";
import RestaurantSignup from "../components/restaurantSignup/restaurantSignup";

class Routes extends Component {
  render() {
    return (
      <div>
        <Route path="/" component={NavBar} />
        <Route path="/customerlogin" component={CustomerLogin} />
        <Route path="/customerSignup" component={CustomerSignup} />
        <Route path="/customer/home" component={CustomerHome} />
        <Route path="/cc" component={RestaurantCard} />
        <Route path="/restaurantlogin" component={RestaurantLogin} />
        <Route path="/restaurantsignup" component={RestaurantSignup} />
      </div>
    );
  }
}

export default Routes;
