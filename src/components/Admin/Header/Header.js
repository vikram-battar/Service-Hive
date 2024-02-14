import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Avatar, Button, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import Image from "material-ui-image";
import { useHistory, Link } from "react-router-dom";
import "./Header.css";
import logo from "./logo_light.png";
const Header = ({ children, hasHiddenAuthButtons }) => {
  const history = useHistory();

  const routeToExplore = () => {
    history.push("/");
  };
  const routeToAllOrders = () => {
    history.push("/allOrders");
  };
  const routeToAnalytics = () => {
    history.push("/adminView");
  };

  const routeToRegister = () => {
    history.push("/register");
  };

  const routeToLogin = () => {
    history.push("/login");
  };
  const routeToAllProducts = () => {
    history.push("/allProducts");
  };
  const routeToServiceProviderRegister = () => {
    history.push("/serviceProviderRegistration");
  };

  const routeToServiceProviderLogin = () => {
    history.push("/serviceProviderLogin");
  };
  const logout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    localStorage.removeItem("balance");
    localStorage.removeItem("category");
    history.push("/");
    //tryig to reload forcefully
    window.location.reload();
  };

  const navigateToOrders = () => {
    history.push("/orders");
  };
  const navigateToProducts = () => {
    history.push("/landing");
  };
  const navigateToProductsAdmin = () => {
    history.push("/productAdmin");
  };
  const navigateToOrdersAdmin = () => {
    history.push("/ordersAdmin");
  };
  if (hasHiddenAuthButtons) {
    return (
      <Box className="header">
        <Box className="header-title">
          <Link to="/">
            <img src={logo} alt="Lotus-icon" style={{ height: "20px" }}></img>
          </Link>
        </Box>

        {children}

        <Button
          className="explore-button"
          startIcon={<ArrowBackIcon />}
          variant="text"
          onClick={routeToExplore}
        >
          Back to explore
        </Button>
      </Box>
    );
  }

  return (
    <Box className="header">
      <Box className="header-title">
        <Link to="/">
          <img src={logo} alt="Lotus-icon" style={{ height: "50px" }}></img>
        </Link>
      </Box>
      {children}
      <Stack direction="row" spacing={1} alignItems="center">
        {localStorage.getItem("username") ? (
          <>
            <Avatar
              src="avatar.png"
              alt={localStorage.getItem("username") || "profile"}
            />

            <p className="username-text">{localStorage.getItem("username")}</p>

            {window.location.pathname === "/adminView" ? (
              <Button type="primary" onClick={routeToAllOrders}>
                All Orders
              </Button>
            ) : (
              <Button type="primary" onClick={routeToAnalytics}>
              Analytics
            </Button>
            )}
            {/* <Button type="primary" onClick={routeToAllProducts}>
              All Products
            </Button> */}
            <Button type="primary" onClick={logout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button onClick={routeToLogin}>Login</Button>

            <Button variant="contained" onClick={routeToRegister}>
              Register
            </Button>
            <Button onClick={routeToServiceProviderLogin}>
              Login as Admin
            </Button>

            <Button
              variant="contained"
              onClick={routeToServiceProviderRegister}
            >
              Register as Admin
            </Button>
          </>
        )}
      </Stack>
    </Box>
  );
};

export default Header;
