import React, { Component } from "react";
import axios from "axios";
import "./customerOrders.css";

class CustomerOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customer_id: JSON.parse(sessionStorage.getItem("customerDetails")).id,
      orderItems: {},
      orders: [],
    };
  }

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
    console.log(orders);
    return (
      <>
        {orders == []
          ? ""
          : orders.map((order) => {
              return (
                <>
                  <div>
                    <div className="row">
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
                  </div>
                </>
              );
            })}
      </>
    );
  };

  render() {
    return (
      <>
        <div style={{ padding: "2%" }}>
          <h3>Past orders</h3>
          <div style={{ padding: "1%" }}>{this.renderOrders()}</div>
        </div>
      </>
    );
  }
}

export default CustomerOrders;
