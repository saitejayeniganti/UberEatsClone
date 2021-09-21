import React, { Component } from "react";
import { Route } from "react-router-dom";
import CountryCode from "../components/countryCode";
import CustomerLogin from "../components/customer/customerLogin";
import CustomerSignup from "../components/customer/customerSignUp";
import CustomerHome from "../components/customerHome/customerHome";
import NavBar from "../components/navbar";
import RestaurantLogin from "../components/restaurant/restaurantLogin";
import RestaurantAddDish from "../components/restaurantAddDish/restaurantAddDish";
import RestaurantCard from "../components/restaurantCard/restaurantCard";
import RestaurantSignup from "../components/restaurantSignup/restaurantSignup";
// import Uploadfile from "../components/imageUpload/imageUpload";
import RestaurantHome from "../components/restaurantHome/restaurantHome";
import RestaurantDetails from "../components/restaurantDetails/restaurantDetails";

class Routes extends Component {
  render() {
    return (
      <div>
        <Route path="/" component={NavBar} />
        <Route path="/customerlogin" component={CustomerLogin} />
        <Route path="/customerSignup" component={CustomerSignup} />
        <Route path="/customer/home" component={CustomerHome} />
        <Route path="/restaurant/login" component={RestaurantLogin} />
        <Route path="/restaurant/signup" component={RestaurantSignup} />
        <Route path="/restaurant/addDish" component={RestaurantAddDish} />
        <Route path="/restaurant/home" component={RestaurantHome} />
        <Route path="/restaurant/details" component={RestaurantDetails} />
        <Route path="/cc" component={RestaurantHome} />
      </div>
    );
  }
}

export default Routes;
