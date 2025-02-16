import mongoose from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

const userSchema = new mongoose.Schema({
    token:String,
    _id:Number,
   
    name :{
        type:String,
        required:[true,"Name is Required"],
        trim:true
    },
    email :{
        type:String,
        required:[true,"Email is Required"],
        unique:true,
        trim:true
    },
    password :{
        type:String,
        required:[true,"Password is Required"],
        trim:true
    },
    phone :{
        type:String,
        required:[true,"Phone is Required"],
        trim:true
    },
    address :{
        type:String,
        required:[true,"Address is Required"],
        trim:true
    },
    city :{
        type:String,
        required:[true,"City is Required"],
        trim:true
    },
    gender :{
        type:String,
        required:[true,"Gender is Required"],
        trim:true
    },
    role:String,
    info:String,
    status:Number,
    
});


userSchema.plugin(mongooseUniqueValidator);
const userSChemaModel = mongoose.model("Local_UserData",userSchema);

export default userSChemaModel;