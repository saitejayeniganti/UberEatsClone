import React, { Component } from "react";
import "./restaurantSignup.css";
import "./../../commonCSS.css";
import bcrypt from "bcryptjs";
import axios from "axios";
import { Redirect } from "react-router";
import LocationSearchInput from "../locationAutoComplete/locationAuto";
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
    return (
      <>
        {redirectToDetails}
        <div className="container">
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
                  this.setState({ password: e.target.value, passwordError: "" })
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
      </>
    );
  }
}

export default RestaurantSignup;
