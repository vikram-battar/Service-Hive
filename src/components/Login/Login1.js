import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { config } from "../../App";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import "./Login.css";

const Login = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [loader, setLoader] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  
  const updateVal = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const history = useHistory();
  
 
  const login = async (formData) => {
    if (validateInput(formData)) {
      setLoader(true);
      const url = `${config.endpoint}/login`;
      try {
        const response = await axios.post(url, {
          username: formData.username,
          password: formData.password,
        });
        setLoader(false);
        const {token}=response.data;
        const {userType, username} = response.data.user[0]
        
        if (response.status === 201)
          enqueueSnackbar("Logged in successfully", { variant: "success" });

        persistLogin(token, username, userType)
        //history.push('/', {from : "Login"});
       
          history.push('/landing', {from : "Login"});
        // }
        // else
        // {
        //   history.push('/ordersAdmin', {from : "Login"});
        // }
          
      } catch (err) {
        setLoader(false);
        console.log(err)
        
        // if (err.response.status == 400)
          enqueueSnackbar("Email or Password is incorrect", { variant: "error" });
        // else
        //   enqueueSnackbar(
        //     "Something went wrong. Check that the backend is running, reachable and returns valid JSON.",
        //     { variant: "error" }
        //   );
      }
    }
  };

  
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

  
  const persistLogin = (token, username, userType) => {
    localStorage.setItem("token",token)
    localStorage.setItem("username",username)
    localStorage.setItem("userType",userType)
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
              onClick={() => login(formData)}
            >
              LOGIN TO ServiceHive
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
      <Footer />
    </Box>
  );
};

export default Login;
