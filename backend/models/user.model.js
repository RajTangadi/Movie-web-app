import mongoose from "mongoose";

const userSchame = new mongoose.Schema({
    username:{
        type:String,
        required: true,
        unique:true
    },
    password:{
        type:String,
        required: true,
    },
    role:{
        type:String,
        enum:['admin','user'],
        default:'user'
    },
})

export const User = mongoose.model('User',userSchame)
