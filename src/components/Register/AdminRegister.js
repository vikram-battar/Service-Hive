import { Button, CircularProgress, Stack, TextField} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { config } from "../../App";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import "./Register.css";
import { useHistory, Link } from "react-router-dom";

const Register = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [loader, setLoader] = useState(false);
  
  const [formdata, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const updateVal = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData({
      ...formdata,
      [name]: value,
    });
  };

  const history = useHistory();

  const register = async (formdata) => {
    setLoader(true);
    const url = config.endpoint + "/adminRegistration";
    try {
      if (validateInput(formdata)) {
        await axios.post(url, {
          name: formdata.name,
          phone: formdata.phone,
          username: formdata.username,
          password: formdata.password,
          email: formdata.email,
          category: formdata.category,
        });
        setLoader(false);
        enqueueSnackbar("Registered successfully", { variant: "success" });
        history.push("/adminLogin", { from: "Register" });
      }
    } catch (err) {
      setLoader(false);
      // if (err.response.request) {
      //   enqueueSnackbar(err.response.data.message, { variant: "error" });
      // } else {
        enqueueSnackbar(
          "Something went wrong. Check that the backend is running",
          { variant: "error" }
        );
      // }
    } finally {
      setLoader(false);
    }
  };

  const validateInput = (data) => {
    if (data.username === "") {
      enqueueSnackbar("Username is a required field", { variant: "warning" });
      return false;
    } else if (data.username.length < 6) {
      enqueueSnackbar("Username must be at least 6 characters", {
        variant: "warning",
      });
      return false;
    } else if (data.password === "") {
      enqueueSnackbar("Password is a required field", { variant: "warning" });
      return false;
    } else if (data.password.length < 6) {
      enqueueSnackbar("Password must be at least 6 characters", {
        variant: "warning",
      });
      return false;
    } else if (data.confirmPassword !== data.password) {
      enqueueSnackbar("Passwords do not match", { variant: "warning" });
      return false;
    } else {
      return true;
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minHeight="100vh"
    >
      <Header hasHiddenAuthButtons />
      <Box className="content">
        <Stack spacing={2} className="form">
          <h2 className="title">Register as Admin</h2>
          <TextField
            id="name"
            label="name"
            variant="outlined"
            title="Name"
            name="name"
            placeholder="Enter Name"
            value={formdata.name}
            onChange={(e) => updateVal(e)}
            fullWidth
          />
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            title="Username"
            name="username"
            placeholder="Enter Username"
            value={formdata.username}
            onChange={(e) => updateVal(e)}
            fullWidth
          />
         
          <TextField
            id="password"
            variant="outlined"
            label="Password"
            name="password"
            type="password"
            helperText="Password must be atleast 6 characters length"
            fullWidth
            placeholder="Enter a password with minimum 6 characters"
            value={formdata.password}
            onChange={(e) => updateVal(e)}
          />
          <TextField
            id="confirmPassword"
            variant="outlined"
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={formdata.confirmPassword}
            onChange={(e) => updateVal(e)}
            fullWidth
          />
          {!loader ? (
            <Button
              className="button"
              variant="contained"
              onClick={() => register(formdata)}
            >
              Register Now
            </Button>
          ) : (
            <Box display="flex" justifyContent="center">
              <CircularProgress />
            </Box>
          )}
          <p className="secondary-action">
            Already have an account?{" "}
            <Link className="link" to="/adminLogin">
              Login here
            </Link>
          </p>
        </Stack>
      </Box>
      <Footer />
    </Box>
  );
};

export default Register;
