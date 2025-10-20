import express, { json } from "express"
import { connectDb } from "./config/db.js"
import authRoutes from "./routes/authRoutes.js"
import blogRoutes from "./routes/blogRoutes.js"
import cors from 'cors'

import "dotenv/config"
const app = express()

const port=process.env.PORT
// middleware
app.use(express.json())
app.use(cors())

// routes
app.use("/api/auth",authRoutes)
app.use("/api/blog",blogRoutes)

// app.post("/user/register",registerUser)
// app.post("/user/login",login)
app.listen(port,()=>{
    console.log(`Server running on ${port}`)
})

connectDb()