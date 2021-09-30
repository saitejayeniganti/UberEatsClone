import React, { Component } from "react";
import "./../restaurantDetails/restaurantDetails.css";
import axios from "axios";
import { Redirect } from "react-router";
import bcrypt from "bcryptjs";
import S3 from "react-aws-s3";
import { v4 as uuidv4 } from "uuid";
import CountryName from "../countryName/countryName";
import LocationSearchInput from "../locationAutoComplete/locationAuto";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

import dotenv from "dotenv";
dotenv.config();

const config = {
  bucketName: process.env.REACT_APP_BUCKET_NAME,
  dirName: "" /* optional */,
  region: "us-east-2",
  accessKeyId: process.env.REACT_APP_ACCESS_ID,
  secretAccessKey: process.env.REACT_APP_ACCESS_KEY,
};

class CustomerDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToHome: false,
      name: "",
      nameError: "",
      nickName: "",
      mobile: "",
      mobileError: "",
      email: "",
      emailError: "",
      password: "",
      passwordError: "",
      country: "-1",
      countryError: "",
      state: "",
      stateError: "",
      city: "",
      cityError: "",
      about: "",
      file: "",
      fileError: "",
      imageUrl: "",
      address: "",
      addressError: "",
      latitude: "",
      longitude: "",
    };
  }

  handleChange = (address) => {
    this.setState({ address });
    this.setState({ addressError: "" });
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

  changeCountryName = (country) => {
    // console.log("Changed to - " + code);
    this.setState({ country: country });
    this.setState({ countryError: "" });
  };

  componentDidMount() {
    if (JSON.parse(sessionStorage.getItem("customerDetails")) === null) {
    } else {
      axios
        .get(
          process.env.REACT_APP_UBEREATS_BACKEND_URL +
            "/customer?id=" +
            JSON.parse(sessionStorage.getItem("customerDetails")).id
        )
        .then((response) => {
          if (response.status === 200) {
            console.log("Customer details are retrieved");
          }
          //   console.log(response.data);
          this.setState({
            name: response.data.name,
            nickName: response.data.nick_name,
            mobile: response.data.mobile,
            email: response.data.email_id,
            password: "password",
            country: response.data.country,
            state: response.data.state,
            city: response.data.city,
            about: response.data.about,
            imageUrl: response.data.image_url,
            address: response.data.address,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  fileSelected = (e) => {
    // console.log(e.target.files[0].type);

    if (
      e.target.files[0].type === "image/png" ||
      e.target.files[0].type === "image/jpeg"
    ) {
      this.setState({ file: e.target.files[0], imageUrl: "" });
    } else {
      this.setState({ fileError: "Only jpeg and png are allowed" });
    }
  };

  updateCustomer = (details) => {
    axios
      .put(process.env.REACT_APP_UBEREATS_BACKEND_URL + "/customer", details)
      .then((response) => {
        if (response.status === 200) {
          console.log("Customer details are Updated");
        }
        sessionStorage.setItem("customerDetails", JSON.stringify(details));
        this.setState({ redirectToHome: true });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  submit = () => {
    if (this.state.name === "") {
      this.setState({ nameError: "Enter name" });
      return;
    }
    if (
      this.state.mobile === "" ||
      !/^\d+$/.test(this.state.mobile) === true ||
      this.state.mobile.length < 10
    ) {
      this.setState({ mobileError: "Enter a valid mobile number" });
      return;
    }
    let regex = /\S+@\S+\.\S+/;
    if (this.state.email === "" || !regex.test(this.state.email)) {
      this.setState({ emailError: "Enter a valid email address" });
      return;
    }

    if (this.state.password === "" || this.state.password === null) {
      this.setState({ passwordError: "Enter a password" });
      return;
    }

    if (this.state.country === "-1" || this.state.country === null) {
      this.setState({
        countryError: "Select a country",
      });
      return;
    }

    if (this.state.state === "" || this.state.state === null) {
      this.setState({ stateError: "Enter a state" });
      return;
    }

    if (this.state.city === "" || this.state.city === null) {
      this.setState({ cityError: "Enter a city" });
      return;
    }

    if (this.state.address === "" || this.state.address === null) {
      this.setState({ addressError: "Enter address" });
      return;
    }

    if (
      (this.state.imageUrl === null || this.state.imageUrl === "") &&
      this.state.file === ""
    ) {
      this.setState({ fileError: "Select an image" });
      return;
    }

    const ReactS3Client = new S3(config);
    if (this.state.imageUrl === "") {
      ReactS3Client.uploadFile(this.state.file, uuidv4())
        .then((data) => {
          this.setState({ imageUrl: data.location });
          if (data.status === 204) {
            console.log(" Customer image to S3 success");
          } else {
            console.log(" customer image to S3 fail");
          }

          if (!this.state.emailError === "" || !this.state.mobileError === "")
            return;
          let details = {
            name: this.state.name,
            email_id: this.state.email,
            mobile: this.state.mobile,
            city: this.state.city,
            state: this.state.state,
            country: this.state.country,
            nick_name: this.state.nickName,
            about: this.state.about,
            image_url: data.location,
            address: this.state.address,
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            id: JSON.parse(sessionStorage.getItem("customerDetails")).id,
          };
          // console.log(details);
          this.updateCustomer(details);
          // axios
          //   .put(
          //     process.env.REACT_APP_UBEREATS_BACKEND_URL + "/customer",
          //     details
          //   )
          //   .then((response) => {
          //     if (response.status === 200) {
          //       console.log("Customer details are Updated");
          //     }
          //     sessionStorage.setItem("customerDetails", JSON.stringify(details));
          //     this.setState({ redirectToHome: true });
          //   })
          //   .catch((err) => {
          //     console.log(err);
          //   });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      let details = {
        name: this.state.name,
        email_id: this.state.email,
        mobile: this.state.mobile,
        city: this.state.city,
        state: this.state.state,
        country: this.state.country,
        nick_name: this.state.nickName,
        about: this.state.about,
        image_url: this.state.imageUrl,
        address: this.state.address,
        latitude: this.state.latitude,
        longitude: this.state.longitude,
        id: JSON.parse(sessionStorage.getItem("customerDetails")).id,
      };
      this.updateCustomer(details);
    }
  };

  checkExisting = (e, input) => {
    axios
      .get(
        process.env.REACT_APP_UBEREATS_BACKEND_URL +
          "/customer/login?email_id=" +
          e.target.value
      )
      .then((response) => {
        if (response.data) {
          if (
            response.data.id !==
            JSON.parse(sessionStorage.getItem("customerDetails")).id
          ) {
            if (input === "mobile") {
              this.setState({
                mobileError: "Mobile number already Exists",
              });
              return;
            }
            if (input === "email") {
              this.setState({
                emailError: "Email already exists",
              });
              return;
            }
          }
        }
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
                  <h4>User Profile</h4>
                </label>
              </div>
              <div className="row" style={{ marginLeft: "5%" }}>
                <div className="col-md-6">
                  <input
                    className="txtbox marginTop25"
                    placeholder="name"
                    on
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
                    value={this.state.nickName}
                    placeholder="Nick Name"
                    onChange={(e) =>
                      this.setState({ nickName: e.target.value })
                    }
                  ></input>
                  <input
                    className="txtbox marginTop20"
                    placeholder="Country Code + Mobile"
                    value={this.state.mobile}
                    onBlur={(e) => this.checkExisting(e, "mobile")}
                    onChange={(e) =>
                      this.setState({
                        mobile: e.target.value,
                        mobileError: "",
                      })
                    }
                  ></input>{" "}
                  {this.state.mobileError ? (
                    <label className="errtext">{this.state.mobileError}</label>
                  ) : (
                    ""
                  )}
                  <input
                    className="txtbox marginTop20"
                    value={this.state.email}
                    placeholder="Email"
                    onBlur={(e) => this.checkExisting(e, "email")}
                    onChange={(e) =>
                      this.setState({ email: e.target.value, emailError: "" })
                    }
                  ></input>
                  {this.state.emailError ? (
                    <label className="errtext">{this.state.emailError}</label>
                  ) : (
                    ""
                  )}
                  {/* <input
                    className="txtbox marginTop20"
                    placeholder="Password"
                    type="password"
                    disabled
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
                  )} */}
                  <textarea
                    className="txtareas marginTop20"
                    placeholder="About"
                    rows="4"
                    value={this.state.about}
                    onChange={(e) =>
                      this.setState({
                        about: e.target.value,
                        aboutError: "",
                      })
                    }
                  ></textarea>
                </div>
                <div className="col-md-6">
                  <CountryName changeCountryName={this.changeCountryName} />
                  {this.state.country ? (
                    <label className="errtext">{this.state.countryError}</label>
                  ) : (
                    ""
                  )}
                  <input
                    className="txtbox marginTop20"
                    type="text"
                    placeholder="State"
                    value={this.state.state}
                    onChange={(e) =>
                      this.setState({
                        state: e.target.value,
                        stateError: "",
                      })
                    }
                  ></input>
                  {this.state.stateError ? (
                    <label className="errtext">{this.state.stateError}</label>
                  ) : (
                    ""
                  )}
                  <br />

                  <input
                    className="txtbox marginTop20"
                    placeholder="City"
                    value={this.state.city}
                    onChange={(e) => {
                      this.setState({
                        city: e.target.value,
                        cityError: "",
                      });
                    }}
                  ></input>
                  {this.state.cityError ? (
                    <label className="errtext">{this.state.cityError}</label>
                  ) : (
                    ""
                  )}
                  {/* <input
                    className="txtbox marginTop20"
                    placeholder="Address"
                    value={this.state.about}
                    onChange={(e) =>
                      this.setState({
                        address: e.target.value,
                        addressError: "",
                      })
                    }
                  ></input> */}
                  <div className="marginTop20">
                    <LocationSearchInput
                      handleChange={this.handleChange}
                      handleSelect={this.handleSelect}
                      address={this.state.address}
                    />
                  </div>
                  {this.state.addressError ? (
                    <label className="errtext">{this.state.addressError}</label>
                  ) : (
                    ""
                  )}
                  <div
                    className="row marginTop20"
                    style={{ marginTop: "20px" }}
                  >
                    <div className="col-md-6">
                      <label className="custom-file-upload ">
                        <input
                          type="file"
                          className="uploadbtnDetails"
                          onChange={(e) => {
                            this.setState({ fileError: "" });
                            this.fileSelected(e);
                          }}
                        ></input>
                      </label>
                    </div>
                    <div style={{ width: "43px" }}></div>
                    <div className="col-md-3">
                      {this.state.imageUrl === "" ? (
                        this.state.file ? (
                          <img
                            style={{
                              height: "100px",
                              width: "100px",
                              // borderStyle: "groove",
                            }}
                            src={URL.createObjectURL(this.state.file)}
                          />
                        ) : (
                          ""
                        )
                      ) : (
                        <img
                          style={{
                            height: "100px",
                            width: "100px",
                            // borderStyle: "groove",
                          }}
                          src={this.state.imageUrl}
                        />
                      )}
                    </div>
                  </div>
                  {this.state.fileError ? (
                    <label className="errtext">{this.state.fileError}</label>
                  ) : (
                    ""
                  )}
                </div>
                <div>
                  <button className="btnn" onClick={() => this.submit()}>
                    Save Details
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
      redirectToHome = <Redirect to="/customer/home" />;
    return (
      <>
        {redirectToHome}
        {this.detailsForm()}
      </>
    );
  }
}

export default CustomerDetails;
