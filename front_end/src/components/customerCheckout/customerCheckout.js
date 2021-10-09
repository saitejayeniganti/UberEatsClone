import React, { Component } from "react";
import { Redirect } from "react-router";
import axios from "axios";
import "../../commonCSS.css";
class CustomerCheckout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }

  componentDidMount() {
    axios
      .get(
        process.env.REACT_APP_UBEREATS_BACKEND_URL +
          "/customer/checkoutcart?id=" +
          JSON.parse(sessionStorage.getItem("customerDetails")).id
      )
      .then((response) => {
        console.log(response.data);
        this.setState({ items: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  renderItems = () => {
    return (
      <>
        <div style={{ marginLeft: "2%", marginRight: "2%" }}>
          <div
            style={{ fontSize: "28px", fontWeight: "500", marginLeft: "30px" }}
          >
            Your Items
          </div>

          <div style={{ margin: "30px" }}>
            <div style={{ display: "flex", marginTop: "15px" }}>
              <div className="col-md-7 orderModalHeading">Name</div>
              <div className="col-md-2 orderModalHeading">Quantity</div>
              <div className="col-md-3 orderModalHeading">Price</div>
            </div>
            {this.state.items == []
              ? ""
              : this.state.items.map((item) => {
                  // let total = 0;
                  // total = total + item.quantity;
                  return (
                    <>
                      <div
                        style={{
                          display: "flex",
                          marginTop: "15px",
                          marginBottom: "15px",
                        }}
                      >
                        <div className="col-md-7">{item.dishName}</div>
                        <div className="col-md-2">{item.quantity}</div>
                        <div className="col-md-3">
                          $
                          {parseFloat(item.quantity) *
                            parseFloat(item.dishPrice)}
                        </div>
                      </div>
                    </>
                  );
                })}
            <hr style={{ backgroundColor: "#9a9999", height: "1px" }}></hr>
            <div style={{ display: "flex" }}>
              <div className="col-md-7 orderModalHeading">Total</div>
              <div className="col-md-2"></div>
              <div className="col-md-3 orderModalHeading">
                $
                {this.state.items[0] == undefined
                  ? ""
                  : this.state.items[0].orderPrice}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  renderPlaceOrder = () => {};

  render() {
    return (
      <>
        <div className="container-fluid">
          <div className="col-md-6">{this.renderItems()}</div>
          <div className="col-md-2"></div>
          <div className="col-md-5">{this.renderPlaceOrder()}</div>
        </div>
      </>
    );
  }
}

export default CustomerCheckout;
