import { Router } from "express";
import { protectedRoute } from './../../middleware/protectedRoutes.js';
import { allowedTo } from './../../middleware/roles.js';
import { asyncHandler } from "../../utils/asyncHandler.js";
import { validation } from "../../middleware/validation.js";
import { addJopSchema,  jopIdSchema, updateJopSchema } from "./jop.schema.js";
import * as jopControllre from './jop.controller.js'
import { uploadFileCloud } from "../../utils/clod.multer.js";

const jopRouter = Router()

jopRouter.get('/filter' ,protectedRoute ,asyncHandler(jopControllre.filteredJop))

jopRouter.get('/' ,protectedRoute ,asyncHandler(jopControllre.getJops))

jopRouter.post('/' ,protectedRoute,allowedTo("company_HR"),validation(addJopSchema) ,asyncHandler(jopControllre.addJop))

jopRouter.put('/:id' ,protectedRoute,allowedTo("company_HR"),validation(updateJopSchema) ,asyncHandler(jopControllre.updateJop))

jopRouter.delete('/:id' ,protectedRoute,allowedTo("company_HR"),validation(jopIdSchema) ,asyncHandler(jopControllre.deleteJop))


jopRouter.post('/application/:id' ,protectedRoute,allowedTo("user"),uploadFileCloud().single('cv'),asyncHandler(jopControllre.applyJop))






export default jopRouter