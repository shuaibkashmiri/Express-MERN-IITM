import { User } from "../models/userModel.js";


// basic Create Crud Operation
export const registerUser=async(req,res)=>{
try {
        const {name,email,password}=req.body;
       
    const newUser =await User.create({name,email,password})
    return res.status(201).json({message:"User Created Successfully"})
} catch (error) {
   console.log(error) 
}
}

