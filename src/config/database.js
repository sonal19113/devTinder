const mongoose = require("mongoose");
const connectDB =async ()=>{
    mongoose.connect("mongodb://localhost:27017/devTinder");
}
connectDB().then(()=>{
    console.log("Database Connected Successfully");
}).catch((err)=>{
    console.log(`Error in establishing connection with database ${err}`);
})