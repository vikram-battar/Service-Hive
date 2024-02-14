import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
//import { config } from "../../App";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { useDispatch } from "react-redux";
import { setLogin } from "../../Controllers/login";
import { logInUser } from "../../Reducers/loggedInUserReducer";
import "./Login.css";

const Login = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [loader, setLoader] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const updateVal = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const login = async (event) => {
    event.preventDefault();

    const data = { username: formData.username, password: formData.password };
    let x = validateInput(data);
    if (x) {
      const res = await setLogin(data);
      if (res.err) {
        enqueueSnackbar(
          "Something went wrong. Check that the backend is running, reachable and returns valid JSON.",
          { variant: "error" }
        );
      } else {
        window.localStorage.setItem("loggedInUser", JSON.stringify(res));
        console.log(res.user[0].userType);

        dispatch(logInUser(res));
        if (res.user[0].userType === "user") {
          navigate("/userView");
        } else {
          navigate("/adminView");
        }
        enqueueSnackbar("Logged in successfully", { variant: "success" });
      }
    }
  };
  //const history = useHistory();

  const validateInput = (data) => {
    if (data.username === "") {
      enqueueSnackbar("Username is a required field", { variant: "warning" });
      return false;
    } else if (data.password === "") {
      enqueueSnackbar("Password is a required field", { variant: "warning" });
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
      {/* <Header hasHiddenAuthButtons /> */}
      <Box className="content">
        <Stack spacing={2} className="form">
          <h2 className="title">Login</h2>
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            title="Username"
            name="username"
            placeholder="Enter Username"
            value={formData.username}
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
            value={formData.password}
            onChange={(e) => updateVal(e)}
          />
          {!loader ? (
            <Button
              className="button"
              variant="contained"
              onClick={login}
            >
              LOGIN TO Woody's
            </Button>
          ) : (
            <Box display="flex" justifyContent="center">
              <CircularProgress />
            </Box>
          )}
          <p className="secondary-action">
            Don’t have an account?{" "}
            <Link className="link" to="/register">
              Register now
            </Link>
          </p>
        </Stack>
      </Box>
      {/* <Footer /> */}
    </Box>
  );
};

export default Login;
