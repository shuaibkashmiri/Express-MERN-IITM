import jwt from "jsonwebtoken"
const secretCode= process.env.JWT_SECRET

export const protect=async (req,res,next)=>{
    try {
        const token =req.headers.authorization || req.headers.authorization?.split(" ")[1]
        console.log(token)
        // console.log(req.headers.authorization.split(" "))
        // console.log(token)
        if(!token){
            return res.status(404).json({message:"token Required"})
        }

        const decode= jwt.verify(token,secretCode)
        if(!decode){
            return res.status(400).json({message:"Unauthorized Access"})
        }
         console.log(decode)
        req.user=decode.payload
        next()

        console.log(token)
    } catch (error) {
        console.log(error)
    }
}