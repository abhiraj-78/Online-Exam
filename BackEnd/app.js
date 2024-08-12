import express from "express"
import cors from "cors"
import { configDotenv } from "dotenv"
import mongoose from "mongoose"
import { log } from "console"
import bodyParser from "body-parser"
import userRouter from "./Router/user.router.js"
configDotenv()

const app = express()
mongoose.connect(process.env.CONNECTION).then(()=>{
    app.use(bodyParser.urlencoded({extended:true}))
    app.use(bodyParser.json()) 

    app.use('/user',userRouter)
    
    app.listen(process.env.PORT_NO,()=>{
        console.log("server start");
    })
}).catch((err)=>{
    console.log(err);
})
