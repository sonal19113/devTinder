const express = require("express");
const authRouter = express.Router();
const { passwordHash } = require("../utils/encryption");
const User = require("../models/user");
const { validateSignUpData } = require("../utils/validation");




authRouter.post("/signup", async (req, res) => {
    try {
      validateSignUpData(req.body);
      const {
        firstName,
        lastName,
        emailId,
        password,
        age,
        gender,
        phone,
        skill,
      } = req.body;
      const passwordHashString = await passwordHash(password);
      // console.log(passwordHashString);
      const user = new User({
        firstName,
        lastName,
        emailId,
        password: passwordHashString,
        age,
        gender,
        phone,
        skill,
      });
      await user.save();
      res.send("User Saved Successfully");
    } catch (err) {
      res.status(400).send(`Error: ${err.message}`);
    }
  });

  authRouter.post("/login", async (req, res, next) => {
    try {
      const { emailId, password } = req.body;
      const user = await User.findOne({ emailId });
      if (!user) {
        throw new Error("Invalid Credential");
      }
      // const checkPassword = await decryptPassword(password, user.password);
      const isPasswordValid = await user.checkPassword(password);
  
      if(!isPasswordValid){
          throw new Error("Invalid Credential");  
      }
      // const token = cereateJwtToken(user._id);
      const token = user.getJwtToken();
      res.cookie("token",token);
      res.send(user);
    } catch (err) {
      res.status(400).send(`Error: ${err.message}`);
    }
  });

  authRouter.get("/logout", (req,res)=>{
    res.cookie("token", null,{maxAge :0}).send("logout Sucessfull");
  });
  

  authRouter.get("/user", async (req, res) => {
    const emailId = req.body.emailId;
    try {
      //find will get all user with that emailId
      const users = await User.findOne({ emailId });
      if (!users) {
        res.status(404).send("User Not Found");
      } else {
        res.send(users);
      }
    } catch (err) {
      res.status(400).send("Something Went Wrong!");
    }
  });



  authRouter.delete("/user", async (req, res) => {
    try {
      const userId = req.body.userId;
      console.log(userId);
      const user = await User.findByIdAndDelete(userId);
      //both will give same resukt we can use both
      // const user = User.findByIdAndDelete(_id:userId);
      res.send(user);
    } catch (err) {
      res.status(400).send("Something went wrong");
    }
  });


  authRouter.patch("/user/:userId", async (req, res) => {
    const userId = req.params.userId;
    const data = req.body;
  
    try {
      const ValidKeys = [
        "firstName",
        "lastName",
        "password",
        "phone",
        "age",
        "skill",
        "about",
        "uploadedImages",
        "photoUrl",
      ];
      Object.keys(data).forEach((k) => {
        if (!ValidKeys.includes(k)) {
          throw new Error("Invalid Post Data");
        }
      });
      // const user = await User.findByIdAndUpdate({_id:userId},data);
      const user = await User.findByIdAndUpdate(userId, data, {
        returnDocument: "after",
        runValidators: true,
      });
      res.send(user);
    } catch (err) {
      res.status(400).send("Something went wrong:" + err.message);
    }
  });

module.exports =authRouter;