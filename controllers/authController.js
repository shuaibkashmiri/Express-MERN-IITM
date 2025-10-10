
import { User } from "../models/userModel.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const secretCode=process.env.JWT_SECRET


// basic Create Crud Operation
export const registerUser=async(req,res)=>{
    try {
        const {name,email,password}=req.body

    if(name===""||email===""||password===""){
        return res.json({message:"All Credentials Required"})
    }
    const existingUser=await User.findOne({email})

    if(existingUser){
        return res.json({message :"user already registered"})
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

        
        const token = jwt.sign({payload:existingUser._id},secretCode)
        


        return res.status(200).json({message:"User Logged in Successfully" ,token,user:existingUser})
    } catch (error) {
        console.log(error)
    }
}



export const getAllUsers=async(req,res)=>{
    try {
        const users=await User.find()
        if(!users){
            return res.status(404).json({message:"No Users"})
        }
        return res.status(200).json({message:"Users Fetched",users})
        
    } catch (error) {
      console.log(error)  
    }
}

export const getSingleUser=async(req,res)=>{
    try {
        const userid=req.user
        const getUser=await User.findById(userid)
        if(!getUser){
            return res.status(404).json({message:"User Not Found"})
        }
        return res.status(200).json({message:"User Found",getUser})
    } catch (error) {
        console.log(error)
    }
}