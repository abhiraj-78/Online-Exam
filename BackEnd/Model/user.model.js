import mongoose from "mongoose";
import { type } from "os";
const {Schema , model} = mongoose ;

const table = new Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String ,
        required : true ,
        unique : true 
    } ,
    password : {
        type : String ,
        required : true 
    } ,
    userType : {
        type : String ,
        required : true , 
    }
})

const userSchema = model("userSchema",table)

export default userSchema ;