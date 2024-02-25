import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import * as companyController from './company.controller.js'
import { validation } from "../../middleware/validation.js";
import { addCompanySchema, companyIdSchema, updateCompanySchema } from "./company.schema.js";
import { protectedRoute } from './../../middleware/protectedRoutes.js';
import { allowedTo } from "../../middleware/roles.js";


const companyRouter = Router()




companyRouter.get('/search' ,protectedRoute ,asyncHandler(companyController.getSearched))

companyRouter.post('/' ,protectedRoute,allowedTo("company_HR"),validation(addCompanySchema) ,asyncHandler(companyController.addCompany))
companyRouter.put('/:id' ,protectedRoute,allowedTo("company_HR"),validation(updateCompanySchema) ,asyncHandler(companyController.updateCompany))
companyRouter.delete('/:id' ,protectedRoute,allowedTo("company_HR"),validation(companyIdSchema) ,asyncHandler(companyController.deleteCompany))
companyRouter.get('/:id' ,protectedRoute,allowedTo("company_HR"),validation(companyIdSchema) ,asyncHandler(companyController.getCompanyData))

companyRouter.get('/jop/:id' ,protectedRoute,allowedTo("company_HR"),validation(companyIdSchema) ,asyncHandler(companyController.getAllApplication))









export default companyRouter