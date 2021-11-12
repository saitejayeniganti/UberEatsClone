import React, { Component, Fragment } from "react";
import { Redirect } from "react-router";
import axios from "axios";
import { Link } from "react-scroll";
import "./../../commonCSS.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import UpdateIcon from "@mui/icons-material/Update";

class RestaurantOrders extends React.Component {
  state = {
    restaurantDetails: JSON.parse(sessionStorage.getItem("restaurantDetails")),
    orders: {},
    dishMapping: {},
    openModel: false,
    openProfileModel: false,
    selectedCustomer: {},
    selectedOrderId: "",
  };

  handleOpen = (order) => {
    this.setState({ selectedOrderId: order.id, openModel: true });
  };
  handleClose = () => {
    this.setState({ openModel: false, selectedOrderId: "" });
  };

  handleProfileOpen = (order) => {
    let details = {};
    axios
      .get(
        process.env.REACT_APP_UBEREATS_BACKEND_URL +
          "/customer?id=" +
          order.customer_id
      )
      .then((response) => {
        if (response.status === 200) {
          // console.log("Customer details are retrieved");
        }
        // console.log(response.data);
        details = {
          name: response.data.name,
          nickName: response.data.nick_name,
          mobile: response.data.mobile,
          email: response.data.email_id,
          password: "password",
          country: response.data.country,
          state: response.data.state,
          city: response.data.city,
          about: response.data.about,
          imageUrl: response.data.image_url,
          address: response.data.address,
        };
        this.setState({
          selectedCustomer: details,
          openProfileModel: true,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleProfileClose = () => {
    this.setState({ openProfileModel: false, selectedCustomerId: "" });
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
          // console.log(response.data);
          console.log("Restaurant Orders are retrieved");
        }
        let ordersSubCat = {};
        let dishMapping = {};
        for (let order of response.data) {
          if (!ordersSubCat[order.order_status]) {
            ordersSubCat[order.order_status] = [];
            ordersSubCat[order.order_status].push(order);
          } else {
            let found = false;
            for (let dupOrder of ordersSubCat[order.order_status]) {
              if (parseInt(dupOrder.id) == parseInt(order.id)) {
                found = true;
                console.log("found");
                break;
              }
            }
            if (!found) ordersSubCat[order.order_status].push(order);
          }
          if (!dishMapping[order.id]) {
            dishMapping[order.id] = [];
          }
          dishMapping[order.id].push(order);
        }
        this.setState({
          orders: ordersSubCat,
        });
        // console.log(ordersSubCat);
        // console.log(dishMapping);
        this.setState({
          dishMapping: dishMapping,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  changeOrderStatus = (status, order) => {
    let details = {
      order_status: status,
      id: order.id,
    };
    axios
      .put(
        process.env.REACT_APP_UBEREATS_BACKEND_URL + "/customer/updateorder",
        details
      )
      .then((response) => {
        if (response.status === 200) {
          //   console.log(response.data);
          console.log("Order Updated");
        }
        // ********************Component_did_Mount_Code********************
        this.setState({
          openModel: false,
        });
        axios
          .get(
            process.env.REACT_APP_UBEREATS_BACKEND_URL +
              "/restaurant/order?id=" +
              this.state.restaurantDetails.id
          )
          .then((response) => {
            if (response.status === 200) {
              console.log(response.data);
              console.log("Restaurant Orders are retrieved");
            }
            let ordersSubCat = {};
            let dishMapping = {};
            for (let order of response.data) {
              if (!ordersSubCat[order.order_status]) {
                ordersSubCat[order.order_status] = [];
                ordersSubCat[order.order_status].push(order);
              } else {
                let found = false;
                for (let dupOrder of ordersSubCat[order.order_status]) {
                  if (parseInt(dupOrder.id) == parseInt(order.id)) {
                    found = true;
                    console.log("found");
                    break;
                  }
                }
                if (!found) ordersSubCat[order.order_status].push(order);
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

        // ******************END*****************
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
              padding: "25px",
              borderRadius: "10px",
            }}
          >
            <div className="col-md-12" style={{ display: "flex" }}>
              <div
                className="col-md-2 closeSVG"
                style={{ textAlign: "left", paddingTop: "15px" }}
                onClick={this.handleClose}
              >
                <svg
                  width="25px"
                  height="25px"
                  fill="none"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  focusable="false"
                  cursor="pointer"
                >
                  <path
                    d="m19.5831 6.24931-1.8333-1.83329-5.75 5.83328-5.75-5.83328-1.8333 1.83329 5.8333 5.74999-5.8333 5.75 1.8333 1.8333 5.75-5.8333 5.75 5.8333 1.8333-1.8333-5.8333-5.75z"
                    fill="#000000"
                  ></path>
                </svg>
              </div>

              <label className="orderModal col-md-9">Order Details</label>
            </div>
            <hr style={{ backgroundColor: "#9a9999", height: "1px" }}></hr>
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
            {currentOrder === undefined ? (
              ""
            ) : (
              <div style={{ display: "flex" }}>
                {currentOrder[0].order_status == "Placed" ? (
                  <div
                    className="col-md-5"
                    onClick={() =>
                      this.changeOrderStatus("Preparing", currentOrder[0])
                    }
                  >
                    <button className="changeStatusBtn">Prepare</button>
                  </div>
                ) : (
                  ""
                )}
                {currentOrder[0].order_status == "Preparing" ? (
                  <div
                    className="col-md-5"
                    onClick={() =>
                      this.changeOrderStatus("ReadyToBePicked", currentOrder[0])
                    }
                  >
                    <button className="changeStatusBtn">Ready</button>
                  </div>
                ) : (
                  ""
                )}
                {currentOrder[0].order_status == "ReadyToBePicked" ? (
                  <div
                    className="col-md-5"
                    onClick={() =>
                      this.changeOrderStatus("Delivered", currentOrder[0])
                    }
                  >
                    <button className="changeStatusBtn">Delivered</button>
                  </div>
                ) : (
                  ""
                )}

                {/* <div className="col-md-2"></div> */}
                {currentOrder[0].order_status == "Placed" ? (
                  <div
                    className="col-md-5"
                    style={{ marginLeft: "50px" }}
                    onClick={() =>
                      this.changeOrderStatus("Cancelled", currentOrder[0])
                    }
                  >
                    <button className="changeStatusBtn">Cancel</button>
                  </div>
                ) : (
                  ""
                )}
              </div>
            )}
          </Box>
        </Modal>
      </>
    );
  };

  customerProfileModal = (customer) => {
    console.log(customer);
    return (
      <>
        <Modal
          open={this.state.openProfileModel}
          onClose={this.handleProfileClose}
        >
          <Box
            sx={{
              position: "absolute",
              top: "40%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "white",
              width: "500px",
              boxShadow: "24",
              padding: "20px",
              borderRadius: "10px",
            }}
          >
            <div className="col-md-12" style={{ display: "flex" }}>
              <div
                className="col-md-2 closeSVG"
                style={{ textAlign: "left", paddingTop: "15px" }}
                onClick={this.handleProfileClose}
              >
                <svg
                  width="25px"
                  height="25px"
                  fill="none"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  focusable="false"
                  cursor="pointer"
                >
                  <path
                    d="m19.5831 6.24931-1.8333-1.83329-5.75 5.83328-5.75-5.83328-1.8333 1.83329 5.8333 5.74999-5.8333 5.75 1.8333 1.8333 5.75-5.8333 5.75 5.8333 1.8333-1.8333-5.8333-5.75z"
                    fill="#000000"
                  ></path>
                </svg>
              </div>

              <label className="orderModal col-md-9">
                {customer.name}'s profile
              </label>
            </div>
            <hr style={{ backgroundColor: "#9a9999", height: "1px" }}></hr>
            <div style={{ textAlign: "center" }}>
              <img
                src={customer.imageUrl}
                width="200"
                height="200"
                style={{ borderRadius: "50%" }}
              ></img>
            </div>
            <div
              className="col-md-12"
              style={{ color: "black", padding: "20px" }}
            >
              {/* <div className="row orderModalDish">{customer.name}</div> */}
              <div className="row" style={{ display: "flex" }}>
                <div className="col-md-3 orderModalHeading">Email</div>
                <div className="col-md-6 orderModalDish">{customer.email}</div>
              </div>

              <div className="row" style={{ display: "flex" }}>
                <div className="col-md-3 orderModalHeading">Mobile</div>
                <div className="col-md-6 orderModalDish">{customer.mobile}</div>
              </div>

              <div className="row" style={{ display: "flex" }}>
                <div className="col-md-3 orderModalHeading">About</div>
                <div className="col-md-6 orderModalDish">{customer.about}</div>
              </div>

              <div className="row" style={{ display: "flex" }}>
                <div className="col-md-3 orderModalHeading">Address</div>
                <div className="col-md-6 orderModalDish">
                  {customer.address}
                </div>
              </div>
              <hr style={{ backgroundColor: "#9a9999", height: "1px" }}></hr>
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
                      let date = new Date(order.order_date).toDateString();
                      let time = new Date(order.order_date)
                        .toISOString()
                        .slice(10, 19)
                        .replace("T", " ");

                      return (
                        <>
                          <div
                            class="col-md-3"
                            style={{ padding: "10px", paddingBottom: "20px" }}
                          >
                            <Card
                              sx={{
                                display: "flex",
                                height: "160px",
                                width: "360px",
                                marginRight: "20px",
                                maxWidth: "100%",
                                // cursor: "pointer",
                              }}
                            >
                              <CardContent
                                sx={{ flex: "1 0 auto", width: "360px" }}
                              >
                                <div
                                  className="row"
                                  style={{
                                    paddingLeft: "1px",
                                    height: "auto",
                                  }}
                                >
                                  <div
                                    className="col-md-6"
                                    onClick={() =>
                                      this.handleProfileOpen(order)
                                    }
                                  >
                                    <h4> {order.name}</h4>
                                  </div>
                                  <div
                                    className="col-md-6"
                                    style={{ textAlign: "right" }}
                                    onClick={() => this.handleOpen(order)}
                                  >
                                    <UpdateIcon />
                                  </div>
                                </div>
                                <div
                                  className="row"
                                  style={{
                                    paddingLeft: "15px",
                                    height: "auto",
                                    marginTop: "10px",
                                  }}
                                >
                                  {date}&nbsp;&nbsp;{time}
                                </div>
                                <div
                                  className="row"
                                  style={{
                                    paddingLeft: "15px",
                                    height: "auto",
                                    marginTop: "10px",
                                  }}
                                >
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
        {this.customerProfileModal(this.state.selectedCustomer)}

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
