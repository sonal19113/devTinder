const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const SECRET = "Asdfg@1234$Qwerty";

const passwordHash = async (password) => {
  return await bcrypt.hash(password, 10);
  
};

const decryptPassword = async (password, passwordHash) => {
  return await bcrypt.compare(password, passwordHash);
};

const cereateJwtToken = (_id) => {
  return jwt.sign({ _id }, SECRET);
};


const verifyjwtToken =  async (req, res, next) => {
  try {
    if (!req.cookies.token) {
      throw new Error("Invalid Credentials");
    }
    const payload = jwt.verify(req.cookies.token, SECRET);
    const {_id} = payload;
    const user = await User.findById(_id);
    if(!user){
        throw new Error("Invalid Credentials");
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send(`Error: ${err.message}`);
  }
};

module.exports = {
  passwordHash,
  decryptPassword,
  cereateJwtToken,
  verifyjwtToken,
};
