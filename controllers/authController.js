
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
    // const newUser= new User({name,email,password:hashPass})
    // await newUser.save()

    if(newUser){
        return res.status(201).json({message:"user Created Successfully"})
    }
        
    } catch (error) {
        console.log(error)
    }
}

export const login=async(req,res)=>{
    try {
        const{email,password}=req.body;
        if(!email||!password){
            return res.status(400).json({message:"Email and Password Required"})
        }
        const existingUser=await User.findOne({email})
        console.log(existingUser)
        if(!existingUser){
            return res.status(404).json({message:"No User Found"})
        }
        const checkPass=await bcrypt.compare(password,existingUser.password)

        if(!checkPass){
            return res.status(400).json({message:"incorrect password"})
        }
        
        return res.status(200).json({message:"User Logged in Successfully" ,user:existingUser})
    } catch (error) {
        console.log(error)
    }
}

