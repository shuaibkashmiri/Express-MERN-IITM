import { Blog } from "../models/blogModel.js";
import cloudinary from "../config/cloudinary.js";

export const createBlog=async(req,res)=>{
    try {
        const {title,description}=req.body
        let photoUrl=null

        if(!title||!description){
            return res.json({message:"Äll fields Required"})
        }
     const b64 = Buffer.from(req.file.buffer).toString("base64");
                // console.log(b64)
                const dataURI = "data:" + req.file.mimetype + ";base64," + b64;
                // console.log(dataURI)
                const result = await cloudinary.uploader.upload(dataURI);
                photoUrl = result.secure_url;

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