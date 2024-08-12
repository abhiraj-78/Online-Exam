import { compareSync , genSaltSync,  hashSync } from "bcrypt";
import userSchema from "../Model/user.model.js" ;
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";

export const signUp = async(request , response)=>{
    try{
        const errors = validationResult(request)
        if(!errors.isEmpty())
            return response.status(400).json({ errors: errors.array() });
    
        const {name , email , password , userType } = request.body 

        const saltKey = genSaltSync(10) ;
        const hashPassword = hashSync(password,saltKey) ;
        const user = await userSchema.create({name , email , password : hashPassword ,userType}) ;
    
        if(user){
            return response.status(200).json({message : " user login success" , user})
        }
    }catch(err){
        console.log(err);
    }
}   

export const signIn = async (request , response ) =>{
    try {
        const {email , password } = request.body    
    
        const user = userSchema.findOne({email})
        if(user){
            const ecnPassword = user.password ;
            const bcrPassword = compareSync(password,ecnPassword)
            const payload = {email}
            if(bcrPassword){
                const token = jwt.sign(payload,process.env.SECREATE_KEY)
                return response.status(200).json({data : user , message : 'sign in success', token })
            }
            return response.status(401).json({message : "password is wrong"}) ; 
        }
        else{
            response.status(404).json({message : "user not found"})
        }
        
    } catch (error) {
        console.log(error);
        return response.status(500).json({message : "Internal server error"})
    }
}