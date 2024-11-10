const mongoose = require("mongoose");


async function connectDB(){
    console.log('Database Connection');
    await mongoose.connect("mongodb://localhost:27017/au_sewadwaar"); 
}

module.exports={
    connectDB 
}