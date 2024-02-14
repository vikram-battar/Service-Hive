import { Search, SentimentDissatisfied } from "@mui/icons-material";
import {
  CircularProgress,
  Grid,
  InputAdornment,
  TextField,
} from "@mui/material";
import { useLocation } from 'react-router-dom';
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { config } from "../../App";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import "./Products.css";
import ProductCard from "../ProductCard/ProductCard";
import Cart from "../Cart/Cart"

const Products = () => {
  const [loader, setLoader] = useState(false);
  const [productData, setProductData] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [success, setSuccess] = useState(false);
  const [delay, setDelay] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [cartLoad, setCartLoad] = useState(false);
  const token = localStorage.getItem("token");
  const location = useLocation();
  const data = location.state?.category;

  console.log("State ", data)
  const performAPICall = async () => {
    const url = `${config.endpoint}/products?category=`+data;
    setLoader(true);
    try {
      const response = await axios.get(url);
      const productData = response.data;

      setProductData(productData);
      // console.log(productData);
      setSuccess(true);
      setLoader(false);
      setCartLoad(true);

    } catch (e) {
      enqueueSnackbar(e.response.statusText, { variant: "error" });
      setLoader(false);
    }
  };
  useEffect(() => {
    performAPICall();
  }, []);
  
  const performSearch = async (text) => {
    const searchProduct = text.target.value;
    setLoader(true);
    try {
      const response = await axios.get(
        `${config.endpoint}/products/search?value=${searchProduct}`
      );
      setProductData(response.data);
      setLoader(false);
      setSuccess(true);
    } catch (e) {
      if (e.response.status === 404) {
        setSuccess(false);
      } else {
        enqueueSnackbar("Could not fetch results from backend", {
          variant: "error",
        });
      }
      setLoader(false);
    }
  };

  
  const debounceSearch = (event, debounceTimeout) => {
    if (delay !== 0) {
      clearTimeout(delay);
    }
    const timer = setTimeout(() => performSearch(event), debounceTimeout);
    setDelay(timer);
  };

  const fetchCart = async (token) => {
    if (!token) return;
    const url = `${config.endpoint}/cart`
    try {
      // TODO: CRIO_TASK_MODULE_CART - Pass Bearer token inside "Authorization" header to get data from "GET /cart" API and return the response data
      const response = await axios.get(url,
        {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        })
        const cartData = response.data;
        
      
        setCartItems(cartData)
        
    } catch (e) {
      if (e.response && e.response.status === 400) {
        enqueueSnackbar(e.response.data.message, { variant: "error" });
      } else {
        enqueueSnackbar(
          "Could not fetch cart details. Check that the backend is running, reachable and returns valid JSON.",
          {
            variant: "error",
          }
        );
      }
      return null;
    }
  };
  useEffect(async () => {
    fetchCart(token)
  }, [cartLoad])
  
  const isItemInCart = (items, productId) => { 
    if (items) {
      return items.findIndex((item) => item.productId === productId) !== -1
    }
  };

  const addToCart = async (
    token,
    items,
    products,
    productId,
    qty,
    category,
    options = { preventDuplicate: false }
  ) => {
    if (!token) {
      enqueueSnackbar('Login to add an item to the Cart', {
        variant: 'warning',
      })
      return
    }
    if (options.preventDuplicate && isItemInCart(items, productId)) {
      enqueueSnackbar(
        'Item already in cart. Use the cart sidebar to update quantity or remove item.',
        {
          variant: 'warning',
        },
      )
      return
    }
    try {
      const response = await axios.post(
        `${config.endpoint}/cart/add`,
        { productId, qty, category },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      const cartData = response.data;
      
      setCartItems(cartData)

    } catch (e) {
      if (e.response) {
        enqueueSnackbar(e.response.data.message, { variant: 'error' })
      } else {
        enqueueSnackbar(
          'Could not fetch products. Check that the backend is running, reachable and returns valid JSON.',
          {
            variant: 'error',
          },
        )
      }
    }
  }

  const handleQuantity = async (
    token,
    items,
    products,
    productId,
    qty,
    options = { preventDuplicate: false }
  ) => {
    if (!token) {
      enqueueSnackbar('Login to add an item to the Cart', {
        variant: 'warning',
      })
      return
    }
    if (options.preventDuplicate && isItemInCart(items, productId)) {
      enqueueSnackbar(
        'Item already in cart. Use the cart sidebar to update quantity or remove item.',
        {
          variant: 'warning',
        },
      )
      return
    }
    try {
      const response = await axios.post(
        `${config.endpoint}/cart`,
        { productId, qty },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      const cartData = response.data;
     
      setCartItems(cartData)

    } catch (e) {
      if (e.response) {
        enqueueSnackbar(e.response.data.message, { variant: 'error' })
      } else {
        enqueueSnackbar(
          'Could not fetch products. Check that the backend is running, reachable and returns valid JSON.',
          {
            variant: 'error',
          },
        )
      }
    }
  }
  return (
    <div>
      <Header>
        <Box>
          {/* <TextField
            className="search-desktop"
            size="small"
            type="text"
            sx={{ width: "20vw" }}
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Search color="primary" />
                </InputAdornment>
              ),
            }}
            placeholder="Search for items/categories"
            name="search"
            // value={searchKey}
            onChange={(e) => debounceSearch(e, 500)}
          ></TextField> */}
        </Box>
      </Header>

      <TextField
        className="search-mobile"
        size="small"
        type="text"
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Search color="primary" />
            </InputAdornment>
          ),
        }}
        placeholder="Search for items/categories"
        name="search"
        // value={searchKey}
        onChange={(e) => debounceSearch(e, 500)}
      />
      <Grid container mb={2}>
        <Grid item md={token ? 9 : 12}>
          <Grid item className="product-grid">
            <Box className="hero">
              <p className="hero-heading">
                World’s <span className="hero-highlight">FASTEST Services</span>{" "}
                at your door step
              </p>
            </Box>
          </Grid>
          {!loader ? (
            !success ? (
              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                className="loading"
              >
                <Box className="loading">
                  <SentimentDissatisfied color="action" />
                  <h4 style={{ color: "#636363" }}> No products found </h4>{" "}
                </Box>
              </Grid>
            ) : (
              <Box>
                <Grid container spacing={2}>
                  {productData.map((item) => (
                    <Grid item xs={6} md={3} key={item._id}>
                      <ProductCard product={item}  handleAddToCart={async () => {
                        await addToCart(
                          token,
                          cartItems,
                          productData,
                          item.id,
                          1,
                          item.category,
                          {
                            preventDuplicate: true,
                          },
                          
                        )
                      }}/>
                      
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )
          ) : (
            <Box className="loading">
              <CircularProgress />
              <p>Loading Data...</p>
            </Box>
          )}
        </Grid>
        {token && (
          <Grid
            item
            md={3}
            xs={12}
            style={{ backgroundColor: "#E9F5E1" }}
            mb={2}
          >
            <Cart
            hasCheckoutButton
            //products={productData}
            products={[]}
            items={cartItems}
            addToCart={addToCart}
            handleQuantity={handleQuantity}
            />
          </Grid>
        )}
      </Grid>

      <Footer />
    </div>
  );
};

export default Products;
