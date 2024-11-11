const express = require("express");
const path = require('path');
const {adminAuth, userAuth} = require("./middleware/auth");
const { connectDB } = require("./config/database");
const { validateSignUpData } = require("./utils/validation");
const { passwordHash } = require("./utils/encryption");
const User = require("./models/user");
const app = express();
const PORT = 5000;

connectDB().then(()=>{
    app.listen(PORT,(req,res)=>{
        console.log(`Listening at port number ${PORT}`)
    })  
     
}).catch((err)=>{
    console.log(`Something went wrong ${err}`);
})

// console.log(`path::::::::::${path.join(__dirname, 'public')}`)
app.use('/static', express.static(path.join(__dirname, 'public')));

app.use(express.json());

// app.post("/signup", async (req,res)=>{
//     const userObj ={
//         firstName :"Hello",
//         lastName :"World",
//         emailId :"hello.world@gmail.com",
//         password :"hello@123",
//         age :17,
//         gender :"Other"
//     }
//     try{
//         const user = new User(userObj);
//         await user.save();
//         res.send("User Saved Successfully");
//     }catch(err){
//         res.status(400).send(`Unable to Upload Data ${err.message}`);
//     }
// })
app.post("/signup", async (req,res)=>{
    try{

        validateSignUpData(req.body);
        const {firstName,lastName,emailId,password,age,gender,phone,skill} = req.body;
        const passwordHashString = await passwordHash(password);
        // console.log(passwordHashString);
        const user = new User({firstName,
            lastName,
            emailId,
            password : passwordHashString,
            age,
            gender,
            phone,
            skill
        });
        await user.save();
        res.send("User Saved Successfully");
    }catch(err){
        res.status(400).send(`Error: ${err.message}`);
    }
});

/*
http://localhost:5000/signup
{
    "firstName": "Sonal",
    "lastName": "Kumari",
    "emailId": "sonal.kumari@gmail.com",
    "password": "Sonal@123",
    "age": 24,
    "gender": "Female",
    "phone":"9999999999",
    "skill":["javaScript","node.js","acting","dancing"]
}
 */


//get user by email
app.get("/user", async (req,res)=>{
    const emailId = req.body.emailId;
    console.log(emailId);
    // try{
    // //find will get all user with that emailId    
    // const users = await User.find({emailId});
    // if(users.length === 0){
    //     res.status(404).send("User Not Found");
    // }else{
    //     res.send(users);
    // }
    // }catch(err){
    //     res.status(400).send("Something Went Wrong!");
    // }
    try{
    //find will get all user with that emailId    
    const users = await User.findOne({emailId});
    if(!users){
        res.status(404).send("User Not Found");
    }else{
        res.send(users);
    }
    }catch(err){
        res.status(400).send("Something Went Wrong!");
    }
})

app.delete("/user", async(req,res)=>{
    try{
        const userId = req.body.userId;
        console.log(userId);
        const user = await User.findByIdAndDelete(userId);
        //both will give same resukt we can use both 
        // const user = User.findByIdAndDelete(_id:userId);
        res.send(user);

    }catch(err){
        res.status(400).send("Something went wrong");
    }
})

app.patch("/user/:userId",async(req,res)=>{
    const userId = req.params.userId;
    const data = req.body;

    try{
        const ValidKeys =["firstName","lastName","password","phone","age","skill","about","uploadedImages","photoUrl"];
        Object.keys(data).forEach(k=>{
            if(!ValidKeys.includes(k)){ 
                throw new Error("Invalid Post Data");
            }
        });
        // const user = await User.findByIdAndUpdate({_id:userId},data);
        const user = await User.findByIdAndUpdate(userId,data,{returnDocument:"after",runValidators:true});
        res.send(user)

    }catch(err){
        res.status(400).send("Something went wrong:"+err.message); 
    }
})

//Feed API- get all the users from the db for feed
app.get("/feed",async(req,res)=>{
    try{
        const users = await User.find({});
        res.send(users);

    }catch(err){
        res.status(400).send("Something went wrong");
    }

})

















// /****** Error Handling using app.use and try and catch*/

// app.get("/user/getDetails",(req,res,next)=>{
//     try{
//     throw new Error("Creating Error for testing");
//     res.send("data")
//     }catch(err){
//         res.status(500).send(`Some error ocurred`)
//     }
// })

// app.use("/",(err,req,res,next)=>{
//     if(err){
//         res.status(500).send("Something Went Wrong");
//     }
// })

// /****** */
// //another way to call middleware
// app.get("/user",userAuth,(req,res,next)=>{
//     console.log("route handler 1");
//     next();
// },
// (req,res,next)=>{
//     console.log("route handler 2");
//     next();
// },(req,res,next)=>{
//     res.send("hello");

//     // next();
// }
// //theroute handler present in the middle is called middleware
// )



// app.use("/admin",adminAuth);

// app.get("/admin/getDetails",(req,res,next)=>{
//     console.log("admin details");
//     res.send("User All details");
// })

// app.delete("/admin/deleteUser",(req,res,next)=>{
//     console.log("Delete User");
//     res.send("User Deleted");
// })