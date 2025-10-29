import { Blog } from "../models/blogModel.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs/promises"

export const createBlog=async(req,res)=>{
    try {
        const {title,description}=req.body
        let photoUrl=null

        if(!title||!description){
            return res.json({message:"Äll fields Required"})
        }
     
        if (req.file && process.env.CLOUDINARY_CLOUD_NAME) {
            try {
                // Upload to Cloudinary
                const result = await cloudinary.uploader.upload(req.file.path);
                photoUrl = result.secure_url;

                // Remove temporary local file
                await fs.unlink(req.file.path);
            } catch (err) {
                console.log(err);
            }
        }

                const newBlog = await Blog.create({
                    title,description,photoUrl
                })
if(!newBlog){
    return res.json({message:"Unable to post Blog "})
}
return res.status(201).json({message:"Blog Posted Successfully",newBlog})
    
    } catch (error) {
        console.log(error)
    }
}

export const getAllBlogs=async(req,res)=>{
    try {
        const blogs=await Blog.find()
        if(!blogs){
            return res.status(404).json({message:"no blogs"})
        }
        res.status(200).json({blogs})
    } catch (error) {
        console.log(error)
    }
}

export const deleteBlog=async(req,res)=>{

    try {
        const {blogId}=req.params
        // const getBlog=await Blog.findById(blogId)
        // if (!getBlog){
        //     return res.json({message:"no blog found"})         
        // }
        const deleteBlog=await Blog.findByIdAndDelete(blogId)
        if(!deleteBlog){
            return res.json({message:"SomeThing Went Wrong!"})
        }
        return res.status(200).json({message:"Blog Deleted Successfully"})
    

        
    } catch (error) {
        console.log(error)
    }
}