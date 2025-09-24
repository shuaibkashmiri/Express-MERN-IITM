import express, { json } from "express"
import { connectDb } from "./config/db.js"
import { login, registerUser } from "./controllers/authController.js"
import "dotenv/config"
const app = express()

const port=process.env.PORT
// middleware
app.use(express.json())

app.post("/user/register",registerUser)
app.post("/user/login",login)
app.listen(port,()=>{
    console.log(`Server running on ${port}`)
})

connectDb()