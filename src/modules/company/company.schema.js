import Joi from "joi"
import { objectIdValidation } from "../../middleware/validation.js"



export const addCompanySchema = Joi.object({
    companyName:Joi.string().trim().required(),
    description:Joi.string().min(2).required(),
    industry:Joi.string(),
    address:Joi.string().trim().required(),
    numberOfEmployees:Joi.string().trim(),
    companyEmail:Joi.string().email().trim().required(),
    
}).required()



export const companyIdSchema = Joi.object({
    id: Joi.custom(objectIdValidation).required()
}).required()


export const updateCompanySchema = Joi.object({
    id:Joi.custom(objectIdValidation).required(),
    companyName:Joi.string().trim(),
    description:Joi.string().min(2),
    industry:Joi.string(),
    address:Joi.string().trim(),
    numberOfEmployees:Joi.string().trim(),
    companyEmail:Joi.string().email().trim(),
    
}).required()

