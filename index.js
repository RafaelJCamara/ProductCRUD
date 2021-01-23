const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const Product = require("./models/product");

mongoose.connect('mongodb://localhost:27017/farmStand', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })


app.set("views",path.join(__dirname,"views"));
app.set("view engine", "ejs");


app.get("/products", async (req,res)=>{
    const products = await Product.find({});
    res.send("We have all the products");
});


app.listen(3000,()=>{
    console.log("Listening on port 3000...");
});