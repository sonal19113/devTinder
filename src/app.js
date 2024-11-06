console.log('hello world!'); 
const express = require("express");
const app = express();
const PORT = 7777;
app.listen(PORT,(req,res)=>{
    console.log(`Listening at port: ${PORT}`);
});

// app.use("/user",(req,res)=>{
//     res.send('Use will match will all method and because of order it will run always');
// })

app.get("/user",(req,res)=>{
    res.send({name:"Sonal",age:21});
})
app.post("/user",(req,res)=>{
    res.send("POST: User Updated Successfully");
})
app.delete("/user",(req,res)=>{
    res.send("Delete: User deleted Successfully");
})
app.put("/user",(req,res)=>{
    res.send("PUT: User whole object updated Successfully");
})
app.patch("/user",(req,res)=>{
    res.send("PATCH: User specific details updated Successfully");
})
app.head("/user",(req,res)=>{
    res.send("HEAD: used to optimize web performance, improve security, and enhance user experience. Like GET but server not return message body in response");
})
app.options("/user",(req,res)=>{
    res.send("OPTIONS:OPTIONS HTTP method requests permitted communication options for a given URL or server");
})