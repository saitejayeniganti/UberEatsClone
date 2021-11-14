import React, { Component } from "react";
import { Redirect } from "react-router";
import axios from "axios";
import "../../commonCSS.css";
import LocationSearchInput from "../locationAutoComplete/locationAuto";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { connect } from "react-redux";
import { emptyCart } from "../../redux/actions/index";
class CustomerCheckout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      addressList: [],
      address: "",
      latitude: "",
      longitude: "",
      addressError: "",
      selectedAddress: "",
      selectedAddressError: "",
      openModel: false,
      redirectToHome: "",
      instructions: "",
    };
  }

  handleOpen = () => {
    this.setState({ openModel: true });
  };
  handleClose = () => {
    this.setState({ openModel: false, redirectToHome: true });
  };

  successModal = () => {
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
            <div className="col-md-6" style={{ textAlign: "left" }}>
              <svg
                width="24px"
                height="24px"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden="true"
                focusable="false"
                cursor="pointer"
                onClick={this.handleClose}
              >
                <path
                  d="m19.5831 6.24931-1.8333-1.83329-5.75 5.83328-5.75-5.83328-1.8333 1.83329 5.8333 5.74999-5.8333 5.75 1.8333 1.8333 5.75-5.8333 5.75 5.8333 1.8333-1.8333-5.8333-5.75z"
                  fill="#000000"
                ></path>
              </svg>
            </div>
            <div
              style={{ marginTop: "20px", fontSize: "22px", fontWeight: "500" }}
            >
              Order Placed Successfully..!
            </div>
            <div style={{ marginTop: "20px" }}>
              <button
                className="checkoutButton"
                onClick={() => {
                  this.props.emptyCart({});
                  this.setState({
                    openModel: false,
                    redirectToHome: true,
                  });
                }}
              >
                Continue
              </button>
            </div>
          </Box>
        </Modal>
        ;
      </>
    );
  };

  getItemsAddressFromDB = () => {
    axios
      .get(
        process.env.REACT_APP_UBEREATS_BACKEND_URL +
          "/customer/checkoutcart?id=" +
          JSON.parse(sessionStorage.getItem("customerDetails")).id
      )
      .then((response) => {
        console.log(response.data);
        this.setState({ items: response.data.items });
        this.setState({ addressList: response.data.address });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.getItemsAddressFromDB();
  }

  handleChange = (address) => {
    this.setState({ address });
    this.setState({ addressError: "" });
  };

  handleSelect = (address) => {
    geocodeByAddress(address).then((results) => {
      this.setState({ address: address });
      getLatLng(results[0])
        .then((latLng) => {
          console.log("Success", latLng);
          this.setState({ latitude: latLng.lat, longitude: latLng.lng });
        })
        .catch((error) => console.error("Error", error));
    });
  };

  addAddress = () => {
    for (let a in this.state.addressList) {
      if (
        this.state.addressList[a].latitude == this.state.latitude &&
        this.state.addressList[a].longitude == this.state.longitude
      ) {
        this.setState({
          addressError: "Address already present. Please Select that.",
        });
        break;
      }
    }
    let details = {
      id: JSON.parse(sessionStorage.getItem("customerDetails")).id,
      address: this.state.address,
      latitude: this.state.latitude,
      longitude: this.state.longitude,
    };
    axios
      .post(
        process.env.REACT_APP_UBEREATS_BACKEND_URL + "/customer/addaddress",
        details
      )
      .then((response) => {
        this.setState({ address: "" });
        this.getItemsAddressFromDB();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  renderAddressDiv = () => {
    return (
      <>
        <div
          className="row"
          style={{ fontSize: "28px", fontWeight: "500", marginLeft: "30px" }}
        >
          Select Address
        </div>
        <div className="row" style={{ marginLeft: "30px", marginTop: "30px" }}>
          <select
            className="txtbox"
            onChange={(e) =>
              this.setState({
                selectedAddressError: "",
                selectedAddress: e.target.value,
              })
            }
          >
            <option value="">Select</option>
            {this.state.addressList.map((add) => {
              return <option value={add.location}>{add.location}</option>;
            })}
          </select>
        </div>
        <div
          className="row"
          style={{ marginLeft: "30px", fontSize: "14px", color: "red" }}
        >
          {this.state.selectedAddressError
            ? this.state.selectedAddressError
            : ""}
        </div>
        <div className="row" style={{ marginLeft: "30px", marginTop: "50px" }}>
          Add New Address
        </div>

        <div
          style={{
            marginLeft: "30px",
            marginTop: "15px",
            width: "400px",
          }}
        >
          {" "}
          <LocationSearchInput
            handleChange={this.handleChange}
            handleSelect={this.handleSelect}
            address={this.state.address}
          />
        </div>
        <div
          style={{
            marginLeft: "30px",

            fontSize: "14px",
            color: "red",
          }}
        >
          {" "}
          {this.state.addressError ? this.state.addressError : ""}
        </div>

        <div
          className="row"
          style={{
            marginLeft: "30px",
            marginTop: "25px",
            marginBottom: "30px",
          }}
        >
          {" "}
          <button className="addAddressBtn" onClick={() => this.addAddress()}>
            Add New Address
          </button>
        </div>
      </>
    );
  };

  placeOrder = (instructions) => {
    if (this.state.selectedAddress == "") {
      this.setState({ selectedAddressError: "Select an address" });
      return;
    }
    let details = {
      order_status: "Placed",
      id: this.state.items[0].order_Id,
      instructions: instructions,
    };
    axios
      .put(
        process.env.REACT_APP_UBEREATS_BACKEND_URL + "/customer/updateorder",
        details
      )
      .then((response) => {
        console.log("Order status updated");
        this.handleOpen();
      })
      .catch((err) => console.log(err));
  };

  renderItems = () => {
    return (
      <>
        <div>
          <div
            style={{ fontSize: "28px", fontWeight: "500", marginLeft: "30px" }}
          >
            Your Items
          </div>
          <div>
            <input
              className="txtbox"
              style={{ marginLeft: "30px" }}
              value={this.state.instructions}
              placeholder="Enter Order Instructions"
              onChange={(e) => this.setState({ instructions: e.target.value })}
            ></input>
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
          <div style={{ marginLeft: "30px" }}>
            <button
              className="placeOrderBtn"
              onClick={() => this.placeOrder(this.state.instructions)}
            >
              Place Order
            </button>
          </div>
        </div>
      </>
    );
  };

  render() {
    let redirectToHome = null;
    if (this.state.redirectToHome) {
      redirectToHome = (
        <Redirect
          to={{
            pathname: "/customer/home",
          }}
        />
      );
    }
    return (
      <>
        {redirectToHome}
        {this.successModal()}
        <div
          className="container"
          style={{
            display: "flex",
            background: "#ededed",
            boxShadow: "10px 5px 5px #d3d3d3 ",
            zIndex: 100,
            padding: "50px",
          }}
        >
          <div className="col-md-6">{this.renderAddressDiv()}</div>
          <div className="col-md-6">{this.renderItems()}</div>
        </div>
      </>
    );
  }
}

function mapDispatchToprops(dispatch) {
  return {
    emptyCart: (emp) => dispatch(emptyCart(emp)),
  };
}

export default connect(null, mapDispatchToprops)(CustomerCheckout);
