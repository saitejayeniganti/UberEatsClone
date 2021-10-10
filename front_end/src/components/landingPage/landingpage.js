import React, { Component } from "react";
import img1 from "../../Images/img1.svg";
import img2 from "../../Images/img2.svg";
import "./landingpage.css";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
class LandingPage extends React.Component {
  state = {
    redireToRestaurants: false,
    redirectToUsers: false,
  };
  render() {
    let redireToRestaurants = null;
    if (this.state.redireToRestaurants) {
      redireToRestaurants = <Redirect to="/restaurant/login" />;
    }
    let redirectToUsers = null;
    if (this.state.redirectToUsers) {
      redirectToUsers = <Redirect to="/customer/login" />;
    }
    return (
      <div>
        {redireToRestaurants}
        {redirectToUsers}
        <div className="c1">
          <div className="c2">
            <img
              alt="Order food to your door"
              role="img"
              src={img1}
              className="imgl1"
            />
            <div className="c3"></div>
            <img
              alt="Order food to your door"
              role="img"
              src={img2}
              className="imgl1"
            ></img>
          </div>
        </div>
        <div className="c4">
          <div className="c5">
            {/* <h1 className="c6">Order food to your door</h1> */}
          </div>
        </div>
        <div
          style={{
            backgroundColor: "#eeeeee",
            width: "210px",
            padding: "15px",
            fontWeight: 700,
            borderRadius: "25px",
            position: "relative",
            top: "-600px",
            left: "80%",
            cursor: "pointer",
          }}
          onClick={() => {
            this.setState({ redireToRestaurants: true });
          }}
        >
          Sign in as Restaurants
        </div>
        <div
          style={{
            backgroundColor: "#eeeeee",
            width: "150px",
            padding: "15px",
            fontWeight: 700,
            borderRadius: "25px",
            position: "relative",
            top: "-655px",
            left: "70%",
            cursor: "pointer",
          }}
          onClick={() => {
            this.setState({ redirectToUsers: true });
          }}
        >
          Sign in as User
        </div>
      </div>
    );
  }
}

export default LandingPage;
