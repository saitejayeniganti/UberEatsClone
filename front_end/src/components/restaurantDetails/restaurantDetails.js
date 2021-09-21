import React, { Component } from "react";
import "./restaurantDetails.css";
import axios from "axios";
import { Redirect } from "react-router";
import bcrypt from "bcryptjs";
import S3 from "react-aws-s3";
import { v4 as uuidv4 } from "uuid";

import dotenv from "dotenv";
dotenv.config();

const config = {
  bucketName: process.env.REACT_APP_BUCKET_NAME,
  dirName: "" /* optional */,
  region: "us-east-2",
  accessKeyId: process.env.REACT_APP_ACCESS_ID,
  secretAccessKey: process.env.REACT_APP_ACCESS_KEY,
};

class RestaurantDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToHome: false,
      name: this.props.location.state.name,
      nameError: "",
      address: this.props.location.state.address,
      addressError: "",
      suite: this.props.location.state.suite,
      suiteError: "",
      email: this.props.location.state.email,
      emailError: "",
      password: this.props.location.state.password,
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
      id: this.props.location.state.id,
    };
  }

  // componentDidMount = () => {
  //   this.setState({

  //   });
  // };

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
      isNaN(this.state.contact) ||
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

    let start = this.state.startTime.split(":");
    let end = this.state.endTime.split(":");

    if (start[0] > end[0] || (start[0] == end[0] && start[1] > start[1])) {
      this.setState({
        startTimeError: "Start time should be before end time",
      });
      return;
    }
    const ReactS3Client = new S3(config);

    ReactS3Client.uploadFile(this.state.selectedFile, uuidv4())
      .then((data) => {
        this.setState({ image_url: data.location });
        if (data.status === 204) {
          console.log(" restaurant image to S3 success");
        } else {
          console.log(" restaurant image to S3 fail");
        }

        let details = {
          name: this.state.name,
          location: this.state.address,
          suite: this.state.suite,
          delivery_type: this.state.deliveryType,
          contact: this.state.contact,
          star_time: this.state.startTime,
          end_time: this.state.endTime,
          id: this.state.id,
          image_url: data.location,
        };
        console.log(details);

        axios
          .put(
            process.env.REACT_APP_UBEREATS_BACKEND_URL + "/restaurant",
            details
          )
          .then((response) => {
            if (response.status === 200) {
              console.log("Restaurant details are Updated");
            }
            this.setState({ redirectToHome: true });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  detailsForm = () => {
    return (
      <>
        <div className="container">
          <div className="formC">
            <div className="innerformC">
              <div className="row" style={{ textAlign: "center" }}>
                <label>
                  <h4>Restaurant Details</h4>
                </label>
              </div>
              <div className="row" style={{ marginLeft: "5%" }}>
                <div className="col-md-6">
                  <input
                    className="txtbox marginTop25"
                    placeholder="Store name"
                    value={this.state.name}
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
                    value={this.state.address}
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
                    value={this.state.suite}
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
                    disabled
                    value={this.state.email}
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
                    disabled
                    placeholder="Password"
                    value={this.state.password}
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
                        endTimeError: "",
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
                        startTimeError: "",
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
                <div>
                  <button className="btnn" onClick={() => this.submit()}>
                    Add Dish
                  </button>
                </div>
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
