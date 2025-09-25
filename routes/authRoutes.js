import express from "express"
import { getAllUsers, getSingleUser, login, registerUser } from "../controllers/authController.js"
 const router =express.Router()

 router.post("/register",registerUser)
router.post("/login",login)
router.get("/getall",getAllUsers)
router.get("/getsingle/:userid",getSingleUser)
 export default router