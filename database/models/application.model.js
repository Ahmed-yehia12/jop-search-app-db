import mongoose, { Types } from "mongoose";

const schema = new mongoose.Schema({

   
    jobId:{
        type: Types.ObjectId,
        ref:'jop'
        },


    userId :{
    type: Types.ObjectId,
    ref:'user'
    },


    userTechSkills:[],

    userSoftSkills:[],

    userResume:[{
        id:{type:String , required:true},
        url:{type:String , required:true}
    }]


   





}, { timestamps: true })


export const applicationModel = mongoose.model('application', schema)



