import React, { Component } from "react";
import "./../../commonCSS.css";
import rest from "./../../Images/rest.jpeg";
import { Redirect } from "react-router";

class RestaurantHome extends React.Component {
  state = {
    img: "",
    redirectToAddDish: false,
  };
  render() {
    let redirectToAddDish = null;
    if (this.state.redirectToAddDish)
      redirectToAddDish = <Redirect to="/restaurant/adddish" />;
    return (
      <div>
        {redirectToAddDish}
        <figure className="figureClass">
          <div className="figureDiv">
            <img className="imginFig" src={rest} />
          </div>
        </figure>
        <div className="imgBck">
          <div className="imgBckspace"></div>
          <div className="imgtxtContainer">
            <div className="imgtxtCo">
              {" "}
              <div className="imgtxtleftspace"></div>
              <div className="imgtxtleftContainer">
                <div className="spacer_40"></div>
                <div>
                  {" "}
                  <h2 style={{ color: "white", marginBottom: "50px" }}>
                    Teriyaki Madness (2020 Wyatt Dr)
                  </h2>
                </div>
              </div>
            </div>
            <div className="imgButtons">
              <button
                className="priceButton"
                onClick={() => this.setState({ redirectToAddDish: true })}
              >
                <div
                  className="row"
                  style={{ padding: "7px", paddingRight: "0px" }}
                >
                  <div className="col-md-2">
                    <svg height="20px" width="20px" viewBox="0 0 24 24">
                      <path d="M9.917 12.417l1.666-1.667c1.25-1.25 1.584-3.167.75-4.833L10.75 2.75 9.083 4.417c-1.25 1.25-1.583 3.166-.75 4.833l1.584 3.167zM13.25 12.417l-1.667 1.666 3.167 1.584c1.583.833 3.5.5 4.833-.75l1.667-1.667-3.167-1.583c-1.666-.834-3.583-.5-4.833.75zM7.333 11L5.75 7.833 4.083 9.5c-1.25 1.25-1.583 3.167-.75 4.833L4.917 17.5l1.666-1.667c1.25-1.333 1.584-3.25.75-4.833zM8.25 17.417l-1.667 1.666 3.167 1.584c1.583.833 3.5.5 4.833-.75l1.667-1.667-3.167-1.583c-1.666-.834-3.583-.5-4.833.75zM19.5 2.833c-2.75 0-5 2.25-5 5V9.5h1.667c2.75 0 5-2.25 5-5V2.833H19.5z"></path>
                    </svg>
                  </div>

                  <div className="col-md-9">Add Dish</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RestaurantHome;
