import React, { Component } from "react";
import "./../../commonCSS.css";
import { Redirect } from "react-router";
import axios from "axios";
import { Link } from "react-scroll";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import dishIcon from "../../Images/bowl.svg";
import zIndex from "@mui/material/styles/zIndex";

class RestaurantHome extends React.Component {
  state = {
    restaurantDetails: JSON.parse(sessionStorage.getItem("restaurantDetails")),
    redirectToAddDish: false,
    dishes: {},
  };

  componentDidMount() {
    axios
      .get(
        process.env.REACT_APP_UBEREATS_BACKEND_URL +
          "/restaurant/dishes?id=" +
          this.state.restaurantDetails.id
      )
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          console.log("Restaurant dishes are retrieved");
        }
        let dishesSubCat = {};
        for (let dish of response.data) {
          // console.log(dish.category);
          if (!dishesSubCat[dish.category]) dishesSubCat[dish.category] = [];
          dishesSubCat[dish.category].push(dish);
        }
        this.setState({
          dishes: dishesSubCat,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  renderDishes = () => {
    let headers = Object.keys(this.state.dishes);
    return (
      <>
        <div
          className="row"
          style={{
            // zIndex: "3",
            // position: "fixed",
            // top: "25px",
            // left: "0px",
            // width: "100%",
            // paddingLeft: "30px",
            top: 0,
            position: "-webkit-sticky",
            position: "sticky",
            zIndex: "100",
            backgroundColor: "white",
          }}
        >
          <ul
            style={{
              display: "flex",
              listStyle: "none",
              justifyContent: "left",
              marginTop: "20px",
            }}
          >
            {headers.map((header) => {
              return (
                <>
                  <li className="categoryTxt" style={{ paddingRight: "50px" }}>
                    <Link to={header} spy={true} smooth={false} duration={1000}>
                      <label>{header}</label>
                    </Link>
                  </li>
                </>
              );
            })}
          </ul>
          <hr className="horizontalRule"></hr>
        </div>

        <div style={{ position: "relative" }}>
          {headers.map((header) => {
            return (
              <>
                <div class="row" id={header} style={{ marginTop: "30px" }}>
                  <label className="categorySubtxt">{header}</label>

                  {this.state.dishes[header].map((dish) => {
                    return (
                      <>
                        <div
                          class="col-md-4"
                          style={{ padding: "10px", paddingBottom: "20px" }}
                        >
                          <Card
                            sx={{
                              display: "flex",
                              height: "160px",
                              width: "560px",
                              marginRight: "20px",
                              maxWidth: "100%",
                            }}
                          >
                            <CardContent
                              sx={{ flex: "1 0 auto", width: "360px" }}
                            >
                              <div className="row" style={{ height: "100px" }}>
                                <div
                                  className="row categoryTxt"
                                  style={{
                                    paddingLeft: "25px",
                                    height: "auto",
                                  }}
                                >
                                  {dish.name}
                                </div>
                                <div
                                  className="row addressTxt"
                                  style={{
                                    paddingLeft: "25px",
                                    color: "#545454",
                                    fontSize: "14px",
                                  }}
                                >
                                  {dish.description}..
                                </div>
                              </div>

                              {/* <div
                                className="row"
                                style={{ height: "60px" }}
                              ></div> */}
                              <div
                                className="row"
                                style={{ height: "30px", padding: "10px" }}
                              >
                                <div
                                  className="row"
                                  style={{ paddingLeft: "15px" }}
                                >
                                  ${dish.price}
                                </div>
                              </div>
                            </CardContent>
                            <CardMedia
                              component="img"
                              sx={{ width: 151 }}
                              image={dish.image_url}
                            />
                          </Card>
                        </div>
                      </>
                    );
                  })}
                </div>
              </>
            );
          })}
        </div>
      </>
    );
  };

  render() {
    let redirectToAddDish = null;
    if (this.state.redirectToAddDish)
      redirectToAddDish = <Redirect to="/restaurant/adddish" />;
    return (
      <>
        {redirectToAddDish}
        <div>
          <figure className="figureClass">
            <div className="figureDiv">
              <img
                className="imginFig"
                src={this.state.restaurantDetails.image_url}
              />
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
                    <h2 style={{ color: "white", marginBottom: "50px" }}>
                      {this.state.restaurantDetails.name +
                        " (" +
                        this.state.restaurantDetails.location.split(",")[0] +
                        ")"}
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
                      <img
                        style={{
                          height: "20px",
                          width: "20px",
                        }}
                        src={dishIcon}
                      />
                    </div>

                    <div className="col-md-9">Add Dish</div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            marginLeft: "2%",
            marginRight: "2%",
          }}
        >
          <div style={{ padding: "10px" }}>
            <div className="row">
              <label className="addressTxt">
                {this.state.restaurantDetails.location}
              </label>
            </div>
            {this.renderDishes()}
          </div>
        </div>
      </>
    );
  }
}

export default RestaurantHome;
