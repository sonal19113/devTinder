const mongoose =require("mongoose");

const userSchema = new mongoose.Schema({
    firstName :{
        type : String
    },
    lastName :{
        type : String
    },
    emailId :{
        type : String
    },
    password :{
        type : String
    },
    age :{
        type : Number
    },
    gender :{
        type : String,
        enum: ['Male', 'Female', 'Other'],
    },
    photoUrl:{
        type : String,    
    },
    skill:{
        type: [String]
    },
    about:{
        type : String, 
        default:"This is default About for the user"
    }
},{
    timestamps : true
})

const User = mongoose.model("User",userSchema);

module.exports = User;