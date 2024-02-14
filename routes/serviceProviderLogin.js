const jwt=require('jsonwebtoken')
const bcryptjs=require('bcryptjs')
const loginRouter=require('express').Router();
const {a}= require('../database/products')
loginRouter.get('/',async (req,res)=>{
   console.log("Here to get /login ")
   const AllUsers=await User.find({})
   res.status(200).json(AllUsers)
})
const {searchServiceProvider} = require('../database/queries')

loginRouter.post('/',async (req,res)=>{
   const {username,password}=req.body;
  
   if((username==="")||(password===""))
   {
      
      return res.status(200).send({err:"All Fields are required"})
   }
   //let us=await 
   let user=await searchServiceProvider(username)
   console.log(user)
   if(user[0]===undefined)
   {
      return res.status(200).send({err:"Username or Password is incorrect"})
   }
   const passwordCorrect= await bcryptjs.compare(password,user[0].password)
   if(!passwordCorrect)
   {    
      return res.status(200).send({err:"Username or Password is incorrect"})
     // res.end("username or password incorrect")
   }
   
   const userForToken={
      username:user[0].username,
      name:user[0].name
   }

   const token=jwt.sign(userForToken,"E-Commerce");
   

   return res.status(200).send({user,token})
})

module.exports = loginRouter;