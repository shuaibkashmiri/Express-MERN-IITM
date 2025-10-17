import { User } from "../models/userModel.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import cloudinary from "../config/cloudinary.js"

const secretCode=process.env.JWT_SECRET


// basic Create Crud Operation
export const registerUser = async (req, res) => {
    try {
        console.log('Request Content-Type:', req.get('Content-Type'));
        console.log('req.body:', req.body);
        console.log('req.file:', req.file);
        console.log('req.files:', req.files);
        
        const { name, email, password } = req.body;

        if (name === "" || email === "" || password === "") {
            return res.json({ message: "All Credentials Required" });
        }
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.json({ message: "user already registered" });
        }

        const hashPass = await bcrypt.hash(password, 10);

        // Handle profile picture upload if present
        let profilePicture = null;
        if (req.file && process.env.CLOUDINARY_CLOUD_NAME) {
            try {
                // Convert buffer to base64 for cloudinary upload
                const b64 = Buffer.from(req.file.buffer).toString("base64");
                // console.log(b64)
                const dataURI = "data:" + req.file.mimetype + ";base64," + b64;
                // console.log(dataURI)
                const result = await cloudinary.uploader.upload(dataURI);
                profilePicture = result.secure_url;
               
            } catch (error) {
            console.log(error)
            }
        } 

        const newUser = await User.create({
            name,
            email,
            password: hashPass,
            profilePicture
        });

        if (newUser) {
            return res.status(201).json({
                message: "User Created Successfully",
                user: {
                    name: newUser.name,
                    email: newUser.email,
                    profilePicture: newUser.profilePicture
                }
            });
        }
    } catch (error) {
        console.error('Error in registerUser:', error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};





export const login=async(req,res)=>{
    try {
        const{email,password}=req.body;
        if(!email||!password){
            return res.json({message:"Email and Password Required"})
        }
        const existingUser=await User.findOne({email})
        console.log(existingUser)
        if(!existingUser){
            return res.json({message:"No User Found"})
        }
        const checkPass=await bcrypt.compare(password,existingUser.password)

        if(!checkPass){
            return res.json({message:"incorrect password"})
        }

        
        const token = jwt.sign({payload:existingUser._id},secretCode)
        


        return res.status(200).json({message:"User Logged in Successfully" ,token})
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