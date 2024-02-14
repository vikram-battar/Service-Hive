var express = require("express");
var router = express.Router();
const { nanoid } = require("nanoid");
const { handleError, verifyAuth } = require("../utils");
const {insertOrder} = require('../database/orders')
const {getAddressesByUsername ,insertAddress, deleteAddressById}= require('../database/address')
var { users } = require("../db");

router.get("/addresses", verifyAuth, async(req, res) => {
  console.log(`GET request received to "/user/addresses"`);
  let address = await getAddressesByUsername(req.user.username) 
  return res.status(200).json(address);
});

router.post("/addresses", verifyAuth, async(req, res) => {
  console.log(`POST request received to "/cart/addresses"`);
  if (req.body.address.length < 20) {
    return res.status(400).json({
      success: false,
      message: "Address should be greater than 20 characters",
    });
  }
  if (req.body.address.length > 128) {
    return res.status(400).json({
      success: false,
      message: "Address should be less than 128 characters",
    });
  }
  insertAddress(req.body.address, req.user.username)
  // req.user.addresses.push({
  //   _id: nanoid(),
  //   address: req.body.address,
  // });  
  let address = await getAddressesByUsername(req.user.username)
  return res.status(200).json(address);
});

router.delete("/addresses/:id", verifyAuth, async (req, res) => {
  console.log(`DELETE request received to "/cart/addresses"`);
  await deleteAddressById(req.params.id)
  let address = await getAddressesByUsername(req.user.username)
  return res.status(200).json(address); 
});

module.exports = router;
