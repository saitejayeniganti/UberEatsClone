import React, { Component } from "react";
import "./customerLogin.css";
import ubereatslogo from "../../Images/UberEatsLogo.png";
import axios from "axios";
import dotenv from "dotenv";
import Footer from "../footer/footer";
import { Redirect } from "react-router";
import bcrypt from "bcryptjs";
import CountryCode from "./../countryCode";
dotenv.config();

class CustomerLogin extends React.Component {
  state = {
    displayUserName: true,
    displayPassword: false,
    signupMobile: "",
    loginPassword: "",
    mobileNumberError: "",
    passwordError: "",
    countryCode: "1",
    customerDetails: {},
    redirectToHome: false,
    redirectToDetails: false,
  };

  changeCountryCode = (code) => {
    // console.log("Changed to - " + code);
    this.setState({ countryCode: code });
  };

  displayPasswordField = () => {
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
      // console.log(str);
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
        if (!response.data) {
          this.setState({
            mobileNumberError: "Oops, we don’t recognize this email address",
          });
          return;
        } else {
          this.setState({ customerDetails: response.data });
          this.setState({ displayUserName: false });
          this.setState({ displayPassword: true });
        }
      })
      .catch((err) => {
        console.log(err);
      });

    // axios
    //   .get(
    //     process.env.REACT_APP_UBEREATS_BACKEND_URL +
    //       "/customer/login?email_id=" +
    //       this.state.signupMobile
    //   )
    //   .then((response) => {
    //     if (!response.data) {
    //       this.setState({
    //         usernameError: "Oops, we don’t recognize this email address",
    //       });
    //       return;
    //     } else {
    //       // localStorage.setItem("userProfile", JSON.stringify(response.data));
    //       // this.props.history.push("/home");
    //       this.setState({ customerDetails: response.data });
    //       this.setState({ displayUserName: false });
    //       this.setState({ displayPassword: true });
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  login = () => {
    if (
      !bcrypt.compareSync(
        this.state.loginPassword,
        this.state.customerDetails.password
      )
    ) {
      this.setState({
        passwordError: "The password you’ve entered is incorrect.",
      });
      return;
    } else {
      let customerDetails = {
        id: this.state.customerDetails.id,
        name: this.state.customerDetails.name,
        image_url: this.state.customerDetails.image_url,
        latitude: this.state.customerDetails.latitude,
        longitude: this.state.customerDetails.longitude,
      };
      sessionStorage.setItem(
        "customerDetails",
        JSON.stringify(customerDetails)
      );
      if (
        this.state.customerDetails.name === "" ||
        this.state.customerDetails.name === null
      ) {
        this.setState({
          redirectToDetails: true,
        });
      } else {
        this.setState({
          redirectToHome: true,
        });
      }
    }
  };
  render() {
    let redirectToHome = null;
    if (this.state.redirectToHome)
      redirectToHome = <Redirect to="/customer/home" />;

    let redirectToDetails = null;
    if (this.state.redirectToDetails)
      redirectToDetails = <Redirect to="/customer/details" />;
    return (
      <>
        {redirectToHome}
        {redirectToDetails}
        <div className="container">
          <div className="container mainContainer">
            {this.state.displayUserName ? (
              <div style={{ marginLeft: "30%", marginRight: "30%" }}>
                <div className="img">
                  <img className="logo" alt="logo" src={ubereatslogo} />
                </div>

                <h3 className="welcome">Welcome back</h3>
                <label className="label">
                  Sign in with your email address or mobile number.
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
                      placeholder="Email or mobile number"
                      name="usename"
                      className="txtinput"
                    ></input>
                  </div>
                </div>

                {/* <input
                  id="useridInput"
                  onChange={(e) => {
                    this.setState({ signupMobile: e.target.value });
                  }}
                  placeholder="Email or mobile number"
                  name="usename"
                  className="text-input"
                ></input> */}

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
                    New to Uber?{" "}
                    <a className="link" href="/customer/signup">
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
                  <img className="logo" alt="logo" src={ubereatslogo} />
                </div>
                <h5 className="welcome">Welcome back</h5>
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
          </div>
        </div>

        <Footer />
      </>
    );
  }
}

export default CustomerLogin;
