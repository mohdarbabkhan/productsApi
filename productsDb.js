require("dotenv").config();
const connectDb = require('./db/connec');
const Products = require('./db/models');
const productsJson = require('./products.json');

const start = async()=>{
    try {
        await connectDb(process.env.URI);
        await Products.deleteMany();
        await Products.create(productsJson);
        console.log("success");
    } catch (error) {
        console.log(error);
    }
}

start();