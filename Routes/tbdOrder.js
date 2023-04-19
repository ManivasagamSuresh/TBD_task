const express = require("express");
const { verifyToken } = require("../verifyToken");
const { mongoConnect, closeConnection } = require("../Mongo");
const router = express.Router();
const mongodb = require("mongodb");



//To place the order by Customer
router.post("/order",verifyToken,async(req,res)=>{
    try {
        const db = await mongoConnect();
        req.body.status = "PENDING, Waitng for confirmation"
        const order =await db.collection("Order").insertOne(req.body);
        await closeConnection();
        res.send(order);
    } catch (error) {
        console.log(error)
    }
})


// Confirm the order by Tbd and sending to Lab
router.put("/placeorder/:orderId",verifyToken,async(req,res)=>{
    try {
        const db = await mongoConnect();
        req.body.status = "SENT_TO_LAB"
        const order =await db.collection("Order").updateOne({_id:mongodb.ObjectId(req.params.orderId)},{$set:req.body});
        await closeConnection();
        res.send(order);
    } catch (error) {
        console.log(error)
    }
})


// sending order to lab
router.post("/tbdorder/:orderId",verifyToken,async(req,res)=>{
    try {
        const db = await mongoConnect();      
        const orderdetails = await db.collection("Order").findOne({_id:mongodb.ObjectId(req.params.orderId)})
        let orderid = orderdetails._id;
        delete orderdetails._id;
        orderdetails.TBDorderid = orderid;
        orderdetails.status = ""
        const tbdorder =await db.collection("tbdOrder").insertOne(orderdetails);
        await closeConnection();
        res.send(tbdorder);
    } catch (error) {
        console.log(error)
    }
})


//Confirm order by Lab with lab orderid
router.put("/labpartner/orderReceived/:orderId",verifyToken,async(req,res)=>{
    try {
        const db = await mongoConnect();
        
        const orderdetails = await db.collection("tbdOrder").findOne({_id:mongodb.ObjectId(req.params.orderId)})
        req.body.status = "Order Confirmed"
        const order =await db.collection("Order").updateOne({_id:mongodb.ObjectId(orderdetails.TBDorderid)},{$set:req.body});
        req.body.status = "Sample Received"
        const laborder =await db.collection("tbdOrder").updateOne({_id:mongodb.ObjectId(req.params.orderId)},{$set:req.body});
        await closeConnection();
        res.send("status changed");
    } catch (error) {
        console.log(error)
    }
})


router.put("/labpartner/orderShipped/:orderId",verifyToken,async(req,res)=>{
    try {
        const db = await mongoConnect();
        
        const orderdetails = await db.collection("tbdOrder").findOne({_id:mongodb.ObjectId(req.params.orderId)})
        req.body.status = "Order Shipped"
        const order =await db.collection("Order").updateOne({_id:mongodb.ObjectId(orderdetails.TBDorderid)},{$set:req.body});
        req.body.status = "Order Shipped to customer"
        const laborder =await db.collection("tbdOrder").updateOne({_id:mongodb.ObjectId(req.params.orderId)},{$set:req.body});
        await closeConnection();
        res.send("status changed");
    } catch (error) {
        console.log(error)
    }
})


router.put("/labpartner/customerReceived/:orderId",verifyToken,async(req,res)=>{
    try {
        const db = await mongoConnect();
        
        const orderdetails = await db.collection("tbdOrder").findOne({_id:mongodb.ObjectId(req.params.orderId)})
        req.body.status = "Product Delivered"
        const order =await db.collection("Order").updateOne({_id:mongodb.ObjectId(orderdetails.TBDorderid)},{$set:req.body});
        req.body.status = "Customer Received the product"
        const laborder =await db.collection("tbdOrder").updateOne({_id:mongodb.ObjectId(req.params.orderId)},{$set:req.body});
        await closeConnection();
        res.send("status changed");
    } catch (error) {
        console.log(error)
    }
})


router.put("/labpartner/sampleReceived/:orderId",verifyToken,async(req,res)=>{
    try {
        const db = await mongoConnect();
        
        const orderdetails = await db.collection("tbdOrder").findOne({_id:mongodb.ObjectId(req.params.orderId)})
        req.body.status = "Sample received from Customer"
        const order =await db.collection("Order").updateOne({_id:mongodb.ObjectId(orderdetails.TBDorderid)},{$set:req.body});
        req.body.status = "Sample received from Customer"
        const laborder =await db.collection("tbdOrder").updateOne({_id:mongodb.ObjectId(req.params.orderId)},{$set:req.body});
        await closeConnection();
        res.send("status changed");
    } catch (error) {
        console.log(error)
    }
})



router.put("/labpartner/resultReady/:orderId",verifyToken,async(req,res)=>{
    try {
        const db = await mongoConnect();
        
        const orderdetails = await db.collection("tbdOrder").findOne({_id:mongodb.ObjectId(req.params.orderId)})
        req.body.status = "Result Ready"
        const order =await db.collection("Order").updateOne({_id:mongodb.ObjectId(orderdetails.TBDorderid)},{$set:req.body});
        req.body.status = "Result Ready"
        const laborder =await db.collection("tbdOrder").updateOne({_id:mongodb.ObjectId(req.params.orderId)},{$set:req.body});
        await closeConnection();
        res.send("status changed");
    } catch (error) {
        console.log(error)
    }
})


router.put("/labpartner/addResult/:orderId",verifyToken,async(req,res)=>{
    try {
        const db = await mongoConnect();
        
        const orderdetails = await db.collection("tbdOrder").findOne({_id:mongodb.ObjectId(req.params.orderId)})
        
        const result =await db.collection("Order").updateOne({_id:mongodb.ObjectId(orderdetails.TBDorderid)},{$set:req.body});
        
        
        await closeConnection();
        res.send(result);
    } catch (error) {
        console.log(error)
    }
})

module.exports = router
