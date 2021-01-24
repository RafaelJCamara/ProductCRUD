const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const Product = require("./models/product");
const methodOverride = require('method-override');
const { Console } = require("console");

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
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));


//Showcase products
app.get("/products", async (req,res)=>{
    const products = await Product.find({});
    res.render("index",{products});
});

//Save the new product
app.post("/products", async (req,res)=>{
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.redirect("/products");
});

//Create new product
app.get("/products/new", (req,res)=>{
    res.render("new");
});

//Show product details
app.get("/products/:id", async (req,res)=>{
    const {id} = req.params;
    try {
        const product = await Product.findById(id);
        res.render("show",{product});
    } catch (error) {
        console.log("There was an error...");
        console.log(error);
    }
});

app.listen(3000,()=>{
    console.log("Listening on port 3000...");
});