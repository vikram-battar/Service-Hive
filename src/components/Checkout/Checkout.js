import { CreditCard, Delete } from "@mui/icons-material";
import {
  Button,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";

import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { config } from "../../App";
import Cart, { getTotalCartValue, generateCartItemsFrom } from "../Cart/Cart";
import "./Checkout.css";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";



const AddNewAddressView = ({
  token,
  newAddress,
  handleNewAddress,
  addAddress,
}) => {

  return (
    <Box display="flex" flexDirection="column">
      <TextField
        multiline
        minRows={4}
        placeholder="Enter your complete address"
        onChange={(e) =>
          handleNewAddress((newAddress) => ({
            ...newAddress,
            value: `${e.target.value}`,
          }))
        }
      />
      <Stack direction="row" my="1rem">
        <Button
          variant="contained"
          onClick={() => {
            addAddress(token, newAddress);
          }}
        >
          Add
        </Button>
        <Button
          variant="text"
          onClick={() =>
            handleNewAddress((currAddr) => ({
              ...currAddr,
              isAddingNewAddress: false,
            }))
          }
        >
          Cancel
        </Button>
      </Stack>
    </Box>
  );
};

const Checkout = () => {
  const token = localStorage.getItem("token");
  const [balance, setBalance] = useState(localStorage.getItem("balance"));
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const [items, setItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [addresses, setAddresses] = useState({ all: [], selected: "" });
  const [newAddress, setNewAddress] = useState({
    isAddingNewAddress: false,
    value: "",
  });

  useEffect(() => {
    const onLoad = async () => {
      await getAddresses(token);
    };
    onLoad();
  }, []);

  if (!token) {
    enqueueSnackbar("You must be logged in to access checkout page", {
      variant: "info",
    });
    history.push("/login");
  }

  const getProducts = async () => {
    try {
      const response = await axios.get(`${config.endpoint}/products`);

      setProducts(response.data);
      return response.data;
    } catch (e) {
      if (e.response && e.response.status === 500) {
        enqueueSnackbar(e.response.data.message, { variant: "error" });
        return null;
      } else {
        enqueueSnackbar(
          "Could not fetch products. Check that the backend is running, reachable and returns valid JSON.",
          {
            variant: "error",
          }
        );
      }
    }
  };

  const fetchCart = async (token) => {
    if (!token) return;
    try {
      const response = await axios.get(`${config.endpoint}/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch {
      enqueueSnackbar(
        "Could not fetch cart details. Check that the backend is running, reachable and returns valid JSON.",
        {
          variant: "error",
        }
      );
      return null;
    }
  };

 
 
  const getAddresses = async (token) => {
    if (!token) return;

    try {
      const response = await axios.get(`${config.endpoint}/user/addresses`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAddresses({ ...addresses, all: response.data });
      return response.data;
    } catch {
      enqueueSnackbar(
        "Could not fetch addresses. Check that the backend is running, reachable and returns valid JSON.",
        {
          variant: "error",
        }
      );
      return null;
    }
  };

  
  const addAddress = async (token, newAddress) => {
    try {
      await axios
        .post(
          `${config.endpoint}/user/addresses`,
          { address: newAddress.value },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          setAddresses({ ...addresses, all: response.data });
          setNewAddress((currNewAddress) => ({
            ...currNewAddress,
            isAddingNewAddress: false,
            value: "",
          }));
          enqueueSnackbar("New Address added Successfully", {
            variant: "success",
          });
        });
    } catch (e) {
      if (e.response) {
        enqueueSnackbar(e.response.data.message, { variant: "error" });
      } else {
        enqueueSnackbar(
          "Could not add this address. Check that the backend is running, reachable and returns valid JSON.",
          {
            variant: "error",
          }
        );
      }
    }
  };

 
  const deleteAddress = async (token, addressId) => {
    try {
      await axios
        .delete(`${config.endpoint}/user/addresses/${addressId}`, {
          headers: {
            Accept: "application/json, text/plain, /",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          enqueueSnackbar("Deleted", { variant: "success" });
          setAddresses({ ...addresses, all: response.data });
        });
    } catch (e) {
      if (e.response) {
        enqueueSnackbar(e.response.data.message, { variant: "error" });
      } else {
        enqueueSnackbar(
          "Could not delete this address. Check that the backend is running, reachable and returns valid JSON.",
          {
            variant: "error",
          }
        );
      }
    }
  };

 
  const validateRequest = (items, addresses) => {
    const balance = window.localStorage.getItem("balance");
    const bal = getTotalCartValue(items);
   
    
    if (addresses.all.length === 0) {
      enqueueSnackbar("Please add a new address before proceeding.", {
        variant: "warning",
      });
      return false;
    }
    if (!addresses.selected) {
      enqueueSnackbar("Please select one shipping address to proceed.", {
        variant: "warning",
      });
      return false;
    }
    return true;
  };

  
  const performCheckout = async (token, items, addresses) => {
    const flag = validateRequest(items, addresses);
    if (flag) {
      try {
        await axios
          .post(
            `${config.endpoint}/cart/checkout`,
            { addressId: addresses.selected },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          )
          .then((res) => {
            enqueueSnackbar("checkout Successfull", { variant: "success" });
            history.push("/thanks");
            return true;
          });
      } catch (e) {}
    }
    return false;
  };

  useEffect(() => {
    const onLoadHandler = async () => {
      //const productsData = await getProducts();
      const productsData= true;
      const cartData = await fetchCart(token);

      if (productsData && cartData) {
        //Fconst cartDetails = await generateCartItemsFrom(cartData, productsData);
        setItems(cartData);
      }
    };
    onLoadHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header />
      <Grid container>
        <Grid item xs={12} md={9}>
          <Box className="shipping-container" minHeight="100vh">
            <Typography color="#3C3C3C" variant="h4" my="1rem">
              Shipping
            </Typography>
            <Typography color="#3C3C3C" my="1rem">
              Manage all the shipping addresses you want. This way you won't
              have to enter the shipping address manually with every order.
              Select the address you want to get your order delivered.
            </Typography>
            <Divider />
            <Box>

              {addresses.all.length === 0 && (
                <Typography my="1rem">
                  No addresses found for this account. Please add one to proceed
                </Typography>
              )}
              {addresses.all.length > 0 &&
                addresses.all.map((address) => {
                  // console.log("addr", address);

                  return (
                    <Box key={address.id} my="1rem">
                      <Typography
                        variant="body2"
                        className={
                          addresses.selected === address.id
                            ? "selected address-item"
                            : "not-selected address-item"
                        }
                        onClick={() => {
                          setAddresses({ ...addresses, selected: address.id });
                        }}
                        gutterBottom
                      >
                        {address.address}
                        <Button
                          variant="text"
                          size="small"
                          startIcon={<Delete />}
                          onClick={() => {
                            deleteAddress(token, address.id);
                          }}
                        >
                          Delete
                        </Button>
                      </Typography>
                    </Box>
                  );
                })}
            </Box>

            {newAddress.isAddingNewAddress === false && (
              <Button
                color="primary"
                variant="contained"
                id="add-new-btn"
                size="large"
                onClick={() => {
                  setNewAddress((currNewAddress) => ({
                    ...currNewAddress,
                    isAddingNewAddress: true,
                  }));
                }}
              >
                Add new address
              </Button>
            )}

            {newAddress.isAddingNewAddress === true && (
              <AddNewAddressView
                token={token}
                newAddress={newAddress}
                handleNewAddress={setNewAddress}
                addAddress={addAddress}
              />
            )}

            <Typography color="#3C3C3C" variant="h4" my="1rem">
              Payment
            </Typography>
            <Typography color="#3C3C3C" my="1rem">
              Payment Method
            </Typography>
            <Divider />

            <Box my="1rem">
              <Typography>Card</Typography>
              <Typography>
               <input placeholder="Enter Card Details"/>
              </Typography>
            </Box>

            <Button
              startIcon={<CreditCard />}
              variant="contained"
              onClick={async () => {
                await performCheckout(token, items, addresses);
              }}
            >
              PLACE ORDER
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} md={3} bgcolor="#E9F5E1">
          <Cart isReadOnly products={products} items={items} />
        </Grid>
      </Grid>
      <Footer />
    </>
  );
};

export default Checkout;