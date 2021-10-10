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
import "./restaurantDrawer.css";
import { Link } from "react-router-dom";

class RestaurantSideBar extends Component {
  constructor(props) {
    super(props);
    this.state = { visible: false, name: "", redirectToLogin: false };
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

  removeSession = () => {
    sessionStorage.removeItem("restaurantDetails");
    this.setState({ redirectToLogin: true });
  };

  sidebar = () => {
    return (
      <>
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
                  {/* <div className="row txtSmall">Sai teja</div> */}
                  <div className="row greentxt">
                    {" "}
                    <Link className="greentxt" to="/restaurant/details">
                      {" "}
                      View account
                    </Link>
                  </div>
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
          <div className="row" style={{ marginBottom: "20px" }}>
            <div className="col-md-2" style={{ marginLeft: "4px" }}>
              <svg
                fill="#000000"
                viewBox="0 0 24 24"
                width="17px"
                height="17px"
              >
                {" "}
                <path d="M 15 2 A 1 1 0 0 0 14.300781 2.2851562 L 3.3925781 11.207031 A 1 1 0 0 0 3.3554688 11.236328 L 3.3183594 11.267578 L 3.3183594 11.269531 A 1 1 0 0 0 3 12 A 1 1 0 0 0 4 13 L 5 13 L 5 24 C 5 25.105 5.895 26 7 26 L 23 26 C 24.105 26 25 25.105 25 24 L 25 13 L 26 13 A 1 1 0 0 0 27 12 A 1 1 0 0 0 26.681641 11.267578 L 26.666016 11.255859 A 1 1 0 0 0 26.597656 11.199219 L 25 9.8925781 L 25 6 C 25 5.448 24.552 5 24 5 L 23 5 C 22.448 5 22 5.448 22 6 L 22 7.4394531 L 15.677734 2.2675781 A 1 1 0 0 0 15 2 z M 18 15 L 22 15 L 22 23 L 18 23 L 18 15 z" />
              </svg>
            </div>

            <div className="col-md-5" style={{ marginTop: "3px" }}>
              <h6>
                <Link className="redirectLink" to="/restaurant/Home">
                  {" "}
                  Home
                </Link>
              </h6>
            </div>
          </div>

          <div className="row">
            <div className="col-md-2" style={{ marginLeft: "4px" }}>
              <img style={{ width: "15px", height: "15px" }} src={dishIcon} />
            </div>

            <div className="col-md-5" style={{ marginTop: "3px" }}>
              <h6>
                <Link className="redirectLink" to="/restaurant/adddish">
                  {" "}
                  Add Dish
                </Link>
              </h6>
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
              <h6>
                <Link className="redirectLink" to="/restaurant/orders">
                  Orders
                </Link>
              </h6>
            </div>
          </div>
          <div
            className="iconDiv"
            style={{ marginTop: "20px", fontSize: "16px", color: "#757575" }}
            onClick={this.removeSession}
          >
            Sign out
          </div>
          <hr></hr>
        </Drawer>
        {/* )} */}
      </>
    );
  };

  render() {
    let redirectToLogin = null;
    if (this.state.redirectToLogin) {
      redirectToLogin = <Redirect to="/" />;
    }
    return (
      <>
        {JSON.parse(sessionStorage.getItem("restaurantDetails")) === null
          ? ""
          : this.sidebar()}
        {redirectToLogin}
      </>
    );
  }
}

export default RestaurantSideBar;
