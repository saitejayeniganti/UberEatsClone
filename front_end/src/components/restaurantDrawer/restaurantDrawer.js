import React, { Component } from "react";
import { Redirect } from "react-router";
import { Drawer } from "antd";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
// import ubereatslogo from "../../Images/UberEatsLogo.png";
import ubereatslogo from "../../Images/ubereatsLo.svg";
import dishIcon from "../../Images/fastfoodsvg.svg";
import icon from "../../Images/icon.jpeg";

class RestaurantSideBar extends Component {
  constructor(props) {
    super(props);
    this.state = { visible: false, name: "" };
  }

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  iconInDrawer = () => {
    return (
      <>
        <div>
          <h1>this is aheader</h1>
          <img src={icon} />
        </div>
      </>
    );
  };

  render() {
    return (
      <>
        {" "}
        <Box sx={{ flexGrow: 1 }}>
          <AppBar
            position="static"
            sx={{ minHeight: "88px", background: "white" }}
          >
            <Toolbar>
              <svg
                aria-hidden="true"
                focusable="false"
                viewBox="0 0 20 20"
                className="menu_icon"
                onClick={this.showDrawer}
              >
                <path d="M19.167 3.333H.833v2.5h18.334v-2.5zm0 5.834H.833v2.5h18.334v-2.5zM.833 15h18.334v2.5H.833V15z" />
              </svg>
              {/* <img
                style={{ height: "81px", width: "152px" }}
                src={ubereatslogo}
              /> */}
              <img
                alt="Uber Eats Home"
                role="img"
                src={ubereatslogo}
                width="146"
                height="24"
                className="navBar_img"
              ></img>
            </Toolbar>
          </AppBar>
        </Box>
        {/* {sessionStorage.getItem("restaurantDetails") == null ? (
          ""
        ) : ( */}
        <Drawer
          title={
            <div>
              <div className="row">
                <div className="col-sm-4">
                  <img
                    style={{ borderRadius: "50%", height: "50px" }}
                    src={icon}
                  />
                </div>
                <div className="col-sm-8" style={{ marginTop: "5px" }}>
                  <div className="row txtSmall">Sai teja</div>
                  <div className="row greentxt">View account</div>
                </div>
              </div>
            </div>
          }
          placement="left"
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
          key="left"
        >
          <div className="row">
            <div className="col-md-2" style={{ marginLeft: "4px" }}>
              <img style={{ width: "15px", height: "15px" }} src={dishIcon} />
            </div>

            <div className="col-md-5" style={{ marginTop: "3px" }}>
              <h6>Add Dish</h6>
            </div>
          </div>
          <div className="row" style={{ marginTop: "20px" }}>
            <div className="col-md-2">
              <svg
                aria-hidden="true"
                focusable="false"
                viewBox="0 0 24 24"
                className="drawer_icon"
              >
                <path d="M4.5 2.833v18.333l4.583-2.5 2.917 2.5 2.917-2.5 4.583 2.5V2.833h-15zM16.167 9.5H7.833V7h8.334v2.5z"></path>
              </svg>
            </div>

            <div
              className="col-md-5"
              style={{ marginTop: "3px", marginLeft: "3px" }}
            >
              <h6>Orders</h6>
            </div>
          </div>
          <div style={{ marginTop: "20px" }}>Sign out</div>
        </Drawer>
        {/* )} */}
      </>
    );
  }
}

export default RestaurantSideBar;
