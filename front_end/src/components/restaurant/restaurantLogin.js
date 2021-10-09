import React, { Component } from "react";
import "./restaurantLogin.css";
import ubereatslogo from "../../Images/UberEatsLogo.png";
import { Redirect } from "react-router";
import axios from "axios";
import dotenv from "dotenv";
import Footer from "../footer/footer";
import bcrypt from "bcryptjs";
dotenv.config();

class RestaurantLogin extends React.Component {
  state = {
    displayUserName: true,
    displayPassword: false,
    loginUserName: "",
    loginPassword: "",
    usernameError: "",
    passwordError: "",

    restaurantDetails: {
      name: "",
      location: "",
      suite: "",
      delivery_type: "",
      contact: "",
      star_time: "",
      end_time: "",
      id: "",
      image_url: "",
      password: "",
    },
    redirectToSignup: false,
    redirectToHome: false,
    redirectToDetails: false,
  };
  displayPasswordField = () => {
    axios
      .get(
        process.env.REACT_APP_UBEREATS_BACKEND_URL +
          "/restaurant/login?email_id=" +
          this.state.loginUserName
      )
      .then((response) => {
        if (!response.data) {
          this.setState({
            usernameError: "Oops, we don’t recognize this email address",
          });
          return;
        }
        if (response.status === 200) {
          this.setState({ restaurantDetails: response.data });
          this.setState({ displayUserName: false });
          this.setState({ displayPassword: true });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  login = () => {
    if (
      !bcrypt.compareSync(
        this.state.loginPassword,
        this.state.restaurantDetails.password
      )
    ) {
      this.setState({
        passwordError: "The password you’ve entered is incorrect.",
      });
    } else {
      sessionStorage.setItem(
        "restaurantDetails",
        JSON.stringify(this.state.restaurantDetails)
      );
      if (this.state.restaurantDetails.image_url == null)
        this.setState({ redirectToDetails: true });
      else this.setState({ redirectToHome: true });
    }
  };
  render() {
    let redirectToHome = null;
    if (this.state.redirectToHome)
      redirectToHome = <Redirect to="/restaurant/home" />;

    let redirectToSignup = null;
    if (this.state.redirectToSignup)
      redirectToSignup = <Redirect to="/restaurant/signup" />;

    let redirectToDetails = null;
    if (this.state.redirectToDetails)
      redirectToDetails = <Redirect to="/restaurant/details" />;
    return (
      <>
        {redirectToHome}
        {redirectToSignup}
        {redirectToDetails}
        <div className="container">
          <div className="container mainContainer">
            {this.state.displayUserName ? (
              <div style={{ marginLeft: "30%", marginRight: "30%" }}>
                <div className="img">
                  <img className="logo" src={ubereatslogo} />
                </div>

                <h3 className="welcome">Welcome back</h3>
                <label className="label">
                  Sign in with your email address or mobile number
                </label>
                <label className="label">Username</label>
                <input
                  id="useridInput"
                  onChange={(e) => {
                    this.setState({ loginUserName: e.target.value });
                  }}
                  placeholder="Email"
                  name="usename"
                  className="textinput"
                ></input>

                <div style={{ fontSize: "12px", color: "red" }}>
                  {this.state.usernameError}
                </div>

                <button
                  className="button"
                  onClick={() => this.displayPasswordField()}
                >
                  Next
                </button>
                <div style={{ textAlign: "center" }} className="bottomText">
                  <p
                    className="display--inline"
                    data-reactid="34"
                    onClick={() => {
                      this.setState({ redirectToSignup: true });
                    }}
                  >
                    New to Uber?{" "}
                    <a className="link" href="">
                      Create an account
                    </a>
                  </p>
                </div>
              </div>
            ) : (
              ""
            )}

            {/* For password */}
            {this.state.displayPassword ? (
              <div style={{ marginLeft: "30%", marginRight: "30%" }}>
                <div className="img">
                  <img className="logo" src={ubereatslogo} />
                </div>
                <h3 className="welcome">Welcome back</h3>
                <label className="label">
                  Please enter your password to sign in.
                </label>
                <input
                  id="useridInput"
                  type="password"
                  onChange={(e) => {
                    this.setState({ loginPassword: e.target.value });
                  }}
                  name="password"
                  className="textinput"
                ></input>
                <div style={{ fontSize: "12px", color: "red" }}>
                  {this.state.passwordError}
                </div>
                <button className="button" onClick={() => this.login()}>
                  Next
                </button>
                <div className="bottomText">
                  <p className="display--inline" data-reactid="34">
                    <a className="link" href="">
                      Forgot Password?
                    </a>
                  </p>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>

        <Footer />
      </>
    );
  }
}

export default RestaurantLogin;
