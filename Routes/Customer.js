const express = require("express");
const env = require("dotenv").config();
const router = express.Router();
const bcrypt = require("bcrypt");
const mongodb = require("mongodb");
const jwt = require("jsonwebtoken");
const { mongoConnect, closeConnection } = require("../Mongo");
const { verifyToken } = require("../verifyToken");
const jwt_token = process.env.JWT_TOKEN;

// SignUp
router.post("/signup" ,async(req,res)=>{
   try {
    const db =await mongoConnect();
    const hash = await bcrypt.hash(req.body.password,10);
    req.body.password = hash;
    const user =await db.collection("customers").insertOne(req.body);
    await closeConnection();
    res.status(201).send(user);
   } catch (error) {
    console.log(error);
   }  
})

// login
router.post("/signin",async(req,res)=>{
    try {
        const db = await mongoConnect();
        const user = await db.collection("customers").findOne({email:req.body.email});
        if(user){
            const compare = await bcrypt.compare(req.body.password, user.password);
                if (compare) {
                    const token = await jwt.sign({_id:user._id},jwt_token,{expiresIn:"60m"})
                    res.status(200).send({message:"success",token});
                } else {
                    res.status(404).send("Invalid credential");        
                }
        }else{
            res.status(404).send("Invalid credential");
        }
        await closeConnection();
    } catch (error) {
        console.log(error)
    }
})


// Get customer detail
router.get("/getCustomer/:id",verifyToken,async(req,res)=>{
    try {
        const db  = await mongoConnect();
        const customer =await  db.collection("customers").findOne({_id:mongodb.ObjectId(req.params.id)})
        await closeConnection();
        res.status(200).send(customer);
        
    } catch (error) {
        console.log(error);
    }
})


module.exports = router;