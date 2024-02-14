const bcryptjs=require('bcryptjs');
const signUpRouter=require('express').Router()
const {users} = require('../db')
signUpRouter.get('/',(req,res)=>{
    res.end('Signup')
})
const {connection} = require('../database/connection')
const { insertIntoServiceProvider, createServiceProviderTable, searchServiceProvider} = require('../database/queries')
signUpRouter.post('/',async (req,res)=>{
    const {name,username,email,phone,password, category}=req.body;
    
    if(!name||!username||!password)
    {
       return res.status(200).send({err:"All fields are required"});
    }
    await createServiceProviderTable()
    const userExists=await searchServiceProvider(username)
    console.log(userExists)
    if(userExists[0]!==undefined)
    {
        
       return res.status(200).send({err:"Service Provider Already Exists"})
    }
        const saltRounds=10;
        const passwordHash=await bcryptjs.hash(password,saltRounds)
        
       console.log("This is category", category, req.body)
           insertIntoServiceProvider(name,username,phone,email, passwordHash, category)
        
       
            
        users.insert({name,username,password:passwordHash})
        return res.end("User Created")
    
    
})




module.exports=signUpRouter