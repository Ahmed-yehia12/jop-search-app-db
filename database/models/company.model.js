import mongoose, { Types } from "mongoose";

const schema = new mongoose.Schema({
    companyName: {
        type: String,
        unique: [true, 'name is required'],
        trim: true,
        required: true,
        minLength: [2, 'too short Brand name']
    },
    description :{
        type: String ,
        required:true ,
        minLength: [2, 'too short description name']

    },
    industry :{
        type:String , 

    },
    address:{type:String,
    required:true },

    numberOfEmployees :{
        type:String,
        Range:{min:{type:Number},max:{type:Number}}
    },

    companyEmail:{
        type:String,
        unique:true,
        required:true,
        trim:true
    },

    companyHR :{
        type:Types.ObjectId,
        ref:'user'
    }
}, { timestamps: true, toJSON: { virtuals: true }})

schema.virtual('myJops', {
    ref: 'jop',
    localField: '_id',
    foreignField: 'company',
  });
  schema.pre('findOne', function(){
    this.populate('myJops')
})


export const companyModel = mongoose.model('company', schema)



