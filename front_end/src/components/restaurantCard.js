import React, { Component } from "react";

class RestaurantCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="container-fluid">
        <div className="row col-md-12">
          <img src="" alt="Restaurant Image"></img>
        </div>
        <div className="row col-md-12">RestaurantName</div>
        <div className="row col-md-12">Delivery fee</div>
      </div>
    );
  }
}

export default RestaurantCard;
