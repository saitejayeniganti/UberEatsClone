import React, { Component } from "react";
import { Redirect } from "react-router";
import axios from "axios";
import "./../../commonCSS.css";
import { Container } from "react-bootstrap";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteFillIcon from "@mui/icons-material/Favorite";
import tagIcon from "../../Images/tag.png";
import CustomerFooter from "../footer/customerFooter";

class CustomerFavorites extends React.Component {
  state = {
    // restaurantId: JSON.parse(sessionStorage.getItem("restaurantDetails")).id,
    restaurants: [],
    redirectToRestaurant: false,
    selectedRestaurant: "",
  };

  redirectToRestaurants = (restaurant) => {
    // console.log(restaurant);
    this.setState({
      selectedRestaurant: restaurant,
      redirectToRestaurant: true,
    });
  };

  componentDidMount() {
    let details = {
      // latitude: this.state.latitude,
      // longitude: this.state.longitude,
      latitude: "37.3352",
      longitude: "-121.8811",
      id: JSON.parse(sessionStorage.getItem("customerDetails")).id,
    };
    axios
      .post(
        process.env.REACT_APP_UBEREATS_BACKEND_URL + "/customer/favorite",
        details
      )
      .then((response) => {
        if (response.status === 200) {
          //   console.log(response.data);
          this.setState({ restaurants: response.data });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

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
                    marginBottom: "20px",
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
                        {!restaurant.favorite ? (
                          <FavoriteBorderIcon
                            className="fav_icon"
                            // onClick={() => this.makeFavorite(restaurant)}
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
                        {Math.floor(restaurant.distance) < 32 ? (
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

  makeUnFavorite = (restaurant) => {
    let restaurant_id = restaurant.id;
    let rts = this.state.restaurants;

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

  redirectToRestaurants = (restaurant) => {
    // console.log(restaurant);
    this.setState({
      selectedRestaurant: restaurant,
      redirectToRestaurant: true,
    });
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
      <>
        {redirectToRestaurant}
        <div
          className="container-fluid"
          style={{ marginLeft: "3%", marginRight: "6%" }}
        >
          <div
            className="row"
            style={{
              marginLeft: "60px",
              padding: "30px",
              paddingTop: "10px",

              fontSize: "40px",
              fontWeight: "600",
            }}
          >
            Favorites
          </div>
          {this.restaurants()}
        </div>
      </>
    );
  }
}

export default CustomerFavorites;
