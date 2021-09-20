import React, { Component } from "react";
import "./restaurantSignup.css";
import bcrypt from "bcryptjs";
import axios from "axios";

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
      })
      .catch((err) => {
        this.setState({ emailError: "Email address already taken" });
        console.log(err);
      });
  };

  render() {
    return (
      <>
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
              <input
                className="txtbox"
                placeholder="Store address"
                onChange={(e) =>
                  this.setState({ address: e.target.value, addressError: "" })
                }
              ></input>
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