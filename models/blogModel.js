import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,},

    description:{
        type:String,
        required:true,
    },
    photoUrl:{
        type:String,
        required:true
    },

    likes:[
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        }
    ],
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
     
//     comments:[
//         {
// type: mongoose.Schema.Types.ObjectId,
//         ref: "User",

//         }

//     ]

},{
    timestamps: true
})

export const Blog =mongoose.model("Blog",blogSchema)