
import { jopModel } from './../../../database/models/jop.model.js';
import { applicationModel } from './../../../database/models/application.model.js';
import cloudinary from '../../utils/cloud.js';

const addJop = async(req,res,next)=>{
    
    req.body.addedBy = req.user._id
    const jop =new jopModel(req.body)
    await jop.save()

    res.json({success:true, message:"jop created successfuly" ,jop})

}


// update jop 

const updateJop= async (req, res , next)=>{
   

    
    //  update in jopModel and only company owner or hr can update his data 
        const jop = await jopModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        !jop && res.status("404").json({success:false , message:"jop not found"});
    
        jop&& res.json({success: true , jop})
    };
    

// delete Jop 

const deleteJop =async (req, res , next)=>{


 
    const jop = await jopModel.findByIdAndDelete(req.params.id)
    !jop && res.status("404").json({success:false , message:"jop not found"});

    jop&& res.json({success: true , jop})
};


//  get all jops
const getJops = async(req,res,next)=>{

    const jop = await jopModel.find().populate('company')
    if(!jop) return next(new Error("jop not found", {cause:404}))
    res.json({success:true , jop})
}


// get filtered jop 

const filteredJop = async(req,res,next)=>{

    const jop = await jopModel.find(req.query).populate('company')
    if(!jop) return next(new Error('no jops found',{cause:404}))
    res.json({success:true , jop})
}

const applyJop = async (req,res,next)=>{


    if(!req.file) return next(new Error('please upload your cv')) 
    const {public_id , secure_url} = await cloudinary.uploader.upload(req.file.path,{folder:`resume/${req.user._id}`})

    const application = await applicationModel.create({
        jobId: req.params.id,
        userId: req.user._id , 
        userTechSkills:[req.body.userTechSkills],
        userSoftSkills:[req.body.userSoftSkills],
        userResume:{
            id:public_id,
            url:secure_url
        }
    
    
    })
res.json({success:true , application})
}



export{
    addJop,
    updateJop,
    deleteJop,
    getJops,
    filteredJop,
    applyJop
}