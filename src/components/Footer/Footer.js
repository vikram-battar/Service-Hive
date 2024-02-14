import { Box } from "@mui/system";
import React from "react";
import "./Footer.css";
import logo from "./logo_dark.png"

const Footer = () => {
  return (
    <Box className="footer">
      <Box>
        <img src={logo} alt="Logo-icon"></img>
      </Box>
      <p className="footer-text">
        Service Hive is your one stop solution to the get all your services
        with Fastest Delivery to your doorstep
      </p>
    </Box>
  );
};

export default Footer;
