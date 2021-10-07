import React, { Component } from "react";
import "./restaurantAddDish.css";
import axios from "axios";
import "./../../commonCSS.css";
import { Redirect } from "react-router";
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

class RestaurantAddDish extends React.Component {
  state = {
    name: "",
    main_ingredients: "",
    dish_price: 0,
    description: "",
    dish_category: "-1",
    cuisine: "",
    cuisineError: "",
    dish_type: "-1",
    dish_typeError: "",
    nameError: "",
    main_ingredientsError: "",
    dish_priceError: "",
    descriptionError: "",
    dish_categoryError: "",
    selectedFile: "",
    selectedFileError: "",
    image_url: "",
    redirectToHome: false,
  };

  submit = () => {
    if (this.state.name === "") {
      this.setState({ nameError: "Enter a dish name" });
      return;
    }
    if (this.state.dish_category === "-1") {
      this.setState({ dish_categoryError: "Select a category" });
      return;
    }
    // if (this.state.cuisine === "") {
    //   this.setState({ cuisineError: "Enter dish cuisine" });
    //   return;
    // }
    if (this.state.main_ingredients === "") {
      this.setState({ main_ingredientsError: "Enter dish ingredients" });
      return;
    }
    if (
      this.state.dish_price === "" ||
      isNaN(this.state.dish_price) ||
      parseFloat(this.state.dish_price) <= 0
    ) {
      this.setState({ dish_priceError: "Enter a valid price value" });
      return;
    }
    // if (this.state.dish_type === "-1" || this.state.dish_type <= 0) {
    //   this.setState({ dish_typeError: "Select dish type" });
    //   return;
    // }
    if (this.state.description === "") {
      this.setState({ descriptionError: "Enter description" });
      return;
    }

    const ReactS3Client = new S3(config);

    ReactS3Client.uploadFile(this.state.selectedFile, uuidv4())
      .then((data) => {
        this.setState({ image_url: data.location });
        if (data.status === 204) {
          console.log(" upload to S3 success");
        } else {
          console.log(" upload to S3 fail");
        }
        // console.log(this.state.selectedFile);
        let details = {
          restaurant_id: JSON.parse(sessionStorage.getItem("restaurantDetails"))
            .id,
          name: this.state.name,
          main_ingredients: this.state.main_ingredients,
          price: this.state.dish_price,
          description: this.state.description,
          category: this.state.dish_category,
          cuisine: this.state.dish_category,
          url: data.location,
          type: this.state.dish_type,
        };
        axios
          .post(
            process.env.REACT_APP_UBEREATS_BACKEND_URL + "/restaurant/dishes",
            details
          )
          .then((response) => {
            if (response.status === 200) {
              console.log("Dish is inserted");
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

  addDishForm = () => {
    return (
      <div className="container">
        <div className="formC">
          <div className="innerformC">
            <div className="row">
              <label>
                <h3>Add Dish to the Menu</h3>
              </label>
            </div>
            <div className="row" style={{ marginLeft: "5%" }}>
              <div className="col-md-6">
                <input
                  className="txtbox marginTop25"
                  placeholder="Dish name"
                  onChange={(e) =>
                    this.setState({ name: e.target.value, nameError: "" })
                  }
                ></input>
                {this.state.nameError ? (
                  <label className="errtext">{this.state.nameError}</label>
                ) : (
                  ""
                )}
                <select
                  className="txtbox marginTop25"
                  onChange={(e) =>
                    this.setState({
                      dish_category: e.target.value,
                      dish_categoryError: "",
                    })
                  }
                >
                  <option value="-1">Select Category</option>
                  <option value="Salad">Salad</option>
                  <option value="Appetizer">Appetizer</option>
                  <option value="Main Course">Main Course</option>
                  <option value="Beverages">Beverages</option>
                  <option value="Dessert">Dessert</option>
                </select>
                {this.state.dish_categoryError ? (
                  <label className="errtext">
                    {this.state.dish_categoryError}
                  </label>
                ) : (
                  ""
                )}
                <input
                  className="txtbox marginTop25"
                  placeholder="Cuisine"
                  onChange={(e) =>
                    this.setState({ cuisine: e.target.value, cuisineError: "" })
                  }
                ></input>
                {this.state.cuisineError ? (
                  <label className="errtext">{this.state.cuisineError}</label>
                ) : (
                  ""
                )}

                <textarea
                  className="txtareas marginTop20"
                  placeholder="Main Ingredients"
                  rows="4"
                  onChange={(e) =>
                    this.setState({
                      main_ingredients: e.target.value,
                      main_ingredientsError: "",
                    })
                  }
                ></textarea>
                {this.state.main_ingredientsError ? (
                  <label className="errtext">
                    {this.state.main_ingredientsError}
                  </label>
                ) : (
                  ""
                )}
              </div>
              <div className="col-md-6">
                <input
                  className="txtbox marginTop25"
                  placeholder="Price"
                  min="1"
                  onChange={(e) =>
                    this.setState({
                      dish_price: e.target.value,
                      dish_priceError: "",
                    })
                  }
                ></input>
                {this.state.dish_priceError ? (
                  <label className="errtext">
                    {this.state.dish_priceError}
                  </label>
                ) : (
                  ""
                )}
                {/* <input
                  className="txtbox marginTop25"
                  placeholder="Type   Ex:Vegan"
                  type="text"
                  onChange={(e) =>
                    this.setState({
                      dish_type: e.target.value,
                      dish_typeError: "",
                    })
                  }
                ></input> */}
                <select
                  className="txtbox marginTop25"
                  onChange={(e) =>
                    this.setState({
                      dish_type: e.target.value,
                      dish_typeError: "",
                    })
                  }
                >
                  <option value="-1">Select Dish Type</option>
                  <option value="Vegetarian">Vegetarian</option>
                  <option value="Vegan">Vegan</option>
                  <option value="Gluten-free">Gluten-free</option>
                  <option value="Halal">Halal</option>
                  <option value="Allergy-Friendly">Allergy Friendly</option>
                </select>

                {this.state.dish_typeError ? (
                  <label className="errtext">{this.state.dish_typeError}</label>
                ) : (
                  ""
                )}
                <label className="custom-file-upload marginTop25">
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
                <textarea
                  className="txtareas marginTop20"
                  placeholder="Description"
                  onChange={(e) =>
                    this.setState({
                      description: e.target.value,
                      descriptionError: "",
                    })
                  }
                ></textarea>
                {this.state.descriptionError ? (
                  <label className="errtext">
                    {this.state.descriptionError}
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
    );
  };
  render() {
    let redirectToHome = null;
    if (this.state.redirectToHome)
      redirectToHome = <Redirect to="/restaurant/home" />;
    return (
      <>
        {redirectToHome}
        {this.addDishForm()}
      </>
    );
  }
}

export default RestaurantAddDish;
