const express = require("express");
const userRouter = express.Router();
const User = require("../models/user");
const { verifyjwtToken } = require("../utils/encryption");

//Feed API- get all the users from the db for feed
userRouter.get("/feed", verifyjwtToken, async (req, res,next) => {
    try {
      console.log(`verifyjwtToken::: ${req.user}`);
      const users = await User.find({});
      res.send(users);
    } catch (err) {
      res.status(400).send("Something went wrong");
    }
  });


  module.exports = userRouter;
