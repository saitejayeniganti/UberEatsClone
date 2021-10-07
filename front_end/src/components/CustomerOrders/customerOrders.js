import React, { Component } from "react";
import axios from "axios";
import "./customerOrders.css";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

class CustomerOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customer_id: JSON.parse(sessionStorage.getItem("customerDetails")).id,
      orderItems: {},
      orders: [],
      openModel: false,
      selectedOrderId: "",
    };
  }

  handleOpen = (id) => {
    this.setState({ selectedOrderId: id });
    this.setState({ openModel: true });
  };
  handleClose = () => {
    this.setState({ openModel: false, selectedOrderId: "" });
  };

  componentDidMount() {
    axios
      .get(
        process.env.REACT_APP_UBEREATS_BACKEND_URL +
          "/customer/order?id=" +
          this.state.customer_id
      )
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          console.log("Customer Orders are retrieved");
        }
        let orderItems = {};
        let orders = [];
        for (let order of response.data) {
          if (!orderItems[order.id]) {
            orderItems[order.id] = [];
            orders.push(order);
          }
          orderItems[order.id].push(order);
        }
        this.setState({ orderItems: orderItems });
        this.setState({ orders: orders });
        // console.log(orderItems);
        // console.log(orders);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  renderOrders = () => {
    let orders = this.state.orders;
    let orderItems = this.state.orderItems;

    return (
      <>
        {orders == []
          ? ""
          : orders.map((order) => {
              return (
                <>
                  <div
                    className="row"
                    onClick={() => this.handleOpen(order.id)}
                  >
                    <label className="coRestaurantName">
                      {order.restaurant_name +
                        " (" +
                        order.location.split(",")[0] +
                        ")"}
                    </label>
                    <br />
                    <label className="coAddress">
                      {orderItems[order.id].length} items for ${order.price}
                      &nbsp;&nbsp;•&nbsp;&nbsp;
                      {order.order_status == "Delivered" ? (
                        <>
                          {order.order_status} on {order.order_date}
                        </>
                      ) : (
                        <>{order.order_status}</>
                      )}
                    </label>
                  </div>
                  <hr
                    style={{ backgroundColor: "#9a9999", height: "1px" }}
                  ></hr>
                </>
              );
            })}
      </>
    );
  };

  orderItemsModal = () => {
    let id = this.state.selectedOrderId;
    // console.log(id);
    let currentOrder = this.state.orderItems[id];
    // console.log(currentOrder);
    return (
      <>
        {currentOrder == undefined ? (
          ""
        ) : (
          <Modal open={this.state.openModel} onClose={this.handleClose}>
            <Box
              sx={{
                position: "absolute",
                top: "40%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                bgcolor: "white",
                width: "550px",
                boxShadow: "24",
                borderRadius: "2px",
              }}
            >
              <div style={{ padding: "15px" }}>
                <div className="row">
                  <div className="col-md-2 closeSVG" onClick={this.handleClose}>
                    <svg
                      width="30px"
                      height="30px"
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
                  <div className="col-md-10 coRestaurantName">Receipt</div>
                </div>
              </div>
              <hr style={{ backgroundColor: "#9a9999", height: "1px" }}></hr>
              <div style={{ padding: "20px" }}>
                {/* <div className="orderModalHeading" style={{ display: "flex" }}>
                  <div className="col-md-8">Item</div>
                  <div
                    className="col-md-2"
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    Quantity
                  </div>
                  <div
                    className="col-md-2"
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    Price
                  </div>
                </div> */}
                <div className="row">
                  {" "}
                  {currentOrder.map((dish) => {
                    return (
                      <>
                        <div
                          className="orderModalDish"
                          style={{ display: "flex" }}
                        >
                          <div className="col-md-8">{dish.name}</div>
                          <div
                            className="col-md-2"
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            {dish.quantity}
                          </div>
                          <div
                            className="col-md-2"
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            $
                            {parseFloat(dish.dish_price) *
                              parseFloat(dish.quantity)}
                          </div>
                        </div>
                      </>
                    );
                  })}
                </div>
                <hr style={{ backgroundColor: "#9a9999", height: "1px" }}></hr>
                <div className="row">
                  <div
                    className="col-md-8 orderModalHeading"
                    style={{ textAlign: "left" }}
                  >
                    Total
                  </div>
                  <div
                    className="col-md-3"
                    style={{ textAlign: "right", marginLeft: "20px" }}
                  >
                    ${parseFloat(currentOrder[0].price)}
                  </div>
                </div>
              </div>
            </Box>
          </Modal>
        )}
      </>
    );
  };

  render() {
    return (
      <>
        <div style={{ padding: "2%" }}>
          {this.orderItemsModal()}
          <div style={{ display: "flex" }}>
            <div className="col-md-2">
              <h3>Past orders</h3>
            </div>
            <div className="col-md-2">
              <select aria-hidden="true" className="orderStatusselect">
                <option value="">All</option>
                <option value="In cart">Received</option>
                <option value="">Preparing</option>
                <option value="">On the way</option>
                <option value="">Delivered</option>
              </select>
            </div>
          </div>

          <div style={{ padding: "1%" }}>{this.renderOrders()}</div>
        </div>
      </>
    );
  }
}

export default CustomerOrders;
