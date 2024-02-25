import Joi from "joi";
import { objectIdValidation } from './../../middleware/validation.js';


export const addJopSchema = Joi.object({

    jobTitle:Joi.string().trim().required(),
    jobLocation:Joi.string().required(),
    workingTime:Joi.string().required(),
    seniorityLevel:Joi.string().required(),
    jobDescription:Joi.string().min(2).required(),
    technicalSkills:Joi.array().required(),
    softSkills:Joi.array().required(),
    company:Joi.custom(objectIdValidation),
    
}).required()


export const jopIdSchema = Joi.object({
    id: Joi.custom(objectIdValidation).required()
}).required()



export const updateJopSchema = Joi.object({
    id:Joi.custom(objectIdValidation).required(),
    jobTitle:Joi.string().trim(),
    jobLocation:Joi.string(),
    workingTime:Joi.string(),
    seniorityLevel:Joi.string(),
    jobDescription:Joi.string().min(2),
    technicalSkills:Joi.array(),
    softSkills:Joi.array(),
    company:Joi.custom(objectIdValidation),
    
}).required()





// export const applicationSchema = Joi.object({
//     id:Joi.custom(objectIdValidation).required(),
//     userTechSkills:Joi.array().required(),
//     userSoftSkills:Joi.array().required(),
//     cv:Joi.array()
// }).required()