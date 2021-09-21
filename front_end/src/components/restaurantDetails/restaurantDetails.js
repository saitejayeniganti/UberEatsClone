import React, { Component } from "react";
import "./../../commonCSS.css";
import axios from "axios";
import { Redirect } from "react-router";
import bcrypt from "bcryptjs";
import S3 from "react-aws-s3";
import { v4 as uuidv4 } from "uuid";

class RestaurantDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToHome: false,
      name: "",
      nameError: "",
      address: "",
      addressError: "",
      suite: "",
      suiteError: "",
      email: "",
      emailError: "",
      password: "",
      passwordError: "",
      deliveryType: "",
      deliveryTypeError: "",
      contact: "",
      contactError: "",
      startTime: "",
      startTimeError: "",
      endTime: "",
      endTimeError: "",
      selectedFile: "",
      selectedFileError: "",
    };
  }

  fileSelected = (e) => {
    console.log(e.target.files[0].type);

    if (
      e.target.files[0].type === "image/png" ||
      e.target.files[0].type === "image/jpeg"
    ) {
      this.setState({ selectedFile: e.target.files[0] });
    } else {
      this.setState({ selectedFileError: "Only jpeg and png are allowed" });
    }
  };

  submit = () => {
    if (this.state.name === "") {
      this.setState({ nameError: "Enter a store name" });
      return;
    }
    if (this.state.address === "") {
      this.setState({ addressError: "Enter a valid store address" });
      return;
    }
    if (this.state.password === "") {
      this.setState({ passwordError: "Enter a password" });
      return;
    }
    if (this.state.deliveryType === "-1") {
      this.setState({
        deliveryTypeError: "Select delivery type the restaurant offers",
      });
      return;
    }
    if (
      this.state.contact === "" ||
      !isNaN(this.state.contact) ||
      this.state.contact.length > 10
    ) {
      this.setState({ contactError: "Enter valid contact" });
      return;
    }

    if (this.state.startTime === "") {
      this.setState({
        startTimeError: "Select a start time",
      });
      return;
    }
    if (this.state.endTime === "") {
      this.setState({
        endTimeError: "Select a end time",
      });
      return;
    }

    // let encryptPassword = "";
    // const salt = bcrypt.genSaltSync(1);
    // encryptPassword = bcrypt.hashSync(this.state.password, salt);
  };

  detailsForm = () => {
    return (
      <>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div className="detailsFormContainer">
            <div className="innerformContainer">
              <div className="row">
                {" "}
                <label>
                  <h4>Restaurant Details</h4>
                </label>
              </div>
              <div className="row">
                <div className="col-md-6 align-baseline">
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
                    className="txtbox marginTop20"
                    placeholder="Store address"
                    onChange={(e) =>
                      this.setState({
                        address: e.target.value,
                        addressError: "",
                      })
                    }
                  ></input>{" "}
                  {this.state.addressError ? (
                    <label className="errtext">{this.state.addressError}</label>
                  ) : (
                    ""
                  )}
                  <input
                    className="txtbox marginTop20"
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
                    className="txtbox marginTop20"
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
                    <label className="errtext">
                      {this.state.passwordError}
                    </label>
                  ) : (
                    ""
                  )}
                </div>
                <div className="col-md-6">
                  <select
                    className="txtbox marginTop25"
                    onChange={(e) =>
                      this.setState({
                        deliveryType: e.target.value,
                        deliveryTypeError: "",
                      })
                    }
                  >
                    <option value="-1">Select Delivery Type</option>
                    <option value="Delivery">Delivery</option>
                    <option value="Pickup">Pickup</option>
                    <option value="Both">Delivery and Pickup</option>
                  </select>
                  {this.state.deliveryTypeError ? (
                    <label className="errtext">
                      {this.state.deliveryTypeError}
                    </label>
                  ) : (
                    ""
                  )}
                  <input
                    className="txtbox marginTop20"
                    type="text"
                    placeholder="Contact"
                    onChange={(e) =>
                      this.setState({
                        contact: e.target.value,
                        contactError: "",
                      })
                    }
                  ></input>
                  {this.state.contactError ? (
                    <label className="errtext">{this.state.contactError}</label>
                  ) : (
                    ""
                  )}
                  <br />

                  <input
                    className="txtbox marginTop20"
                    placeholder="Start Time"
                    type="time"
                    onChange={(e) => {
                      console.log(e.target.value);
                      this.setState({
                        startTime: e.target.value,
                        startTimeError: "",
                      });
                    }}
                  ></input>
                  {this.state.startTimeError ? (
                    <label className="errtext">
                      {this.state.startTimeError}
                    </label>
                  ) : (
                    ""
                  )}
                  <input
                    className="txtbox marginTop20"
                    placeholder="End Time"
                    type="time"
                    onChange={(e) =>
                      this.setState({
                        endTime: e.target.value,
                        endTimeError: "",
                      })
                    }
                  ></input>
                  {this.state.endTimeError ? (
                    <label className="errtext">{this.state.endTimeError}</label>
                  ) : (
                    ""
                  )}
                  <label className="custom-file-upload marginTop20">
                    <input
                      type="file"
                      className="uploadbtn"
                      onChange={(e) => {
                        this.setState({ selectedFileError: "" });
                        this.fileSelected(e);
                      }}
                    ></input>
                  </label>
                  {this.state.selectedFileError ? (
                    <label className="errtext">
                      {this.state.selectedFileError}
                    </label>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div>
                <button className="submitButton" onClick={() => this.submit()}>
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  render() {
    let redirectToHome = null;
    if (this.state.redirectToHome)
      redirectToHome = <Redirect to="/restaurant/home" />;
    return (
      <>
        {redirectToHome}
        {this.detailsForm()}
      </>
    );
  }
}

export default RestaurantDetails;
