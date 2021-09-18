import React, { Component } from "react";
import "./customerSignUp.css";
import ubereatslogo from "../../Images/UberEatsLogo.png";
import axios from "axios";
import dotenv from "dotenv";
import Footer from "../footer/footer";
import bcrypt from "bcryptjs";
import CountryCode from "./../countryCode";

dotenv.config();
class CustomerSignup extends React.Component {
  state = {
    displayMobile: true,
    displayPassword: false,
    signupMobile: "",
    signupPassword: "",
    mobileNumberError: "",
    passwordError: "",
    customerDetails: {},
  };
  displayPasswordField = () => {
    if (this.state.signupMobile.length < 10)
      this.setState({ mobileNumberError: "This phone number is invalid" });

    if (this.state.signupMobile !== "") {
      this.setState({ displayMobile: false });
      this.setState({ displayPassword: true });
    }
  };

  login = () => {
    let encryptPassword = "";
    const salt = bcrypt.genSaltSync(1);
    encryptPassword = bcrypt.hashSync(this.state.signupPassword, salt);
    let userDetails = {
      mobile: this.state.signupMobile,
      password: encryptPassword,
    };
    axios
      .post(
        process.env.REACT_APP_UBEREATS_BACKEND_URL + "/customer/signup",
        userDetails
      )
      .then((response) => {
        if (response.status === 200) {
          console.log("User details are inserted");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  render() {
    return (
      <>
        <div className="container">
          <div className="container mainContainer">
            {this.state.displayMobile ? (
              <div style={{ marginLeft: "30%", marginRight: "30%" }}>
                <div className="img">
                  <img className="logo" src={ubereatslogo} />
                </div>

                <h3 className="welcome">Let's get started</h3>
                <label className="label">
                  Enter your phone number (required)
                </label>
                <div className="row">
                  <div className="col-md-1">
                    {" "}
                    <CountryCode />
                  </div>
                  <div className="col-md-10">
                    <input
                      id="useridInput"
                      onChange={(e) => {
                        this.setState({ signupMobile: e.target.value });
                      }}
                      placeholder="Email or mobile number"
                      name="usename"
                      className="txtinput"
                    ></input>
                  </div>
                </div>

                <div style={{ fontSize: "12px", color: "red" }}>
                  {this.state.mobileNumberError}
                </div>

                <button
                  className="button"
                  onClick={() => this.displayPasswordField()}
                >
                  Next
                </button>
                <div style={{ textAlign: "center" }} className="bottomText">
                  <p className="display--inline" data-reactid="34">
                    Alread use Uber?{" "}
                    <a className="link" href="/customerlogin">
                      Sign in
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
                <h5 className="welcome">Let's get started</h5>
                <label className="label">Please enter your password</label>
                <input
                  id="useridInput"
                  type="password"
                  onChange={(e) => {
                    this.setState({ signupPassword: e.target.value });
                  }}
                  name="password"
                  className="txtinput"
                ></input>
                <div style={{ fontSize: "12px", color: "red" }}>
                  {this.state.passwordError}
                </div>
                <button className="button" onClick={() => this.login()}>
                  Next
                </button>
                {/* <div className="bottomText">
                  <p className="display--inline" data-reactid="34">
                    <a className="link" href="">
                      Forgot Password?
                    </a>
                  </p>
                </div> */}
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

export default CustomerSignup;
