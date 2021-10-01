import React, { Component } from "react";
import { Redirect } from "react-router";
import axios from "axios";
import { Link } from "react-scroll";
import "./../../commonCSS.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

class RestaurantOrders extends React.Component {
  state = {
    restaurantDetails: JSON.parse(sessionStorage.getItem("restaurantDetails")),
    orders: {},
    dishMapping: {},
    openModel: false,
    selectedOrderId: "",
  };

  handleOpen = (order) => {
    this.setState({ selectedOrderId: order.id, openModel: true });
  };
  handleClose = () => {
    this.setState({ openModel: false, selectedOrderId: "" });
  };

  componentDidMount() {
    axios
      .get(
        process.env.REACT_APP_UBEREATS_BACKEND_URL +
          "/restaurant/order?id=" +
          this.state.restaurantDetails.id
      )
      .then((response) => {
        if (response.status === 200) {
          //   console.log(response.data);
          console.log("Restaurant Orders are retrieved");
        }
        let ordersSubCat = {};
        let dishMapping = {};
        for (let order of response.data) {
          if (!ordersSubCat[order.order_status]) {
            ordersSubCat[order.order_status] = [];
            ordersSubCat[order.order_status].push(order);
          }
          if (!dishMapping[order.id]) {
            dishMapping[order.id] = [];
          }
          dishMapping[order.id].push(order);
        }
        this.setState({
          orders: ordersSubCat,
        });
        this.setState({
          dishMapping: dishMapping,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  orderModal = (id) => {
    let currentOrder = this.state.dishMapping[id];
    return (
      <>
        <Modal open={this.state.openModel} onClose={this.handleClose}>
          <Box
            sx={{
              position: "absolute",
              top: "40%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "white",
              width: "400px",
              boxShadow: "24",
              padding: "40px",
              borderRadius: "10px",
            }}
          >
            <div className="col-md-12" style={{ textAlign: "center" }}>
              <label className="orderModal">Order Details</label>
            </div>
            <div className="orderModalHeading" style={{ display: "flex" }}>
              <div className="col-md-9">Item</div>
              <div
                className="col-md-4"
                style={{ display: "flex", justifyContent: "center" }}
              >
                Quantity
              </div>
            </div>

            {currentOrder === undefined
              ? ""
              : currentOrder.map((dish) => {
                  return (
                    <>
                      <div
                        className="orderModalDish"
                        style={{ display: "flex" }}
                      >
                        <div className="col-md-9">{dish.dish_name}</div>
                        <div
                          className="col-md-4"
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          {dish.quantity}
                        </div>
                      </div>
                    </>
                  );
                })}
            <div style={{ display: "flex" }}>
              <div className="col-md-5">
                <button className="changeStatusBtn"> Confirm</button>
              </div>
              <div className="col-md-2"></div>
              <div className="col-md-5">
                <button className="changeStatusBtn"> Cancel</button>
              </div>
            </div>
          </Box>
        </Modal>
      </>
    );
  };

  renderOrders = () => {
    {
      let headers = Object.keys(this.state.orders);
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
                    <li
                      key={header}
                      className="categoryTxt"
                      style={{ paddingRight: "50px" }}
                    >
                      <Link
                        to={header}
                        spy={true}
                        smooth={false}
                        duration={1000}
                      >
                        <label>{header}</label>
                      </Link>
                    </li>
                  </>
                );
              })}
            </ul>
            <hr className="horizontalRule"></hr>
          </div>
          {/* ******************Sub Category Orders*********** */}
          <div style={{ position: "relative" }}>
            {headers.map((header) => {
              return (
                <>
                  <div class="row" id={header} style={{ marginTop: "30px" }}>
                    <label className="categorySubtxt">{header}</label>

                    {this.state.orders[header].map((order) => {
                      return (
                        <>
                          <div
                            class="col-md-3"
                            style={{ padding: "10px", paddingBottom: "20px" }}
                            onClick={() => this.handleOpen(order)}
                          >
                            <Card
                              sx={{
                                display: "flex",
                                height: "160px",
                                width: "360px",
                                marginRight: "20px",
                                maxWidth: "100%",
                                cursor: "pointer",
                              }}
                            >
                              <CardContent
                                sx={{ flex: "1 0 auto", width: "360px" }}
                              >
                                <div
                                  className="row"
                                  style={{
                                    paddingLeft: "15px",
                                    height: "auto",
                                  }}
                                >
                                  {order.name} <br />
                                  {order.date}
                                  {order.address}
                                </div>
                              </CardContent>
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
    }
  };

  render() {
    return (
      <>
        {this.orderModal(this.state.selectedOrderId)}
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
              {this.renderOrders()}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default RestaurantOrders;
