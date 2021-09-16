import React, { Component } from "react";
import "./customerLogin.css";
import ubereatslogo from "../../Images/UberEatsLogo.png";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

class CustomerLogin extends React.Component {
  state = {
    displayUserName: true,
    displayPassword: false,
    loginUserName: "",
    loginPassword: "",
    usernameError: "",
    passwordError: "",
    customerDetails: {},
  };
  displayPasswordField = () => {
    axios
      .get(
        process.env.REACT_APP_UBEREATS_BACKEND_URL +
          "/customer/login?email_id=" +
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
          // localStorage.setItem("userProfile", JSON.stringify(response.data));
          // this.props.history.push("/home");
          this.setState({ customerDetails: response.data });
          this.setState({ displayUserName: false });
          this.setState({ displayPassword: true });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  login = () => {
    //   axios
    //     .post(process.env.REACT_APP_UBEREATS_BACKEND_URL+ "/customer/login", data)
    //     .then((response) => {
    //       console.log(response.data);
    //       if (response.status === 200) {
    //         // localStorage.setItem("userProfile", JSON.stringify(response.data));
    //         // this.props.history.push("/home");
    //       }
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });

    if (
      (this.state.customerDetails.password == this.state.loginPassword) ==
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

            <h5>Welcome back</h5>
            <label className="label">
              Sign in with your email address or mobile number.
            </label>
            <input
              id="useridInput"
              onChange={(e) => {
                this.setState({ loginUserName: e.target.value });
              }}
              name="usename"
              className="text-input"
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
            <div className="bottomText">
              <p className="display--inline" data-reactid="34">
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
            <img className="logo" src={ubereatslogo} />

            <h5>Welcome back</h5>
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
      </>
    );
  }
}

export default CustomerLogin;
