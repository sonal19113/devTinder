const mongoose =require("mongoose");
const validator =require("validator");

const userSchema = new mongoose.Schema({
    firstName :{
        type : String,
        require: true,
        maxLength:30,
        minLength:3
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
        lowercase:true,
        index: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email Id "+value);
            }
        }
        //use validator.js
        // validate(value) {
        //     const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        //     if(!regex.test(value)){
        //         throw new Error("Invalid Email Address");
        //     };
        // }
    },
    password :{
        type : String,
        required:true,

        validate(value){
            console.log('value',value);
            if(!validator.isStrongPassword(value)){
                console.log('value',validator.isStrongPassword(value));

                throw new Error("Please provide strong password");
            }
        }
        //use validator.js
    },
    age :{
        type : Number,
        min:18,
    },
    phone:{
        type:Number,
        required:true,
        //add validator.js
    },
    gender :{
        type : String,
        required:true,
        enum: ['Male', 'Female', 'Other'],
    },
    photoUrl:{
        type : String, 
        default: function(){
            return this.gender ==='Female' ? "/static/images/female.png":"/static/images/others.png";
        }
    },
    skill:{
        type: [String],
        validate(value){
            if(value.length > 10){
                throw new Error("Max 10 skills can be entered")
            }
        }
    },
    about:{
        type : String, 
        default:"This is default About for the user",
        maxLength: 300
    },
    uploadedImages:{
        type :[Object]
    }
},{
    timestamps : true
})

const User = mongoose.model("User",userSchema);

module.exports = User;