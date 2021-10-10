import React, { Component } from "react";
import "./customerHome.css";
import { Divider } from "antd";
import alcohol from "../../Images/alcohol.png";
import burger from "../../Images/burger.png";
import chinese from "../../Images/chinese.png";
import deals from "../../Images/deals.png";
import fastfood from "../../Images/fastfood.png";
import convenience from "../../Images/convenience.png";
import indian from "../../Images/indian.png";
import mexican from "../../Images/mexican.png";
import pharmacy from "../../Images/Pharmacy.png";
import pizza from "../../Images/pizza.png";
import sandwich from "../../Images/sandwich.png";
import sushi from "../../Images/sushi.png";
import top_eats from "../../Images/top_eats.png";
import grocery from "../../Images/grocery.png";
import italian from "../../Images/italian.png";
import american from "../../Images/american.png";
import dessert from "../../Images/dessert.png";
import japanese from "../../Images/japanese.png";
import asian from "../../Images/asian.png";
import axios from "axios";
import { Radio, Space } from "antd";
import { Slider } from "antd";
import "antd/dist/antd.css";
import "./../../commonCSS.css";
import { Container } from "react-bootstrap";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteFillIcon from "@mui/icons-material/Favorite";
import tagIcon from "../../Images/tag.png";
import { Redirect } from "react-router";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

import LocationSearchInput from "../locationAutoComplete/locationAuto";

class CustomerHome extends React.Component {
  state = {
    latitude: "",
    longitude: "",
    // filterValue: "All Stores",
    showSort: true,
    showPrice: true,
    showDeliveryFee: true,
    showDietary: true,
    priceCount: "",
    restaurants: [],
    redirectToRestaurant: false,
    selectedRestaurant: "",
    deliveryType: "",
    dietary: "",
    address: "",
  };

  handleChange = (address) => {
    this.setState({ address });
  };

  handleSelect = (address) => {
    geocodeByAddress(address).then((results) => {
      this.setState({ address: address });
      getLatLng(results[0])
        .then((latLng) => {
          console.log("Success", latLng);
          this.setState({ latitude: latLng.lat, longitude: latLng.lng });
          this.search(
            this.state.deliveryType,
            this.state.dietary,
            latLng.lat,
            latLng.lng
          );
        })
        .catch((error) => console.error("Error", error));
    });
  };

  componentDidMount() {
    let details = {
      latitude:
        this.state.latitude == ""
          ? JSON.parse(sessionStorage.getItem("customerDetails")).latitude
          : this.state.latitude,
      longitude:
        this.state.longitude == ""
          ? JSON.parse(sessionStorage.getItem("customerDetails")).longitude
          : this.state.longitude,
      id: JSON.parse(sessionStorage.getItem("customerDetails")).id,
      type: "",
      dType: "",
    };
    console.log(details);
    axios
      .post(
        process.env.REACT_APP_UBEREATS_BACKEND_URL + "/restaurant/location",
        details
      )
      .then((response) => {
        if (response.status === 200) {
          // console.log(response.data);
          // console.log("Restaurants are retrieved");
          this.setState({ restaurants: response.data });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  search = (deliveryType, dietary, latitude, longitude) => {
    let details = {
      latitude:
        latitude == ""
          ? JSON.parse(sessionStorage.getItem("customerDetails")).latitude
          : latitude,
      longitude:
        longitude == ""
          ? JSON.parse(sessionStorage.getItem("customerDetails")).longitude
          : longitude,
      id: JSON.parse(sessionStorage.getItem("customerDetails")).id,
      type: dietary,
      dType: deliveryType,
    };
    axios
      .post(
        process.env.REACT_APP_UBEREATS_BACKEND_URL + "/restaurant/location",
        details
      )
      .then((response) => {
        if (response.status === 200) {
          // console.log("Restaurants are retrieved");
          this.setState({ restaurants: response.data });
        }
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  dishes = () => {
    const style = { background: "#0092ff", padding: "8px 0" };
    return (
      <div className="container-fluid">
        <div
          className="row"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <div className=" image_div">
            <img className="image_style" src={deals}></img>
            <label>Deals</label>
          </div>
          <div className=" image_div">
            <img className="image_style" src={grocery}></img>
            <label>Grocery</label>
          </div>
          <div className=" image_div">
            <img className="image_style" src={convenience}></img>
            <label>Convenience</label>
          </div>
          <div className=" image_div">
            <img className="image_style" src={alcohol}></img>
            <label>Alcohol</label>
          </div>
          <div className=" image_div">
            <img className="image_style" src={pharmacy}></img>
            <label>Pharmacy</label>
          </div>
          <div className=" image_div">
            <img className="image_style" src={top_eats}></img>
            <label>Top Eats</label>
          </div>
          <div className=" image_div">
            <img className="image_style" src={asian}></img>
            <label>Asian</label>
          </div>
          <div className=" image_div">
            <img className="image_style" src={japanese}></img>
            <label>Japanese</label>
          </div>
          <div className=" image_div">
            <img className="image_style" src={fastfood}></img>
            <label>FastFood</label>
          </div>
          <div className=" image_div">
            <img className="image_style" src={burger}></img>
            <label>Burgers</label>
          </div>
          <div className=" image_div">
            <img className="image_style" src={sushi}></img>
            <label>Sushi</label>
          </div>
          <div className=" image_div">
            <img className="image_style" src={pizza}></img>
            <label>Pizza</label>
          </div>
          <div className=" image_div">
            <img className="image_style" src={chinese}></img>
            <label>Chinese</label>
          </div>
          <div className=" image_div">
            <img className="image_style" src={mexican}></img>
            <label>Mexican</label>
          </div>
          <div className=" image_div">
            <img className="image_style" src={indian}></img>
            <label>Indian</label>
          </div>
          <div className=" image_div">
            <img className="image_style" src={sandwich}></img>
            <label>Sandwich</label>
          </div>
          <div className=" image_div">
            <img className="image_style" src={american}></img>
            <label>American</label>
          </div>
          <div className=" image_div">
            <img className="image_style" src={italian}></img>
            <label>Italian</label>
          </div>
          <div className=" image_div">
            <img className="image_style" src={dessert}></img>
            <label>Desserts</label>
          </div>
        </div>
        <Divider></Divider>
      </div>
    );
  };

  filters = () => {
    return (
      <>
        <div style={{ width: "260px", marginBottom: "25px" }}>
          <LocationSearchInput
            handleChange={this.handleChange}
            handleSelect={this.handleSelect}
            address={this.state.address}
          />
        </div>
        <div
          className="col-md-12"
          style={{
            top: 0,
            marginTop: "20px",
            position: "-webkit-sticky",
            position: "sticky",
          }}
        >
          <h1 className="allstores">All Stores</h1>
          <div
            className="row  "
            onClick={(e) => {
              if (this.state.showSort == true)
                this.setState({ showSort: false });
              else this.setState({ showSort: true });
            }}
          >
            <div className="col-md-9 filterHeading ">Delivery Type</div>
            <div className="col-md-3">
              <svg height="24px" width="24px" id="arrow">
                {this.state.showSort ? (
                  <path
                    d="M17 11.7494V14.916L12 11.0827L7 14.916V11.7494L12 7.91602L17 11.7494Z"
                    transform="rotate(180, 12, 12)"
                  />
                ) : (
                  <path d="M17 11.7494V14.916L12 11.0827L7 14.916V11.7494L12 7.91602L17 11.7494Z" />
                )}
              </svg>
            </div>
          </div>
          {this.state.showSort ? (
            <Radio.Group
              onChange={(e) => {
                this.setState({ deliveryType: e.target.value });
                this.search(
                  e.target.value,
                  this.state.dietary,
                  this.state.latitude,
                  this.state.longitude
                );
              }}
              defaultValue=""
            >
              <Space direction="vertical">
                {/* <Radio value="default">Picked for you (default)</Radio>
              <Radio value="count of orders">Most Popular</Radio> */}
                <Radio value="">All</Radio>
                <Radio value="Delivery">Delivery</Radio>
                <Radio value="Pickup">Pickup</Radio>
              </Space>
            </Radio.Group>
          ) : (
            ""
          )}
          <div style={{ height: "25px" }}></div>
          {/* Price Range Filter */}
          {/* <div
          className="row"
          onClick={(e) => {
            if (this.state.showPrice == true)
              this.setState({ showPrice: false });
            else this.setState({ showPrice: true });
          }}
        >
          <div className="col-md-8 filterHeading">Price Range</div>
          <div className="col-md-1">{this.state.priceCount}</div>
          <div className="col-md-3">
            <svg height="24px" width="24px">
              {this.state.showPrice ? (
                <path
                  d="M17 11.7494V14.916L12 11.0827L7 14.916V11.7494L12 7.91602L17 11.7494Z"
                  transform="rotate(180, 12, 12)"
                />
              ) : (
                <path d="M17 11.7494V14.916L12 11.0827L7 14.916V11.7494L12 7.91602L17 11.7494Z" />
              )}
            </svg>
          </div>
        </div>
        {this.state.showPrice ? (
          <>
            <div className="margin10">
              <button className="priceButtonHome">
                <div
                  style={{
                    paddingLeft: "3px",
                    paddingRight: "3px",
                    paddingBottom: "2px",
                    paddingTop: "2px",
                    fontSize: "14px",
                  }}
                >
                  <b>$</b>
                </div>
              </button>
              <button className="priceButtonHome">
                <div style={{ padding: "3px", fontSize: "14px" }}>
                  <b>$$</b>
                </div>
              </button>
              <button className="priceButtonHome">
                <div style={{ padding: "3px", fontSize: "14px" }}>
                  <b>$$$</b>
                </div>
              </button>
              <button className="priceButtonHome">
                <div style={{ padding: "3px", fontSize: "14px" }}>
                  <b>$$$$</b>
                </div>
              </button>
            </div>
          </>
        ) : (
          ""
        )}
        <div style={{ height: "25px" }}></div> */}
          {/* Max Delivery Fee */}
          {/* <div
          className="row"
          onClick={(e) => {
            if (this.state.showDeliveryFee == true)
              this.setState({ showDeliveryFee: false });
            else this.setState({ showDeliveryFee: true });
          }}
        >
          <div className="col-md-9 filterHeading">Max Delivery Fee</div>
          <div className="col-md-3">
            <svg height="24px" width="24px">
              {this.state.showDeliveryFee ? (
                <path
                  d="M17 11.7494V14.916L12 11.0827L7 14.916V11.7494L12 7.91602L17 11.7494Z"
                  transform="rotate(180, 12, 12)"
                />
              ) : (
                <path d="M17 11.7494V14.916L12 11.0827L7 14.916V11.7494L12 7.91602L17 11.7494Z" />
              )}
            </svg>
          </div>
        </div>
        {this.state.showDeliveryFee ? (
          <div className="margin10">
            <Slider
              style={{ width: "230px" }}
              marks={{
                0: "1",
                2: "3",
                4: "5",
                6: "5+",
              }}
              step={null}
              max={6}
              defaultValue={3}
            />
          </div>
        ) : (
          ""
        )}
        <div style={{ height: "25px" }}></div> */}
          {/* Dietary */}
          <div
            className="row"
            onClick={(e) => {
              if (this.state.showDietary == true)
                this.setState({ showDietary: false });
              else this.setState({ showDietary: true });
            }}
          >
            <div className="col-md-9 filterHeading">Dietary</div>
            <div className="col-md-3">
              <svg height="24px" width="24px">
                {this.state.showDietary ? (
                  <path
                    d="M17 11.7494V14.916L12 11.0827L7 14.916V11.7494L12 7.91602L17 11.7494Z"
                    transform="rotate(180, 12, 12)"
                  />
                ) : (
                  <path d="M17 11.7494V14.916L12 11.0827L7 14.916V11.7494L12 7.91602L17 11.7494Z" />
                )}
              </svg>
            </div>
          </div>
          {this.state.showDietary ? (
            <Radio.Group
              onChange={(e) => {
                console.log(e.target.value);
                this.setState({ dietary: e.target.value });
                this.search(
                  this.state.deliveryType,
                  e.target.value,
                  this.state.latitude,
                  this.state.longitude
                );
              }}
              defaultValue=""
            >
              <Space direction="vertical">
                {/* <Radio value="default">Picked for you (default)</Radio>
              <Radio value="count of orders">Most Popular</Radio> */}
                <Radio value="">All</Radio>
                <Radio value="Vegetarian">Vegetarian</Radio>
                <Radio value="Vegan">Vegan</Radio>
                <Radio value="Gluten-fre">Gluten-free</Radio>
                <Radio value="Halal">Halal</Radio>
                <Radio value="AllergyFriendly">Allergy Friendly</Radio>
                <Radio value="Nonveg">Non-Vegetarian</Radio>
              </Space>
            </Radio.Group>
          ) : (
            ""
          )}
          {/* {this.state.showDietary ? (
          <>
            <div className="margin10">
              <button
                className="priceButtonHome"
                style={{ marginBottom: "8px", marginLeft: "0px" }}
              >
                <div
                  className="row"
                  style={{
                    padding: "3px",
                    paddingRight: "0px",
                  }}
                >
                  <div className="col-md-2">
                    <svg height="20px" width="20px" viewBox="0 0 24 24">
                      <path d="M14.083 2.833c-4.333 0-7.916 3.583-7.916 7.917v5.333L2.75 19.5l1.75 1.75 3.417-3.417h4.5a8.749 8.749 0 008.75-8.75v-6.25h-7.084zm0 2.5h3.75L8.667 14.5v-3.75c0-3 2.416-5.417 5.416-5.417z" />
                    </svg>
                  </div>

                  <div className="col-md-9" style={{ fontSize: "14px" }}>
                    Vegetarian
                  </div>
                </div>
              </button>
              <button
                className="priceButtonHome"
                style={{ marginBottom: "8px", marginLeft: "5px" }}
              >
                <div
                  className="row"
                  style={{ padding: "3px", paddingRight: "0px" }}
                >
                  <div className="col-md-2">
                    <svg height="20px" width="20px" viewBox="0 0 24 24">
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M12 5.182C13.09 4 14.546 2.909 16.546 2.909 19.727 2.91 22 5.546 22 8.82c0 1.636-.727 3-1.818 4.09L12 20.637l-8.182-7.728C2.636 11.91 2 10.455 2 8.82c0-3.273 2.273-5.91 5.455-5.91 2 0 3.454 1.182 4.545 2.273zm0 6.09l3.364-3.182 1.818 1.818-5.182 5-5.182-5L8.636 8.09 12 11.272z"
                      ></path>
                    </svg>
                  </div>

                  <div className="col-md-9" style={{ fontSize: "14px" }}>
                    Vegen
                  </div>
                </div>
              </button>
              <button
                className="priceButtonHome"
                style={{ marginBottom: "8px", marginLeft: "0px" }}
              >
                <div
                  className="row"
                  style={{ padding: "3px", paddingRight: "0px" }}
                >
                  <div className="col-md-2">
                    <svg height="20px" width="20px" viewBox="0 0 24 24">
                      <path d="M9.917 12.417l1.666-1.667c1.25-1.25 1.584-3.167.75-4.833L10.75 2.75 9.083 4.417c-1.25 1.25-1.583 3.166-.75 4.833l1.584 3.167zM13.25 12.417l-1.667 1.666 3.167 1.584c1.583.833 3.5.5 4.833-.75l1.667-1.667-3.167-1.583c-1.666-.834-3.583-.5-4.833.75zM7.333 11L5.75 7.833 4.083 9.5c-1.25 1.25-1.583 3.167-.75 4.833L4.917 17.5l1.666-1.667c1.25-1.333 1.584-3.25.75-4.833zM8.25 17.417l-1.667 1.666 3.167 1.584c1.583.833 3.5.5 4.833-.75l1.667-1.667-3.167-1.583c-1.666-.834-3.583-.5-4.833.75zM19.5 2.833c-2.75 0-5 2.25-5 5V9.5h1.667c2.75 0 5-2.25 5-5V2.833H19.5z"></path>
                    </svg>
                  </div>

                  <div className="col-md-9 " style={{ fontSize: "14px" }}>
                    Gluten-free
                  </div>
                </div>
              </button>
              <button
                className="priceButtonHome"
                style={{ marginBottom: "8px", marginLeft: "5px" }}
              >
                <div
                  className="row"
                  style={{ padding: "3px", paddingRight: "0px" }}
                >
                  <div className="col-md-2">
                    <svg height="20px" width="20px" viewBox="0 0 24 24">
                      <path d="M21.167 13.666c0-2.3-1.867-4.166-4.167-4.166V12c.917 0 1.667.75 1.667 1.666h-3.334V5.333h-2.5v8.125a1.878 1.878 0 01-1.875 1.875H8.667v2.5h2.291a4.346 4.346 0 003.409-1.667h6.8v-2.5zM4.5 14.916a.413.413 0 01-.417.417H2v2.5h2.083A2.92 2.92 0 007 14.916V5.333H4.5v9.583z"></path>
                    </svg>
                  </div>

                  <div className="col-md-9" style={{ fontSize: "14px" }}>
                    Halal
                  </div>
                </div>
              </button>
              <button
                className="priceButtonHome"
                style={{ marginBottom: "8px", marginLeft: "0px" }}
              >
                <div
                  className="row"
                  style={{ padding: "3px", paddingRight: "0px" }}
                >
                  <div className="col-md-1">
                    <svg height="20px" width="20px" viewBox="0 0 24 24">
                      <path d="M11.167 4.592V2.834h-2.5v1.758c-4.759.65-5.834 4.909-5.834 4.909H17s-1.075-4.259-5.833-4.909z"></path>
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M13.75 11.168H3.257s-.416 7.275 6.667 10c1.424-.548 2.545-1.28 3.427-2.1A5.81 5.81 0 0112 15.333c0-1.631.67-3.106 1.75-4.165z"
                      ></path>
                      <path d="M22 13.667L20.333 12l-2.083 2.083L16.167 12 14.5 13.667l2.083 2.083-2.083 2.083 1.667 1.667 2.083-2.083 2.083 2.083L22 17.833l-2.083-2.083L22 13.667z"></path>
                    </svg>
                  </div>

                  <div className="col-md-9" style={{ fontSize: "14px" }}>
                    Allergy Friendly
                  </div>
                </div>
              </button>

              <button
                className="priceButtonHome"
                style={{ marginBottom: "8px", marginLeft: "0px" }}
              >
                <div
                  className="row"
                  style={{ padding: "3px", paddingRight: "0px" }}
                >
                  <div className="col-md-1">
                    <svg height="20px" width="20px" viewBox="0 0 24 24">
                      <path d="M11.167 4.592V2.834h-2.5v1.758c-4.759.65-5.834 4.909-5.834 4.909H17s-1.075-4.259-5.833-4.909z"></path>
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M13.75 11.168H3.257s-.416 7.275 6.667 10c1.424-.548 2.545-1.28 3.427-2.1A5.81 5.81 0 0112 15.333c0-1.631.67-3.106 1.75-4.165z"
                      ></path>
                      <path d="M22 13.667L20.333 12l-2.083 2.083L16.167 12 14.5 13.667l2.083 2.083-2.083 2.083 1.667 1.667 2.083-2.083 2.083 2.083L22 17.833l-2.083-2.083L22 13.667z"></path>
                    </svg>
                  </div>

                  <div className="col-md-9" style={{ fontSize: "14px" }}>
                    Non-Vegetarian
                  </div>
                </div>
              </button>
            </div>
          </>
        ) : (
          ""
        )} */}
        </div>
      </>
    );
  };

  redirectToRestaurants = (restaurant) => {
    // console.log(restaurant);
    this.setState({
      selectedRestaurant: restaurant,
      redirectToRestaurant: true,
    });
  };

  makeFavorite = (restaurant) => {
    // console.log(this.state.restaurants);
    let restaurant_id = restaurant.id;
    let rts = this.state.restaurants;
    for (let r in rts) {
      console.log(rts[r].id);
      console.log(restaurant_id);
      if (rts[r].id == restaurant_id) {
        console.log("making favo");
        rts[r].favorite = 1;
        break;
      }
    }
    console.log(rts);
    this.setState({ restaurants: rts });
    let details = {
      customer_id: JSON.parse(sessionStorage.getItem("customerDetails")).id,
      restaurant_id: restaurant_id,
    };
    axios
      .put(
        process.env.REACT_APP_UBEREATS_BACKEND_URL + "/customer/makefavorite",
        details
      )
      .then((response) => {
        if (response.status === 200) {
          // console.log(response.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  makeUnFavorite = (restaurant) => {
    let restaurant_id = restaurant.id;
    let rts = this.state.restaurants;
    for (let r in rts) {
      console.log(rts[r].id);
      console.log(restaurant_id);
      if (rts[r].id == restaurant_id) {
        rts[r].favourite = null;
        break;
      }
    }
    this.setState({ restaurants: rts });
    let details = {
      customer_id: JSON.parse(sessionStorage.getItem("customerDetails")).id,
      restaurant_id: restaurant_id,
    };
    axios
      .put(
        process.env.REACT_APP_UBEREATS_BACKEND_URL + "/customer/makeunfavorite",
        details
      )
      .then((response) => {
        if (response.status === 200) {
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  restaurants = () => {
    return (
      <>
        <div className="row" style={{ marginLeft: "50px" }}>
          {this.state.restaurants.map((restaurant) => {
            return (
              <>
                <div
                  className="col-md-3"
                  style={{
                    padding: "0px",
                    marginRight: "60px",
                    marginLeft: "20px",
                    marginBottom: "30px",
                  }}
                >
                  <Container>
                    <figure
                      className="position-relative"
                      style={{ marginBottom: "0px" }}
                    >
                      <img
                        className="restaurantimgSize"
                        src={restaurant.image_url}
                        alt="Restaurant Image"
                      ></img>
                      <figcaption>
                        {restaurant.favorite === null ? (
                          <FavoriteBorderIcon
                            className="fav_icon"
                            onClick={() => this.makeFavorite(restaurant)}
                          />
                        ) : (
                          <FavoriteFillIcon
                            className="fav_icon_red"
                            onClick={() => this.makeUnFavorite(restaurant)}
                          />
                        )}
                      </figcaption>
                    </figure>
                    <div
                      onClick={() => this.redirectToRestaurants(restaurant)}
                      style={{ cursor: "pointer" }}
                    >
                      <div className="restaurantName">{restaurant.name}</div>
                      <div
                        style={{
                          fontSize: "14px",
                          fontWeight: "400",
                        }}
                      >
                        <img
                          src={tagIcon}
                          style={{ width: "14px", height: "14px" }}
                        />
                        &nbsp;•&nbsp;
                        {Math.floor(restaurant.distance) < 3200 ? (
                          <>
                            ${Math.floor(restaurant.distance)}
                            &nbsp;Delivery fee&nbsp;•&nbsp;
                            <label
                              style={{
                                fontSize: "14px",
                                color: "rgb(117, 117, 117)",
                              }}
                            >
                              {Math.ceil(
                                Math.ceil(
                                  (0.621 * restaurant.distance) / 0.666
                                ) / 5
                              ) * 5}
                              -
                              {Math.ceil(
                                Math.ceil(
                                  (0.621 * restaurant.distance) / 0.666
                                ) / 5
                              ) *
                                5 +
                                10}
                              Min
                            </label>
                          </>
                        ) : (
                          "Cannot be delivered to your location"
                        )}
                      </div>
                    </div>
                  </Container>
                </div>
              </>
            );
          })}
        </div>
      </>
    );
  };

  render() {
    let redirectToRestaurant = null;
    if (this.state.redirectToRestaurant) {
      redirectToRestaurant = (
        <Redirect
          to={{
            pathname: "/customer/restaurant",
            state: { restaurant: this.state.selectedRestaurant },
          }}
        />
      );
    }
    return (
      <div>
        {this.dishes()}
        {redirectToRestaurant}
        <div
          className="container-fluid"
          style={{ marginLeft: "1%", marginRight: "1%", marginTop: "25px" }}
        >
          <div className="row">
            <div className="col-md-2">{this.filters()}</div>

            <div className="col-md-10"> {this.restaurants()}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default CustomerHome;
