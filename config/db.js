import mongoose from "mongoose";
const uri ="mongodb://localhost:27017/testDB"

export const connectDb=async()=>{
  try {
    await mongoose.connect(uri)
    console.log("Db Connected")
    
  } catch (error) {
    console.log(error)
  }
}