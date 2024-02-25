
import { companyModel } from './../../../database/models/company.model.js';
import { ApiFeatures } from './../../utils/apiFeatures.js';
import { applicationModel } from './../../../database/models/application.model.js';


//  add company 

const addCompany = async(req,res,next)=>{
    
    req.body.companyHR = req.user._id
    const company =new companyModel(req.body)
    await company.save()

    res.json({success:true, message:"company created successfuly" ,company})

}



// update company 

const updateCompany = async (req, res , next)=>{
   
    
    // check if name of already use in database or not
    if(req.body.companyName){
        const duplicated = await companyModel.findOne( {companyName:req.body.companyName} )
        if(duplicated) return next(new Error("tihs this name dupilcated",{cause:400}))
    }

    
    //  update in companyModel and only company owner or hr can update his data 
        const company = await companyModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        !company && res.status("404").json({success:false , message:"company not found"});
    
        company&& res.json({success: true , company})
    };
    

// delete company 

const deleteCompany =async (req, res , next)=>{


 
    const company = await companyModel.findByIdAndDelete(req.params.id)
    !company && res.status("404").json({success:false , message:"company not found"});

    company&& res.json({success: true , company})
};

// get company data 

const getCompanyData = async(req,res,next)=>{

    const company = await companyModel.findOne({_id:req.params.id})
    if(!company) return next(new Error("company not found", {cause:404}))
    res.json({success:true , company})
}


// get searched company 

const getSearched = async (req, res , next)=>{

    let apiFeatures = new ApiFeatures(companyModel.find(), req.query).search()
  
    let company =   await apiFeatures.mongooseQuery
    console.log(company);
      res.json({success: true , company})
}


const getAllApplication = async (req, res, next)=>{

    const application = await applicationModel.find({jobId:req.params.id}).populate('userId')
    if(!application) return next(new Error('no result found',{cause:404}))
    res.json({success:true , application})

}


export {
    addCompany,
    updateCompany,
    deleteCompany,
    getCompanyData,
    getSearched,
    getAllApplication

}