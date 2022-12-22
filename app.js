require("dotenv").config();
const express = require("express");
const app = express();
const products_routes = require("./routes/products")
const connectDb = require("./db/connec")
const PORT = process.env.PORT;
const URI = process.env.URI;
app.get("/",(req,res)=>{
    res.send("Hello server!");
})

app.use("/api/products",products_routes)

const start = async()=>{
try {
    await connectDb(URI);
    app.listen(PORT,()=>{})
} catch (error) {
    console.log(error);
}
};

start();