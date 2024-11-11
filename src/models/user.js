const mongoose =require("mongoose");

const userSchema = new mongoose.Schema({
    firstName :{
        type : String
    },
    lastName :{
        type : String
    },
    emailId :{
        type : String,
        required:true,
        unique:true,
        trim:true,
        minLength:8,
        index: true,
        validate(value) {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if(!regex.test(value)){
                throw new Error("Invalid Email Address");
            };
        }
    },
    password :{
        type : String,
        required:true,
    },
    age :{
        type : Number
    },
    gender :{
        type : String,
        required:true,
        enum: ['Male', 'Female', 'Other'],
    },
    photoUrl:{
        type : String, 
        default: function(){
            return this.gender ==='Female' ? "":"";
        }
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