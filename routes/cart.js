var express = require("express");
var router = express.Router();
const { handleError, verifyAuth, getProduct } = require("../utils");
var { users, products } = require("../db");
const {insertOrder} = require('../database/orders')
const {getAddressesById} = require('../database/address')
const { addToCart, getCartByUsername , updateCartProductQuantity, deleteCartItem, deleteCartByUser} = require("../database/cart");
const { nanoid } = require("nanoid");

// Cart Controller
router.get("/", verifyAuth, async (req, res) => {
  console.log(`GET request to "/cart" received`);
  try {
    let x = await getCartByUsername(req.user.username);
    return res.status(200).json(x);
  } catch (error) {
    handleError(res, error);
  }
});

router.post("/", verifyAuth, async (req, res) => {
  console.log(`POST request to "/cart" received`, req.body);
  try {
    if (req.body.qty === 0) {
      await deleteCartItem(req.body.productId);
    } else if (req.body.qty > 3) {
      return res.status(400).json({ success: false, message: "Max 3 items allowed" });
    } else {
      await updateCartProductQuantity(req.body.productId, req.body.qty);
    }
    let x = await getCartByUsername(req.user.username);
    return res.status(200).json(x);
  } catch (error) {
    handleError(res, error);
  }
});

router.post("/add", verifyAuth, async (req, res) => {
  console.log(
    `POST request received to "/cart/add": ${req.user.username}, `,
    req.body
  );
  try {
    let x = await getCartByUsername(req.user.username);
    let found = x.find((x1) => {
      return req.body.productId === x1.product_id;
    });

    if (found) {
      return res.status(400).json({ success: false, message: "Item already in cart" });
    }
    console.log(req.body)
    await addToCart(req.user.username, req.body.productId, req.body.qty, req.body.category);
    x = await getCartByUsername(req.user.username);
    return res.status(200).json(x);
  } catch (error) {
    handleError(res, error);
  }
});

router.post("/checkout", verifyAuth, async (req, res) => {
  console.log(`POST request received to "/cart/checkout": ${req.user.username}`);
  try {
    let total = 0;
    req.user.cart = await getCartByUsername(req.user.username);
    for (let element of req.user.cart) {
      total = total + element.quantity * element.price;
    }

    let cart = req.user.cart;

    if (total === 0) {
      return res.status(400).json({ success: false, message: "Cart is empty" });
    }

    if (!req.body.addressId) {
      return res.status(400).json({
        success: false,
        message: "Address not set",
      });
    }

    let id = nanoid();
    let address = await getAddressesById(req.body.addressId);
    address = address[0].address;

    await deleteCartByUser(req.user.username);
    cart.map((cart1) => {
      insertOrder(id, req.user.username, cart1.product_name, cart1.price, cart1.quantity, address, cart1.label, cart1.category);
    });

    req.user.balance -= total;
    console.log("Mock order placed");
    console.log("Total cost", total);
    console.log("Address", address);

    users.update({ _id: req.user._id }, req.user, {}, (err) => {
      if (err) {
        handleError(res, err);
      }
      return res.status(200).json({ success: true });
    });
  } catch (error) {
    handleError(res, error);
  }
});

module.exports = router;
