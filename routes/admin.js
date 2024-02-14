
const adminRouter=require('express').Router();
const {getTopCategories, getTopServices, getTopUsers, getMostOrderedServices} = require('../database/admin')

adminRouter.get('/topCategories',async (req,res)=>{    
    const data=await getTopCategories();
    res.status(200).json(data)
 })
 adminRouter.get('/topServices',async (req,res)=>{
    const data=await getTopServices();
    res.status(200).json(data)
 })
 adminRouter.get('/topUsers',async (req,res)=>{
    const data=await getTopUsers();
    res.status(200).json(data)
 })
 adminRouter.get('/mostOrderedServices',async (req,res)=>{
    const data=await getMostOrderedServices();
    res.status(200).json(data)
 })


module.exports = adminRouter;