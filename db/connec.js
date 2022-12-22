const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const connectDb = (uri)=>{
    return mongoose.connect(uri,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    });
}

module.exports = connectDb;