const express = require("express")
const app = express();
const cors = require("cors");

const Customer = require("./Routes/Customer");
const tbdOrder = require("./Routes/tbdOrder")
const labOrder = require("./Routes/LabOrder")
const Products = require("./Routes/Products")

app.use(express.json())

app.use(cors({
    origin:"http://localhost:3000"
}))



app.use("/api",Customer);
app.use("/api",tbdOrder);
// app.use("/api",labOrder);
app.use("/api",Products);


app.listen(5000,()=>{
    console.log("connected")
});