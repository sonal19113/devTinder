console.log('hello world!'); 
const express = require("express");
const app = express();
const PORT = 7777;
app.listen(PORT,(req,res)=>{
    console.log(`Listening at port: ${PORT}`);
});
app.use("/test",(req,res)=>{
    res.send("Test:::::::::::Hello From the Server");
})
app.use("/home",(req,res)=>{
    res.send("Home:::::::::::Hello From the Server");
})