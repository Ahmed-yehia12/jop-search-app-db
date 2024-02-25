import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

const schema = new mongoose.Schema({
    firstName : {
        type: String,
        trim: true,
        required: true,
    },
    lastName: {
        type: String ,
        trim: true , 
        required:true
    },
    userName:{
        type:String ,
        trim: true , 
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique:true,
    },
    password: {
        type: String,
        required: true,
    },
    recoveryEmail :{
        type: String,
        trim: true,
        required: true,
    },
    DOB:{
        type:Date,
        required: true
    },
    mobileNumber :{
        type:String , 
        unique: true , 
        required: true
    },
    
    role:{
        type:String,
        enum:['user','company_HR'],
        default:'user'
    },
    status:{
        type:String ,
        enum:['online','offline'],
        default:'offline'
    },
    passwordChangedAt:Date,
    
    forgetCode:{type:String , uniqe: true},

    
}, { timestamps: true })

schema.pre('save',function(){
    if(this.password) this.password = bcrypt.hashSync(this.password,8)
 })
 
 schema.pre('findOneAndUpdate',function(){
    if(this._update.password) this._update.password = bcrypt.hashSync(this._update.password,8)
 })

export const userModel = mongoose.model('user', schema)



