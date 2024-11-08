"use strict"
const express = require("express");
const {AdminAuth,userAuth} = require("./middleware/auth");
const app = express();
const PORT = 7777;
app.listen(PORT,(req,res)=>{
    console.log(`Listening at port: ${PORT}`);
});


/*Erorr handling 2 ways
1)Always use try and catch block to handle error 
2)error handling by using app.use()
*/
app.get("/user",userAuth,(req,res)=>{
    try{
        throw new Error("helloooo");
        res.send({name:"Sonal",age:21});
    }catch(err){
        res.status(500).send("Error Occured")
    }
})

/*Middleware*/
app.use("/admin",AdminAuth);

app.get("/admin/getAllDetails",(req,res,next)=>{
    console.log("getAllDetails");
    res.send("All details fetch successfully");
})


app.use("/",(err,req,res,next)=>{
    if(err){
     res.status(500).send("Something Went Wrong")
    }
})