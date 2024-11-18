const express = require("express");
const router = express.Router();
const validator = require("validator");
const User = require("../models/user");
const { verifyjwtToken, passwordHash } = require("../utils/encryption");
const {
  validateProfileEditData,
  validateProfileEditPasswordField,
} = require("../utils/validation");

router.get("/view", verifyjwtToken, async (req, res, next) => {
  try {
    const user = req.user;
    console.log(`verifyjwtToken::: ${req.user}`);
    const users = await User.findById({ _id: user._id });
    res.send(users);
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

router.post("/edit", verifyjwtToken, async (req, res, next) => {
  try {
    const isFieldAllowed = validateProfileEditData(req.body);
    const user = req.user;
    if (!isFieldAllowed) {
      throw new Error("Invalid Request");
    }
    Object.keys(req.body).forEach((key) => {
      user[key] = req.body[key];
    });
    user.save();
    res.json({
      msg: `${user.firstName}, Your profile updated successfully`,
      data: { user },
    });
  } catch (err) {
    res.status(400).send(`Error: ${err.message}`);
  }
});
router.post("/editPassword", verifyjwtToken, async (req, res, next) => {
  try {
    const user = req.user;

    //check req.body has allowed fields or not
    const isFieldAllowed = validateProfileEditPasswordField(req.body);
    if (!isFieldAllowed) {
      throw new Error("Invalid Request");
    }
    const { currentPassword, newPassword } = req.body;

    //validate new password is strong or not
    const isPasswordStrong = validator.isStrongPassword(newPassword);
    if (!isPasswordStrong) {
      throw new Error("New Password is Not strong");
    }

    //check current password is correct or not
    const isCurrentPasswordCorrect = await user.checkPassword(currentPassword);
    if (!isCurrentPasswordCorrect) {
      throw new Error("Incorrect Password");
    }

    //all condition satisfied create password hash
    const hashNewPassword = await passwordHash(newPassword);
    user.password = hashNewPassword;
    user.save();
    res.json({
      msg: `${user.firstName}, Your Password updated successfully`,
      data: { user },
    });
  } catch (err) {
    res.status(400).send(`Error: ${err.message}`);
  }
});

router.post("/forgetPassword", verifyjwtToken, async (req, res, next) => {
  try {
    //we will take current password
    const isFieldAllowed = validateProfileEditData(req.body);
    const user = req.user;
    if (!isFieldAllowed) {
      throw new Error("Invalid Request");
    }
    Object.keys(req.body).forEach((key) => {
      user[key] = req.body[key];
    });
    user.save();
    res.json({
      msg: `${user.firstName}, Your profile updated successfully`,
      data: { user },
    });
  } catch (err) {
    res.status(400).send(`Error: ${err.message}`);
  }
});

module.exports = router;
