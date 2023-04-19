const express = require("express");
const { verifyToken } = require("../verifyToken");
const { mongoConnect, closeConnection } = require("../Mongo");
const router = express.Router();
const mongodb = require("mongodb");

router.post("/addproduct",verifyToken,async(req,res)=>{
    try {
        const db = await mongoConnect();
        req.body.timestamp= new Date();
        const product = await db.collection("products").insertOne(req.body);
        await closeConnection();
        res.send(product);
    } catch (error) {
        console.log(error);
    }
})

router.put("/editproduct/:ProductId",verifyToken,async(req,res)=>{
    try {
        const db = await mongoConnect();
        req.body.modiefiedAT= new Date();
        const product = await db.collection("products").updateOne({_id:mongodb.ObjectId(req.params.ProductId)},{$set:req.body});
        await closeConnection();
        res.send(product);
    } catch (error) {
        console.log(error);
    }
})


router.get("/getproducts",verifyToken,async(req,res)=>{
    try {
        const db = await mongoConnect();
        
        const products = await db.collection("products").find().toArray();
        await closeConnection();
        res.send(products);
    } catch (error) {
        console.log(error);
    }
})
router.get("/productDetail/:productId",verifyToken,async(req,res)=>{
    try {
        const db = await mongoConnect();
        
        const product = await db.collection("products").findOne({_id:mongodb.ObjectId(req.params.productId)});
        await closeConnection();
        res.send(product);
    } catch (error) {
        console.log(error);
    }
})

router.delete("/deleteproduct/:productId",verifyToken,async(req,res)=>{
    try {
        const db = await mongoConnect();
        req.body.timestamp= new Date();
        const product = await db.collection("products").deleteOne({_id:mongodb.ObjectId(req.params.productId)});
        await closeConnection();
        res.send("Product Deleted");
    } catch (error) {
        console.log(error);
    }
})

module.exports = router