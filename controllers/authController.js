
import { User } from "../models/userModel.js";
import bcrypt from "bcrypt"


// basic Create Crud Operation
export const registerUser=async(req,res)=>{
    try {
        const {name,email,password}=req.body

    if(name===""||email===""||password===""){
        return res.status(400).json({message:"All Credentials Required"})
    }
    const existingUser=await User.findOne({email})

    if(existingUser){
        return res.status(400).json({message :"user already registered"})
    }

    const hashPass=await bcrypt.hash(password,10)

    const newUser=await User.create({name,email,password:hashPass})

    if(newUser){
        return res.status(201).json({message:"user Created Successfully"})
    }
        
    } catch (error) {
        console.log(error)
    }
}

