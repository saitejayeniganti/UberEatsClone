import React, { Component } from "react";
import "./../../commonCSS.css";
import { Redirect } from "react-router";
import axios from "axios";
import { Link } from "react-scroll";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import tagIcon from "../../Images/tag.png";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import "./customerRestaurant.css";

class RestaurantView extends React.Component {
  state = {
    selectedDish: "",
    restaurantDetails: this.props.location.state.restaurant,
    openModel: false,
    dishes: {},
    items: "1",
    singleDishPrice: "",
    totalDishPrice: "",
    cart: {},
  };

  handleOpen = (dish) => {
    this.setState({ singleDishPrice: dish.price });
    this.setState({ totalDishPrice: dish.price, items: 1 });
    this.setState({ selectedDish: dish });
    this.setState({ openModel: true });
  };
  handleClose = () => this.setState({ openModel: false });

  handleRemoveItem = () => {
    let numberOfItems = parseInt(this.state.items);

    if (numberOfItems == 1) return;
    else {
      this.setState({
        items: parseInt(this.state.items) - 1,
        totalDishPrice:
          parseFloat(this.state.totalDishPrice) -
          parseFloat(this.state.singleDishPrice),
      });
    }
  };
  handleAddItem = () => {
    this.setState({
      items: parseInt(this.state.items) + 1,
      totalDishPrice:
        parseFloat(this.state.totalDishPrice) +
        parseFloat(this.state.singleDishPrice),
    });
  };

  addToCart = () => {
    let orderDetails = {
      customer_id: JSON.parse(sessionStorage.getItem("customerDetails")).id,
      restaurant_id: this.state.restaurantDetails.id,
      price: 0,
      order_date: "",
      delivery_type: "Order",
      order_status: "InCart",
    };

    axios
      .post(
        process.env.REACT_APP_UBEREATS_BACKEND_URL + "/customer/order",
        orderDetails
      )
      .then((response) => {
        console.log(response.data);
        this.setState({ openModel: false });
      })
      .catch((err) => {
        console.log(err);
      });

    // let dishDetails={
    //     order_id:
    //     customer_id:
    //     restaurent_id;
    //     dish_id:
    //     quantity:
    // }
    // let cartDetails = {
    //   customer_id: JSON.parse(sessionStorage.getItem("customerDetails")).id,
    //   restaurant_id: this.state.restaurantDetails.id,
    // };
  };

  renderModel = (selectedDish) => {
    return (
      <>
        <Modal open={this.state.openModel} onClose={this.handleClose}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "white",
              width: "676px",
              //   border: "2px solid #000",
              boxShadow: "24",
            }}
          >
            <div
              className="row"
              style={{
                height: "400px",
                justifyContent: "center",
                display: "flex",
              }}
            >
              <img
                style={{
                  height: "400px",
                  width: "auto",
                  objectFit: "cover",
                  height: "100%",
                  width: "100%",
                }}
                src={selectedDish.image_url}
              />
            </div>
            <div
              className="row"
              style={{
                width: "64px",
                position: "relative",
                top: "-390px",
              }}
            >
              <svg
                width="24px"
                height="24px"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  d="m19.5831 6.24931-1.8333-1.83329-5.75 5.83328-5.75-5.83328-1.8333 1.83329 5.8333 5.74999-5.8333 5.75 1.8333 1.8333 5.75-5.8333 5.75 5.8333 1.8333-1.8333-5.8333-5.75z"
                  fill="#000000"
                ></path>
              </svg>
            </div>
            <div
              className="row"
              style={{
                fontSize: "32px",
                paddingLeft: "35px",
                fontWeight: "500",
              }}
            >
              {selectedDish.name}
            </div>
            <div
              className="row"
              style={{
                fontSize: "16px",
                paddingLeft: "35px",
                color: "#545454",
              }}
            >
              {selectedDish.description}
            </div>
            <hr></hr>
            <div
              className="row"
              style={{
                paddingLeft: "35px",
                paddingBottom: "20px",
              }}
            >
              <button className="modalButton" onClick={this.handleRemoveItem}>
                <svg
                  aria-hidden="true"
                  focusable="false"
                  viewBox="0 0 24 24"
                  className="svgBtnStyle"
                >
                  <path d="M19.333 11H4.667v2h14.666z"></path>
                </svg>
              </button>
              <div
                style={{
                  width: "auto",
                }}
              >
                {this.state.items}
              </div>

              <button className="modalButton" onClick={this.handleAddItem}>
                <svg
                  aria-hidden="true"
                  focusable="false"
                  viewBox="0 0 24 24"
                  className="svgBtnStyle"
                >
                  <path d="M19.333 11H13V4.665h-2v6.333H4.667v2H11v6.334h2v-6.334h6.333z"></path>
                </svg>
              </button>

              <button className="blkButton" onClick={this.addToCart}>
                <div className="row">
                  <div className="col-md-4"></div>
                  <div className="col-md-5">
                    Add {this.state.items} to order
                  </div>
                  <div className="col-md-3" style={{ textAlign: "right" }}>
                    ${this.state.totalDishPrice}
                  </div>
                </div>
              </button>
            </div>
          </Box>
        </Modal>
      </>
    );
  };

  componentDidMount() {
    // console.log(this.state.restaurantDetails);
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
        console.log(1);
        console.log(this.state.restaurantDetails);
        let dishesSubCat = {};
        for (let dish of response.data) {
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
                          onClick={() => this.handleOpen(dish)}
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
                              sx={{ flex: "1 0 auto", width: "350px" }}
                            >
                              <div className="row" style={{ height: "100px" }}>
                                <div
                                  className="row categoryTxt2"
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
                              sx={{ width: 161 }}
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
    return (
      <>
        {this.renderModel(this.state.selectedDish)}
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
                    <h2 style={{ color: "white", marginBottom: "10px" }}>
                      {this.state.restaurantDetails.name +
                        " (" +
                        this.state.restaurantDetails.location.split(",")[0] +
                        ")"}
                    </h2>
                    <div
                      style={{
                        fontSize: "16px",
                        fontWeight: "400",
                        marginBottom: "20px",
                      }}
                    >
                      <img
                        src={tagIcon}
                        style={{ width: "14px", height: "14px" }}
                      />
                      &nbsp;•&nbsp;
                      {Math.floor(this.state.restaurantDetails.distance) <
                      15 ? (
                        <>
                          ${Math.floor(this.state.restaurantDetails.distance)}
                          &nbsp;Delivery fee&nbsp;•&nbsp;
                          <label
                            style={{
                              fontSize: "16px",
                              //   color: "rgb(117, 117, 117)",
                            }}
                          >
                            {Math.ceil(
                              Math.ceil(
                                (0.621 *
                                  this.state.restaurantDetails.distance) /
                                  0.666
                              ) / 5
                            ) * 5}
                            -
                            {Math.ceil(
                              Math.ceil(
                                (0.621 *
                                  this.state.restaurantDetails.distance) /
                                  0.666
                              ) / 5
                            ) *
                              5 +
                              10}
                            Min
                          </label>
                        </>
                      ) : (
                        "Cannot be delivered to your location"
                      )}
                    </div>
                  </div>
                </div>
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
              <label
                className="addressTxt"
                style={{ color: "#545454", fontSize: "14px" }}
              >
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

export default RestaurantView;
