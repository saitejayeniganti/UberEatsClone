import React, { Component } from "react";
import "./restaurant.css";
import ubereatslogo from "../../Images/UberEatsLogo.png";
import axios from "axios";
import dotenv from "dotenv";
import Footer from "../footer/footer";
dotenv.config();

class RestaurantLogin extends React.Component {
  state = {
    displayUserName: true,
    displayPassword: false,
    loginUserName: "",
    loginPassword: "",
    usernameError: "",
    passwordError: "",
    restaurantDetails: {},
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
      (this.state.restaurantDetails.password == this.state.loginPassword) ==
      false
    ) {
      this.setState({
        passwordError: "The password you’ve entered is incorrect.",
      });
      return;
    }
  };
  render() {
    return (
      <>
        {this.state.displayUserName ? (
          <div style={{ marginLeft: "30%", marginRight: "30%" }}>
            <img className="logo" src={ubereatslogo} />

            <h3>Log in</h3>
            <label className="label">
              Use your email username and password to log in to Restaurant
              Manager.
            </label>
            <label className="label">Username</label>
            <input
              id="useridInput"
              onChange={(e) => {
                this.setState({ loginUserName: e.target.value });
              }}
              name="usename"
              className="text-input"
              placeholder="Enter your email"
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
          </div>
        ) : (
          ""
        )}

        {/* For password */}
        {this.state.displayPassword ? (
          <div style={{ marginLeft: "30%", marginRight: "30%" }}>
            <img className="logo" src={ubereatslogo} />

            <h3>Log in</h3>
            <label className="label">
              Use your email username and password to log in to Restaurant
              Manager.
            </label>
            <label className="label">Password</label>
            <input
              id="useridInput"
              type="password"
              onChange={(e) => {
                this.setState({ loginPassword: e.target.value });
              }}
              name="password"
              className="text-input"
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
        <Footer />
      </>
    );
  }
}

export default RestaurantLogin;
