import React, { Component } from "react";
import "./customerSignUp.css";
import ubereatslogo from "../../Images/UberEatsLogo.png";
import axios from "axios";
import dotenv from "dotenv";
import Footer from "../footer/footer";
import bcrypt from "bcryptjs";
import { Redirect } from "react-router";
import CountryCode from "./../countryCode";

dotenv.config();

class CustomerSignup extends React.Component {
  state = {
    displayMobile: true,
    displayPassword: false,
    isEmail: false,
    signupMobile: "",
    signupPassword: "",
    mobileNumberError: "",
    passwordError: "",
    countryCode: "1",
    customerDetails: {},
    redirectToHome: false,
  };

  changeCountryCode = (code) => {
    // console.log("Changed to - " + code);
    this.setState({ countryCode: code });
  };

  displayPasswordField = () => {
    this.setState({ isEmail: false });
    let str;
    if (
      this.state.signupMobile.includes("@") ||
      !/^\d+$/.test(this.state.signupMobile) == true
    ) {
      str = this.state.signupMobile;
      this.setState({ isEmail: true });
      let regex = /\S+@\S+\.\S+/;
      if (
        this.state.signupMobile === "" ||
        !regex.test(this.state.signupMobile)
      ) {
        this.setState({ mobileNumberError: "Enter a valid email address" });
        return;
      }
    } else if (this.state.signupMobile.length < 10) {
      this.setState({ mobileNumberError: "Enter a valid phone number" });
      return;
    } else {
      str = this.state.countryCode + this.state.signupMobile;
      console.log(str);
      this.setState({
        signupMobile: str,
      });
    }
    axios
      .get(
        process.env.REACT_APP_UBEREATS_BACKEND_URL +
          "/customer/login?email_id=" +
          str
      )
      .then((response) => {
        // console.log(response.data);
        if (response.data) {
          this.setState({
            mobileNumberError: "Id already exist",
          });
          return;
        } else {
          this.setState({ displayMobile: false });
          this.setState({ displayPassword: true });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  login = () => {
    let encryptPassword = "";
    const salt = bcrypt.genSaltSync(1);
    encryptPassword = bcrypt.hashSync(this.state.signupPassword, salt);

    let userDetails = this.state.isEmail
      ? {
          email_id: this.state.signupMobile,
          password: encryptPassword,
          mobile: "",
        }
      : {
          mobile: this.state.signupMobile,
          password: encryptPassword,
          email_id: "",
        };
    axios
      .post(
        process.env.REACT_APP_UBEREATS_BACKEND_URL + "/customer/signup",
        userDetails
      )
      .then((response) => {
        if (response.status === 200) {
          console.log("Customer details are inserted");
        }
        let customerDetails = {
          id: response.data.result,
        };
        sessionStorage.setItem(
          "customerDetails",
          JSON.stringify(customerDetails)
        );
        this.setState({
          redirectToHome: true,
        });
        // console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    let redirectToHome = null;
    if (this.state.redirectToHome)
      redirectToHome = <Redirect to="/customer/details" />;
    return (
      <>
        {redirectToHome}
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
                    <CountryCode changeCountryCode={this.changeCountryCode} />
                  </div>
                  <div className="col-md-10">
                    <input
                      id="useridInput"
                      onChange={(e) => {
                        this.setState({ signupMobile: e.target.value });
                      }}
                      // placeholder="Email or mobile number"
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
                    <a className="link" href="/customer/login">
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
                  className="pswdinput"
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
