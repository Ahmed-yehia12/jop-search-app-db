import Joi from "joi";
import { objectIdValidation } from "../../middleware/validation.js";

export const signupSchema = Joi.object({
    firstName: Joi.string().min(2).max(20).required(),
    lastName: Joi.string().min(2).max(20).required(),
    email:Joi.string().email().required(),
    password:Joi.string().pattern(new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")),
    rePassword:Joi.string().valid(Joi.ref("password")).required(),
    DOB:Joi.date().required(),
    mobileNumber:Joi.string().required(),
    recoveryEmail:Joi.string().email().required()
}).required()


export const signInSchema = Joi.object({
    email:Joi.string().email(),
    mobileNumber:Joi.string(),
    password:Joi.string().pattern(new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")),
}).required()


export const updateAccSchema = Joi.object({
    firstName: Joi.string().min(2).max(20),
    lastName: Joi.string().min(2).max(20),
    email:Joi.string().email(),
    DOB:Joi.date(),
    mobileNumber:Joi.string(),
    recoveryEmail:Joi.string().email()
}).required()


export const updatePasswordSchema = Joi.object({
    password:Joi.string().pattern(new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")).required(),
    newPassword:Joi.string().pattern(new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")).required()

}).required()



export const forgetCodeSchema = Joi.object({
    email:Joi.string().email().required(),
}).required()

export const resetCodeSchema = Joi.object({
    email:Joi.string().email().required(),
    password:Joi.string().pattern(new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")),
    code:Joi.string().required()
}).required()