import { userModel } from "../../../database/models/user.model.js"
import  jwt  from 'jsonwebtoken';
import bcrypt from 'bcryptjs'
import randomstring from 'randomstring'


const signUp = async(req,res,next)=>{
    
    req.body.userName = req.body.firstName + req.body.lastName
    if(req.body.rePassword !== req.body.password) return next(new Error("password don't match",{cause:401}))
    const user =new userModel(req.body)
    await user.save()

    const token = jwt.sign({userId: user._id , role:user.role},process.env.TOKEN_SECRET)
    res.json({success:true, message:"user created successfuly" ,user,token})

}



const signIn= async(req , res ,next)=>{

    if(req.body.email){
        const {email} = req.body;
        const isUser = await userModel.findOne({email});
        if(!isUser) return next(new Error("Email is invalid")) 

  
        const match = bcrypt.compareSync(req.body.password , isUser.password)
        if(!match) return next(new Error("password is invalid"))
        
        isUser.status ='online'
        await isUser.save()
        const token =jwt.sign({userId: isUser._id , role:isUser.role},process.env.TOKEN_SECRET)
        res.json({success:true , token})
    }
  
    if(req.body.mobileNumber){
        const {mobileNumber} = req.body;
        const isUser = await userModel.findOne({mobileNumber});
        if(!isUser) return next(new Error("Email is invalid")) 

  
        const match = bcrypt.compareSync(req.body.password , isUser.password)
        if(!match) return next(new Error("password is invalid"))
        
        isUser.status ='online'
        await isUser.save()
        const token =jwt.sign({userId: isUser._id , role:isUser.role},process.env.TOKEN_SECRET)
        res.json({success:true , token})
    
    }

}


const updateAcc = async (req, res , next)=>{
const{email,mobileNumber,recoveryEmail,DOB,lastName,firstName}= req.body;

// check if email or mobileNumber already use in database or not

const duplicated = await userModel.findOne(   {$or: [ { email}, { mobileNumber} ]})
if(duplicated) return next(new Error("tihs mobile number dupilcated",{cause:400}))

//  update in userModel and only user can update his data 
    const user = await userModel.findByIdAndUpdate(req.user._id,{email,mobileNumber,recoveryEmail,DOB,lastName,firstName},{new:true});
    !user && res.status("404").json({success:false , message:"user not found"});

    user&& res.json({success: true , user})
};


    // delete user data by owner 

const deleteAcc =async (req, res , next)=>{


 
    const user = await userModel.findByIdAndDelete(req.user._id)
    !user && res.status("404").json({success:false , message:"user not found"});

    user&& res.json({success: true , user})
};


// get user data and must be logged
const getLoggedUserData = async(req,res,next)=>{

    const user = await userModel.findById(req.user._id)
    if(!user) return next(new Error("user not foun", {cause:404}))
    res.json({success:true , user})
}


const getUserData = async(req,res,next)=>{

    const user = await userModel.findById(req.params.id)
    if(!user) return next(new Error("user not foun", {cause:404}))
    res.json({success:true , user})
}





export const updatePassword= async(req , res ,next)=>{

    // find user first
    let user = await userModel.findById(req.user._id)
    
    if(!user) return next(new Error("user not found"))
    
    // check if password matching password in database
        const match = bcrypt.compareSync(req.body.password , user.password)
        if(!match) return next(new Error("password is invalid"))

    // generate new token
        const token =jwt.sign({userId: user._id , role:user.role},process.env.TOKEN_SECRET)

    // update password
        await userModel.findByIdAndUpdate(req.user._id,{password:req.body.newPassword , passwordChangedAt:Date.now()})
        res.json({success:true , token})
    
    }
    
    

  const forgetPassword= async(req,res,next)=>{

        // check email is exist in database

        const user = await userModel.findOne({email:req.body.email});
        if(!user) return next(new Error("email not found"))
    
        // generate forget code

        const code = randomstring.generate({
            length:5 , 
            charset:"numberic"
        });
    
        // save code in database
        user.forgetCode = code 
        await user.save()
    
   
    
    return res.send("you can reset your password now")
    
    
    }
    
    
    const resetPassword = async(req,res,next)=>{
        let user = await userModel.findOne({email:req.body.email});
        if(!user) return next(new Error("email not found"))
    
        if(user.forgetCode !== req.body.code) return next(new Error("invalid code"))
    
        user.password = req.body.password
        await user.save()
    
     
        
        return res.json({success:true , message:"try login now"})
    
    }


    const getAllRecoveryEmails = async(req,res ,next)=>{

        const recoveryEmails =  [];
        const user = await userModel.find()
        user.forEach((i)=>{
            recoveryEmails.push(i.recoveryEmail)
        })     
        res.json({success:true ,recoveryEmails})
    }


export{
    signUp,
    signIn,
    updateAcc,
    deleteAcc,
    getLoggedUserData,
    getUserData,
    forgetPassword,
    resetPassword,
    getAllRecoveryEmails
}