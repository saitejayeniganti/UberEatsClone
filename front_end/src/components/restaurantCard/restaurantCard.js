import React, { Component } from "react";
import rest from "../../Images/rest.jpeg";
import "./restaurantCard.css";

class RestaurantCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="container-fluid">
        <div className="row col-md-12">
          <img className="imgSize" src={rest} alt="Restaurant Image"></img>
        </div>

        <div className="row col-md-12">RestaurantName</div>
        <div className="row col-md-12">Delivery fee</div>
      </div>
    );
  }
}

export default RestaurantCard;
