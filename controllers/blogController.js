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