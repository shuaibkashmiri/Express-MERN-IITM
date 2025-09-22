import express, { json } from "express"
import { connectDb } from "./config/db.js"
import { registerUser } from "./controllers/authController.js"

const app = express()

// middleware
app.use(express.json())

app.post("/user/register",registerUser)

app.listen(4000,()=>{
    console.log("Server is running on Port 4000")
})

connectDb()