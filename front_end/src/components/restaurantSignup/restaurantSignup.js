import React, { Component } from "react";
import "./restaurantSignup.css";
import "./../../commonCSS.css";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import bcrypt from "bcryptjs";
import axios from "axios";
import ubereatslogo from "../../Images/uberSVG.svg";
import signupBackground from "../../Images/signupBackground.jpg";
import { Redirect } from "react-router";
import LocationSearchInput from "../locationAutoComplete/locationAuto";
import CustomerFooter from "../footer/customerFooter";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

class RestaurantSignup extends React.Component {
  state = {
    name: "",
    address: "",
    suite: "",
    email: "",
    password: "",
    nameError: "",
    addressError: "",
    suiteError: "",
    emailError: "",
    passwordError: "",
    redirectToDetails: false,
    createdId: "",
    address: "",
    latitude: "",
    longitude: "",
    redirectToRestaurantLogin: false,
  };

  navBar = () => {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ background: "black" }}>
          <Toolbar>
            <div
              style={{
                marginLeft: "448px ",
                marginRight: "448px ",
                width: "400px",
              }}
            >
              <img src={ubereatslogo} />
              {/* <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1 }}
              ></Typography> */}
            </div>
            <label
              className="loginLink"
              style={{ fontSize: "14px", fontWeight: 600 }}
              onClick={() => {
                this.setState({ redirectToRestaurantLogin: true });
              }}
            >
              <svg
                width="12"
                height="16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 8c2 0 3.667-1.667 3.667-3.667 0-2-1.666-3.666-3.666-3.666S2.334 2.333 2.334 4.333 4.001 8 6.001 8zm0-5.333a1.65 1.65 0 0 1 1.667 1.666A1.65 1.65 0 0 1 6.001 6a1.65 1.65 0 0 1-1.667-1.667 1.65 1.65 0 0 1 1.667-1.667zm2 6.667H4c-2.2 0-4 1.8-4 4v2h2v-2c0-1.134.933-2 2-2h4c1.067 0 2 .866 2 2v2h2v-2c0-2.2-1.8-4-4-4z"
                  fill="#fff"
                />
              </svg>
              &nbsp; Sign In
            </label>
            <button className="signupNav">Sign up</button>
          </Toolbar>
        </AppBar>
      </Box>
    );
  };

  handleChange = (address) => {
    this.setState({ address });
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

  submit = () => {
    let regex = /\S+@\S+\.\S+/;
    if (this.state.name === "") {
      this.setState({ nameError: "Enter a store name" });
      return;
    }
    if (this.state.address === "") {
      this.setState({ addressError: "Enter a valid store address" });
      return;
    }
    if (this.state.email === "" || !regex.test(this.state.email)) {
      this.setState({ emailError: "Enter a valid email address" });
      return;
    }
    if (this.state.password === "") {
      this.setState({ passwordError: "Enter a password" });
      return;
    }

    let encryptPassword = "";
    const salt = bcrypt.genSaltSync(1);
    encryptPassword = bcrypt.hashSync(this.state.password, salt);

    let details = {
      name: this.state.name,
      email: this.state.email,
      password: encryptPassword,
      address: this.state.address,
      suite: this.state.suite,
      latitude: this.state.latitude,
      longitude: this.state.longitude,
    };
    axios
      .post(
        process.env.REACT_APP_UBEREATS_BACKEND_URL + "/restaurant/signup",
        details
      )
      .then((response) => {
        if (response.status === 200) {
          console.log("Restaurant details are inserted");
        }
        details.id = response.data.result;
        sessionStorage.setItem("restaurantDetails", JSON.stringify(details));
        this.setState({
          redirectToDetails: true,
          createdId: response.data.result,
        });
      })
      .catch((err) => {
        this.setState({ emailError: "Email address already taken" });
        console.log(err);
      });
  };

  render() {
    let redirectToDetails = null;
    if (this.state.redirectToDetails)
      redirectToDetails = (
        <Redirect
          to={{
            pathname: "/restaurant/details",
            state: {
              name: this.state.name,
              address: this.state.address,
              suite: this.state.suite,
              email: this.state.email,
              password: this.state.password,
              id: this.state.createdId,
            },
          }}
        />
      );

    let redirectToRestaurantLogin = null;
    if (this.state.redirectToRestaurantLogin)
      redirectToRestaurantLogin = <Redirect to="/restaurant/login" />;
    return (
      <>
        {redirectToDetails}
        {redirectToRestaurantLogin}
        {this.navBar()}
        <div>
          <div
            style={{
              marginLeft: "15%",
              marginRight: "20%",
              position: "absolute",
            }}
          >
            {/* <img
              style={{ height: "800px", width: "1180px" }}
              src={signupBackground}
            /> */}
          </div>
          <div
            className="container"
            style={{
              position: "relative",
            }}
          >
            <div className="formContainer">
              <div className="innerformContainer">
                <label>
                  <h4>Get Started</h4>
                </label>
                <input
                  className="txtbox marginTop25"
                  placeholder="Store name"
                  onChange={(e) =>
                    this.setState({ name: e.target.value, nameError: "" })
                  }
                ></input>
                {this.state.nameError ? (
                  <label className="errtext">{this.state.nameError}</label>
                ) : (
                  ""
                )}
                {/* <input
                className="txtbox"
                placeholder="Store address"
                onChange={(e) =>
                  this.setState({ address: e.target.value, addressError: "" })
                }
              ></input> */}
                <LocationSearchInput
                  handleChange={this.handleChange}
                  handleSelect={this.handleSelect}
                  address={this.state.address}
                />
                {this.state.addressError ? (
                  <label className="errtext">{this.state.addressError}</label>
                ) : (
                  ""
                )}
                <input
                  className="txtbox"
                  placeholder="Floor / Suite (Optional)"
                  onChange={(e) => this.setState({ suite: e.target.value })}
                ></input>
                {this.state.suiteError ? (
                  <label className="errtext">{this.state.suiteError}</label>
                ) : (
                  ""
                )}
                <input
                  className="txtbox marginTop20"
                  placeholder="Email"
                  onChange={(e) =>
                    this.setState({ email: e.target.value, emailError: "" })
                  }
                ></input>
                {this.state.emailError ? (
                  <label className="errtext">{this.state.emailError}</label>
                ) : (
                  ""
                )}
                <input
                  className="txtbox"
                  type="password"
                  placeholder="Password"
                  onChange={(e) =>
                    this.setState({
                      password: e.target.value,
                      passwordError: "",
                    })
                  }
                ></input>
                {this.state.passwordError ? (
                  <label className="errtext">{this.state.passwordError}</label>
                ) : (
                  ""
                )}
                <div className="conditionText ">
                  <p>
                    By clicking “Submit,” you agree to{" "}
                    <a
                      href="https://www.uber.com/legal/uber-eats/terms/en-us/"
                      rel="noopener noreferrer"
                      target="_blank"
                      className="greenText"
                    >
                      <b> Uber Eats General Terms and Conditions</b>
                    </a>{" "}
                    and acknowledge you have read the{" "}
                    <a
                      href="http://t.uber.com/privacy_policy"
                      rel="noopener noreferrer"
                      target="_blank"
                      className="greenText"
                    >
                      <b>Privacy Policy</b>
                    </a>
                    .
                  </p>
                </div>
                <button className="btnn" onClick={() => this.submit()}>
                  Submit
                </button>
              </div>
            </div>
          </div>
          <div className="row">
            <div
              style={{
                position: "relative",

                width: "400px",

                left: "460px",
                top: "250px",
              }}
            >
              <h1 style={{ color: "white", fontSize: "52px" }}>
                <b>
                  {" "}
                  A world of <br />
                  customers now
                  <br />
                  within your reach
                </b>
              </h1>
              <label style={{ color: "white" }}>
                Uber’s global platform gives you the flexibility, visibility and
                customer insights you need to connect with more customers.
                Partner with us today.
              </label>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default RestaurantSignup;
