const bcryptjs=require('bcryptjs');
const signUpRouter=require('express').Router()
const {users} = require('../db')
signUpRouter.get('/',(req,res)=>{
    res.end('Signup')
})
const {connection} = require('../database/connection')
const {createUserTable, insertIntoUser, searchUser, insertIntoCustomer, insertIntoEmployee} = require('../database/queries')
signUpRouter.post('/',async (req,res)=>{
    const {name,username,email,phone,password}=req.body;
    
    if(!name||!username||!password)
    {
       return res.status(200).send({err:"All fields are required"});
    }
    await createUserTable()
    const userExists=await searchUser(username)
    console.log(userExists)
    if(userExists[0]!==undefined)
    {
        
       return res.status(200).send({err:"User Already Exists"})
    }
        const saltRounds=10;
        const passwordHash=await bcryptjs.hash(password,saltRounds)
        console.log("here to register users")
        
        const userType="user"
        
        await insertIntoUser(name, username, passwordHash, userType)

        if(userType==="user")
        {
           insertIntoCustomer(name,username,phone,email)
        }
        else
        {
            insertIntoEmployee(name, username, phone, email)
        }
        
        // const newUser=new User({name,username,password:passwordHash});
        // await newUser.save();
        users.insert({name,username,password:passwordHash})
        return res.end("User Created")
    
    
})




module.exports=signUpRouter