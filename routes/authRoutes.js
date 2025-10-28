import express from "express"
import { getAllUsers, getSingleUser, login, registerUser } from "../controllers/authController.js"
import { protect } from "../middlewares/auth.js"
import upload from "../middlewares/uploadMiddleware.js"
const router = express.Router()

router.post("/register",upload.single("profilePicture"), registerUser)
router.post("/login", login)
router.get("/getall", getAllUsers)
router.get("/userdetails", protect, getSingleUser)


// frontend auth

router.get("/user-auth",protect,(req,res)=>{
    res.status(200).json({success:true})
})
export default router