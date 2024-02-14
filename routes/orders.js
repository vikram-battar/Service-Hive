var express = require("express");
var router = express.Router();
const { handleError, getProduct } = require("../utils");
var { products } = require("../db");

const {getOrdersByUsername, getAllOrders, updateOrderStatus, getOrdersByCategory} = require('../database/orders')
router.get("/", async(req, res) => {
  console.log("Request received for retrieving order list");
  const username= req.query.username
  const category = req.query.category
  
  try{
    let docs
    if(username!==undefined && category == undefined)
    {
      
       docs=  await getOrdersByUsername(username)
       
    }
    else
    {
      console.log("gettingusers bu id", category)
      docs = await getOrdersByCategory(category) 
      // docs=  await getAllOrders()
    }
    
    return res.status(200).json(docs);
  } 
  catch(err)
  {
    return res.status(400).send(err.message)
  }
    
  
});

router.get("/allOrders", async(req, res) => {
  console.log("Request received for retrieving order list");
  
  
  try{
   
      console.log("getting all orders")
      docs = await getAllOrders() 
      // docs=  await getAllOrders()
   
    
    return res.status(200).json(docs);
  } 
  catch(err)
  {
    return res.status(400).send(err.message)
  }
    
  
});

router.post("/update", async(req, res) => {

  await updateOrderStatus(req.body.id, req.body.order_status, req.body.product_name)
  res.status(200).send({data:"updated"})

})

module.exports = router;
