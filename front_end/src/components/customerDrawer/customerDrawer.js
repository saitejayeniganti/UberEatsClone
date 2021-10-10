import React, { Component } from "react";
import { Redirect } from "react-router";
import { Drawer } from "antd";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import axios from "axios";
import ubereatslogo from "../../Images/ubereatsLo.svg";
import "./customerDrawer.css";
import icon from "../../Images/icon.jpeg";
import { connect } from "react-redux";
import { addCartFromDB } from "../../redux/actions/index";
import Modal from "@mui/material/Modal";
import { Link } from "react-router-dom";

class CustomerSideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      name: "",
      openModel: false,
      redirectToCheckout: false,
      redirectToLogin: false,
    };
  }

  componentDidMount() {
    if (JSON.parse(sessionStorage.getItem("customerDetails")) === null) {
    } else {
      axios
        .get(
          process.env.REACT_APP_UBEREATS_BACKEND_URL +
            "/customer/cart?id=" +
            JSON.parse(sessionStorage.getItem("customerDetails")).id
        )
        .then((response) => {
          // console.log(response.data);
          this.props.addCartFromDB(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  handleOpen = () => {
    this.setState({ openModel: true });
  };
  handleClose = () => this.setState({ openModel: false });

  renderModel = () => {
    return (
      <>
        <Modal open={this.state.openModel} onClose={this.handleClose}>
          <Box
            sx={{
              position: "absolute",
              top: "30%",
              left: "85%",
              transform: "translate(-50%, -50%)",
              bgcolor: "white",
              width: "400px",
              boxShadow: "24",
              borderRadius: "10px",
            }}
          >
            {this.props.cart == undefined ? (
              ""
            ) : (
              <>
                <div
                  style={{
                    textAlign: "center",

                    padding: "15px",
                  }}
                >
                  <div className="col-md-6" style={{ textAlign: "left" }}>
                    <svg
                      width="24px"
                      height="24px"
                      fill="none"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      focusable="false"
                      cursor="pointer"
                      onClick={this.handleClose}
                    >
                      <path
                        d="m19.5831 6.24931-1.8333-1.83329-5.75 5.83328-5.75-5.83328-1.8333 1.83329 5.8333 5.74999-5.8333 5.75 1.8333 1.8333 5.75-5.8333 5.75 5.8333 1.8333-1.8333-5.8333-5.75z"
                        fill="#000000"
                      ></path>
                    </svg>
                  </div>
                  <div
                    className="row"
                    style={{ margin: "5px", fontWeight: 500, fontSize: "30px" }}
                  >
                    {this.props.cart[0] == undefined
                      ? ""
                      : this.props.cart[0].restaurantName}
                  </div>
                  <hr
                    style={{ backgroundColor: "#9a9999", height: "1px" }}
                  ></hr>
                  <div className="row">
                    {" "}
                    {this.props.cart.map((item) => {
                      return (
                        <>
                          <div
                            style={{
                              display: "flex",
                              textAlign: "left",
                              marginBottom: "20px",
                              fontSize: "20px",
                              fontWeight: "500",
                              marginLeft: "10px",
                            }}
                          >
                            <div className="col-md-8">{item.dishName}</div>
                            <div className="col-md-4">{item.quantity}</div>
                          </div>
                        </>
                      );
                    })}
                  </div>
                  <hr
                    style={{ backgroundColor: "#9a9999", height: "1px" }}
                  ></hr>
                  <div>
                    {" "}
                    <button
                      className="checkoutButton"
                      onClick={() => {
                        this.setState({
                          openModel: false,
                          redirectToCheckout: true,
                        });
                      }}
                    >
                      Checkout
                    </button>
                  </div>
                </div>
              </>
            )}
          </Box>
        </Modal>
      </>
    );
  };

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

  removeSession = () => {
    sessionStorage.removeItem("customerDetails");
    this.setState({ redirectToLogin: true });
  };

  iconInDrawer = () => {
    return (
      <>
        <div>
          {/* <h1>this is aheader</h1> */}
          <img src={icon} />
        </div>
      </>
    );
  };

  sidebar = () => {
    return (
      <>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar
            position="static"
            sx={{
              minHeight: "88px",
              background: "white",
            }}
          >
            <div style={{ display: "flex" }}>
              <div className="col-md-5">
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
              </div>

              <div
                className="col-md-7"
                style={{
                  display: "flex",
                  justifyContent: "right",
                }}
              >
                <div
                  className="cartspace"
                  style={{ width: "120px", marginRight: "30px" }}
                  onClick={this.handleOpen}
                >
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    viewBox="0 0 16 16"
                    className="cartIcon"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M3.666 11.333h10.333l1.334-8h-11l-.267-2h-3.4v2h1.667l1.333 8zm1.333 3.334A1.333 1.333 0 105 12a1.333 1.333 0 000 2.667zm9.334-1.334a1.333 1.333 0 11-2.667 0 1.333 1.333 0 012.667 0z"
                    ></path>
                  </svg>
                  <label style={{}}>
                    &nbsp;&nbsp;&nbsp;Cart&nbsp;•&nbsp;&nbsp;
                    {this.props.cart == undefined ? "" : this.props.cart.length}
                  </label>
                </div>
              </div>
            </div>
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
                  <div className="row txtSmall">User</div>
                  <div className="row greentxt" style={{ cursor: "pointer" }}>
                    <Link className="greentxt" to="/customer/details">
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
            <div className="col-md-2" style={{ marginLeft: "3px" }}>
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
                <Link className="redirectLink" to="/customer/Home">
                  {" "}
                  Home
                </Link>
              </h6>
            </div>
          </div>

          <div className="row">
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
              style={{ marginTop: "3px", marginLeft: "3px", cursor: "pointer" }}
            >
              <h6>
                {" "}
                <Link className="redirectLink" to="/customer/orders">
                  {" "}
                  Orders
                </Link>
              </h6>
            </div>
          </div>
          {/* ******end of orders******* */}
          <div className="row" style={{ marginTop: "15px" }}>
            <div className="col-md-2">
              <svg
                aria-hidden="true"
                focusable="false"
                viewBox="0 0 24 24"
                class="drawer_icon"
              >
                <path d="M17 3c-2.2 0-3.8 1.2-5 2.5C10.8 4.3 9.2 3 7 3 3.5 3 1 5.9 1 9.5c0 1.8.7 3.4 2 4.5l9 8.5 9-8.5c1.2-1.2 2-2.7 2-4.5C23 5.9 20.5 3 17 3z"></path>
              </svg>
            </div>

            <div
              className="col-md-5"
              style={{ marginTop: "3px", marginLeft: "3px", cursor: "pointer" }}
            >
              <h6>
                <Link className="redirectLink" to="/customer/favorites">
                  {" "}
                  Favorites
                </Link>
              </h6>
            </div>
          </div>

          {/* ******end of favorites******* */}
          <div className="row" style={{ marginTop: "15px" }}>
            <div className="col-md-2">
              <svg
                aria-hidden="true"
                focusable="false"
                viewBox="0 0 24 24"
                class="drawer_icon"
              >
                <path d="M14.12 14H9.88l-3-3H1v9h22v-9h-5.88l-3 3z"></path>,
                <path d="M1 4v4h7.12l3 3h1.76l3-3H23V4H1z"></path>
              </svg>
            </div>

            <div
              className="col-md-5"
              style={{ marginTop: "3px", marginLeft: "3px" }}
            >
              <h6>Wallet</h6>
            </div>
          </div>
          {/* ******end of Wallet******* */}
          <div className="row" style={{ marginTop: "15px" }}>
            <div className="col-md-2">
              <svg
                aria-hidden="true"
                focusable="false"
                viewBox="0 0 24 24"
                class="drawer_icon"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12 7.833c-.667 0-1.334.166-1.917.5L6.5 4.749C8 3.583 9.917 2.916 12 2.916s4 .667 5.5 1.833l-3.583 3.584a3.871 3.871 0 00-1.917-.5zm3.666 6.083c.334-.583.5-1.25.5-1.917 0-.666-.166-1.333-.5-1.916l3.584-3.584c1.166 1.5 1.833 3.417 1.833 5.5 0 2.084-.666 4-1.833 5.5l-3.584-3.583zm-1.75 1.75c-.583.333-1.25.5-1.916.5a3.872 3.872 0 01-1.917-.5L6.5 19.25c1.5 1.167 3.417 1.834 5.5 1.834s4-.667 5.5-1.834l-3.583-3.583zM2.834 12c0-2.083.667-4 1.834-5.5l3.583 3.584c-.333.583-.5 1.25-.5 1.916 0 .667.167 1.334.5 1.917L4.667 17.5C3.5 16 2.833 14.083 2.833 12z"
                ></path>
              </svg>
            </div>

            <div
              className="col-md-5"
              style={{ marginTop: "3px", marginLeft: "3px" }}
            >
              <h6>Help</h6>
            </div>
          </div>
          {/* ******end of Help******* */}
          <div className="row" style={{ marginTop: "15px" }}>
            <div className="col-md-2">
              <svg
                aria-hidden="true"
                focusable="false"
                viewBox="0 0 24 24"
                class="drawer_icon"
              >
                <path d="M11.333 22l10-10V3.667H13l-10 10L11.333 22z"></path>
              </svg>
            </div>

            <div
              className="col-md-5"
              style={{ marginTop: "3px", marginLeft: "3px" }}
            >
              <h6>Promotions</h6>
            </div>
          </div>
          {/* ******end of Promotions******* */}
          <div className="row" style={{ marginTop: "15px" }}>
            <div className="col-md-2">
              <svg
                aria-hidden="true"
                focusable="false"
                viewBox="0 0 24 24"
                class="greenTag"
              >
                <path d="M2.834 18.666h18.333V14.5c-1.416 0-2.5-1.084-2.5-2.5 0-1.417 1.167-2.5 2.5-2.5V5.333H2.834V9.5c1.417 0 2.5 1.083 2.5 2.5 0 1.333-1.167 2.5-2.5 2.5v4.166z"></path>
              </svg>
            </div>

            <div
              className="col-md-9"
              style={{ marginTop: "3px", marginLeft: "3px" }}
            >
              <h6>Eats Pass</h6>
            </div>
          </div>
          {/* ******end of Eats Pass******* */}
          <div className="row" style={{ marginTop: "15px" }}>
            <div className="col-md-2">
              <svg
                aria-hidden="true"
                focusable="false"
                viewBox="0 0 20 20"
                class="drawer_icon"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M6.875 0c.7 0 1.342.267 1.825.708L10 1.892 11.3.708A2.698 2.698 0 0113.125 0a2.714 2.714 0 012.709 2.708 2.74 2.74 0 01-.425 1.459h2.925V10H11.25V4.167h-2.5V10H1.667V4.167h2.925a2.74 2.74 0 01-.425-1.459A2.714 2.714 0 016.875 0zM8.75 12.5H1.667v5.833H8.75V12.5zm2.5 5.833h7.084V12.5H11.25v5.833z"
                ></path>
              </svg>
            </div>

            <div
              className="col-md-8"
              style={{ marginTop: "3px", marginLeft: "3px" }}
            >
              <h6>Invite friends</h6>
            </div>
          </div>
          {/* ******end of invite******* */}
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
    let redir = null;
    if (this.state.redirectToCheckout) {
      redir = <Redirect to="/customer/checkout" />;
    }
    let redirectToLogin = null;
    if (this.state.redirectToLogin) {
      redirectToLogin = <Redirect to="/" />;
    }
    return (
      <>
        {this.renderModel()}
        {JSON.parse(sessionStorage.getItem("customerDetails")) === null
          ? ""
          : this.sidebar()}
        {redir}
        {redirectToLogin}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
  };
};

function mapDispatchToprops(dispatch) {
  return {
    addCartFromDB: (cart) => dispatch(addCartFromDB(cart)),
  };
}

export default connect(mapStateToProps, mapDispatchToprops)(CustomerSideBar);
