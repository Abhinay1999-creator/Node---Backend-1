const express = require("express");
const server = express();
const mongoose = require("mongoose");
const { createProduct, fetchAllProducts } = require("./controller/Product");
const productRouter = require('./routes/Products');
const categoriesRouter = require('./routes/Categories');
const brandsRouter = require('./routes/Brands');
const cors = require('cors');




//middelware
server.use(cors({
    exposedHeaders:['X-Total-Count']
}))
server.use(express.json()); // to parse ereq.body to json data
server.use('/products',productRouter.router);
server.use('/categories',categoriesRouter.router);
server.use('/brands',brandsRouter.router)


main().catch(err=>console.log(err));

async function main(){
await mongoose.connect('mongodb://127.0.0.1:27017/ecommerce');
console.log("Connection Started")
}

server.get('/',(req,res)=>{
    res.json({status:"Server Started"})
})  

server.post('/products',createProduct);
server.get('/products',fetchAllProducts);

server.listen(8080,()=>{
    console.log("Server Started")
})