import mongoose from "mongoose";
import "dotenv/config"

const uri=process.env.mongoUri

export const connectDb=async()=>{
  try {
    await mongoose.connect(uri)
    console.log("Db Connected")
    
  } catch (error) {
    console.log(error)
  }
}