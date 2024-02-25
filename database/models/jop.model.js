import mongoose, { Types } from "mongoose";

const schema = new mongoose.Schema({
    jobTitle : {
        type: String,
        trim: true,
        required: true,
    },
    jobLocation : {
        type: String,
        enum: ['onSite','remotely','hybrid'],
        default: null ,
        required:true
    },
    workingTime  : {
        type: String,
        enum: ['part-time','full-time'],
        default:null,
        required:true

    },
    seniorityLevel  : {
        type: String,
        enum: ['Junior','Mid-Level','Senior','Team-Lead','CTO'],
        default: null,
        required:true

    },
    jobDescription:{
        type:String,
        required:true ,
        minLength: [2, 'too short description name']

    },

    technicalSkills:[],
    softSkills:[],
    
    company:{
        type:Types.ObjectId,
        ref:'company'
    },
    addedBy:{
        type:Types.ObjectId,
        ref:'user'
    }
}, { timestamps: true })


export const jopModel = mongoose.model('jop', schema)



