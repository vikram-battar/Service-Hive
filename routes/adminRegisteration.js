const bcryptjs=require('bcryptjs');
const signUpRouter=require('express').Router()
const {users} = require('../db')
signUpRouter.get('/',(req,res)=>{
    res.end('Signup')
})
const {connection} = require('../database/connection')
const { insertIntoAdmin, createAdminTable, searchAdmin} = require('../database/queries')
signUpRouter.post('/',async (req,res)=>{
    const {name,username,password}=req.body;
    
    if(!name||!username||!password)
    {
       return res.status(200).send({err:"All fields are required"});
    }
    await createAdminTable()
    const userExists=await searchAdmin(username)
    console.log(userExists)
    if(userExists[0]!==undefined)
    {
        
       return res.status(200).send({err:"Admin Already Exists"})
    }
        const saltRounds=10;
        const passwordHash=await bcryptjs.hash(password,saltRounds)
        
        insertIntoAdmin(name,username, passwordHash)
        
       
            
        // users.insert({name,username,password:passwordHash})
        return res.end("User Created")
    
    
})




module.exports=signUpRouter