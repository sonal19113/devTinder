const bcrypt = require("bcrypt");

const passwordHash = async (password)=>{
    return  await bcrypt.hash(password,10);
}

module.exports={
    passwordHash
}