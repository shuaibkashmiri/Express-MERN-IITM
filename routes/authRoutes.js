import express from "express"
import { getAllUsers, getSingleUser, login, registerUser } from "../controllers/authController.js"
import { protect } from "../middlewares/auth.js"
 const router =express.Router()

 router.post("/register",registerUser)
router.post("/login",login)
router.get("/getall",getAllUsers)
router.get("/getsingle",protect,getSingleUser)
 export default router