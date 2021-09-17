import React, { Component } from "react";
import "./customerHome.css";
import { Divider } from "antd";
import alcohol from "../../Images/alcohol.png";
import burger from "../../Images/burger.png";
import chinese from "../../Images/chinese.png";
import deals from "../../Images/deals.png";
import fastfood from "../../Images/fastfood.png";
import convenience from "../../Images/convenience.png";
import healthy from "../../Images/healthy.png";
import indian from "../../Images/indian.png";
import mexican from "../../Images/mexican.png";
import pharmacy from "../../Images/Pharmacy.png";
import pizza from "../../Images/pizza.png";
import sandwich from "../../Images/sandwich.png";
import sushi from "../../Images/sushi.png";
import top_eats from "../../Images/top_eats.png";
import grocery from "../../Images/grocery.png";
import { Radio, Space } from "antd";

import "antd/dist/antd.css";

class CustomerHome extends React.Component {
  state = {
    filterValue: "All Stores",
    showSort: true,
  };
  dishes = () => {
    const style = { background: "#0092ff", padding: "8px 0" };
    return (
      <div className="container-fluid">
        <div className="container">
          <div className="row">
            <div className="col-md-1 image_div">
              <div>
                <img className="image_style" src={deals}></img>
              </div>
              <label>Deals</label>
            </div>
            <div className="col-md-1 image_div">
              <img className="image_style" src={grocery}></img>
              <label>Grocery</label>
            </div>
            {/* <div className="col-md-1 image_div">
              <img className="image_style" src={convenience}></img>
              <label>Convenience</label>
            </div> */}
            <div className="col-md-1 image_div">
              <img className="image_style" src={alcohol}></img>
              <label>Alcohol</label>
            </div>
            {/* <div className="col-md-1 image_div">
              <img className="image_style" src={pharmacy}></img>
              <label>Pharmacy</label>
            </div> */}
            <div className="col-md-1 image_div">
              <img className="image_style" src={top_eats}></img>
              <label>Top Eats</label>
            </div>
            <div className="col-md-1 image_div">
              <img className="image_style" src={fastfood}></img>
              <label>Fast Food</label>
            </div>
            <div className="col-md-1 image_div">
              <img className="image_style" src={burger}></img>
              <label>Burgers</label>
            </div>
            <div className="col-md-1 image_div">
              <img className="image_style" src={sushi}></img>
              <label>Sushi</label>
            </div>
            <div className="col-md-1 image_div">
              <img className="image_style" src={pizza}></img>
              <label>Pizza</label>
            </div>
            <div className="col-md-1 image_div">
              <img className="image_style" src={chinese}></img>
              <label>Chinese</label>
            </div>
            <div className="col-md-1 image_div">
              <img className="image_style" src={mexican}></img>
              <label>Mexican</label>
            </div>
            <div className="col-md-1 image_div">
              <img className="image_style" src={indian}></img>
              <label>Indian</label>
            </div>
            <div className="col-md-1 image_div">
              <img className="image_style" src={sandwich}></img>
              <label>Sandwich</label>
            </div>
          </div>
          <Divider></Divider>
        </div>
      </div>
    );
  };

  filters = () => {
    return (
      <div className="col-md-2">
        <h1 className="allstores">{this.state.filterValue}</h1>
        <div className="row">
          <div
            className="col-md-8"
            onClick={(e) => {
              if (this.state.showSort == true)
                this.setState({ showSort: false });
              else this.setState({ showSort: true });
            }}
          >
            <h5>Sort</h5>
          </div>
          <div className="col-md-4">
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
          {this.state.showSort ? (
            <Radio.Group>
              <Space direction="vertical">
                <Radio value={1}>Picked for you (default)</Radio>
                <Radio value={2}>Most Popular</Radio>
                <Radio value={3}>Rating</Radio>
                <Radio value={4}>Delivery Time</Radio>
              </Space>
            </Radio.Group>
          ) : (
            ""
          )}
        </div>

        {/* Price Range Filter */}
      </div>
    );
  };
  render() {
    return (
      <div>
        {/* {this.dishes()} */}
        {this.filters()}
      </div>
    );
  }
}

export default CustomerHome;
