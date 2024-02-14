import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { config } from "../../App";
import {  useNavigate } from "react-router-dom";
import "./Register.css";
import { Link } from "react-router-dom";

const Register = () => {
  const navigate=useNavigate()
  const { enqueueSnackbar } = useSnackbar();
  const [ loader, setLoader ] = useState(false);
  const [username, setUsername] = useState("");
  const [formdata, setFormData] = useState({
    name:"",
    username: "",
    email:"",
    phone:"",
    password: "",
    confirmPassword: ""
  });
 

  const updateVal=(e)=>{
    console.log(e.target.name)
    const name  = e.target.name;
    const value = e.target.value;

    setFormData({
      ...formdata,
      [name] : value
    })
  }
  
  
  

 
   const register = async (formdata) => {
      setLoader(true)
      // const url = config.endpoint + "/auth/register";
      // const regURL = `${config.endpoint}/auth/register`;
      const url = "http://localhost:3007/signUp"
      const regURL = "http://localhost:3007/signup"
      try{
      //  if(validateInput(formdata))
      if(true)
        {
          await axios.post(url,
            {
              name:formdata.name,
              phone:formdata.phone,
              username: formdata.username,
              password: formdata.password,
              email: formdata.email
            }
          );
          setLoader(false)
          navigate('/login')
          enqueueSnackbar("Registered successfully", { variant: "success" })
         
        }
      }
      catch(err){
        setLoader(false);
        if (err.response.request) {
          enqueueSnackbar(err.response.data.message, { variant: "error" });
        } else {
          enqueueSnackbar(
            "Something went wrong. Check that the backend is running",
            { variant: "error" }
          );
        }
      }
      finally{
        setLoader(false)
      }
        
    } 
  

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
      
      <Box className="content">
        <Stack spacing={2} className="form">
          <h2 className="title">Register</h2>
          <TextField
            id="name"
            label="Name"
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
            id="email"
            label="Email"
            variant="outlined"
            title="Email"
            name="email"
            placeholder="Enter Email"
            value={formdata.email}
            onChange={(e) => updateVal(e)}
            fullWidth
          />
          <TextField
            id="phone"
            label="Contact No"
            variant="outlined"
            title="Contact No"
            name="phone"
            placeholder="Enter Contact No"
            value={formdata.phone}
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
            <Link className="link" to="/login">
              Login here
            </Link>
          </p>
        </Stack>
      </Box>
      
    </Box>
  );
};

export default Register;
