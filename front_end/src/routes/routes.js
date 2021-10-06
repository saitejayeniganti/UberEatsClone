import React, { Component } from "react";
import { Route } from "react-router-dom";
import CountryCode from "../components/countryCode";
import CustomerLogin from "../components/customer/customerLogin";
import CustomerSignup from "../components/customer/customerSignUp";
import CustomerHome from "../components/customerHome/customerHome";
import RestaurantLogin from "../components/restaurant/restaurantLogin";
import RestaurantAddDish from "../components/restaurantAddDish/restaurantAddDish";
import RestaurantSignup from "../components/restaurantSignup/restaurantSignup";
import RestaurantHome from "../components/restaurantHome/restaurantHome";
import RestaurantDetails from "../components/restaurantDetails/restaurantDetails";
import RestaurantSideBar from "../components/restaurantDrawer/restaurantDrawer";
import CustomerSideBar from "../components/customerDrawer/customerDrawer";
import RestaurantFooter from "../components/footer/restaurantFooter";
import CustomerFooter from "../components/footer/customerFooter";
import CustomerDetails from "../components/customerDetails/customerDetails";
import CountryName from "../components/countryName/countryName";
import LocationSearchInput from "../components/locationAutoComplete/locationAuto";
import RestaurantView from "../components/customerRestaurant/customerRestaurant";
import RestaurantOrders from "../components/restaurantOrders/restaurantOrders";
import CustomerOrders from "../components/CustomerOrders/customerOrders";

class Routes extends Component {
  render() {
    return (
      <div>
        <Route path="/restaurant" component={RestaurantSideBar} />
        <Route path="/restaurant/signup" component={RestaurantSignup} />
        <Route path="/restaurant/addDish" component={RestaurantAddDish} />
        <Route path="/restaurant/home" component={RestaurantHome} />
        <Route path="/restaurant/details" component={RestaurantDetails} />
        <Route path="/restaurant/login" component={RestaurantLogin} />
        <Route path="/restaurant/orders" component={RestaurantOrders} />
        <Route path="/footer" component={RestaurantFooter} />

        <Route path="/customer" component={CustomerSideBar} />
        <Route path="/customer/login" component={CustomerLogin} />
        <Route path="/customer/signup" component={CustomerSignup} />
        <Route path="/customer/details" component={CustomerDetails} />
        <Route path="/customer/home" component={CustomerHome} />
        <Route path="/customerfoot" component={CustomerFooter} />
        <Route path="/cc" component={CustomerOrders} />
        <Route path="/customer/restaurant" component={RestaurantView} />
      </div>
    );
  }
}

export default Routes;
