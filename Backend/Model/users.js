const mongoose = require("mongoose");

const userSchemaRules = {
    name :{
        type : String,
        require:true
    },
    email :{
        type : String,
        require:true
    },

    password:{
        type:String,
        require:true
    },

    phoneNumber:{
        type:String,
        require:true
    },
    role: {
        type: String,
        required: false,
        default: "User" // "Admin", "Partner", "User"
    },

    // New Otp fields added
    otp: {
        type: String
    },
  
    otpExpiry: {
        type: Date
    },    
}

const userSchema = new mongoose.Schema(userSchemaRules);

const userModels = mongoose.model("users",userSchema);

module.exports =userModels;