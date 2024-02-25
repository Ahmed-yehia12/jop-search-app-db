import { Router } from "express";
import { checkEmail } from "../../middleware/emailExist.js";
import * as userController from "./user.controller.js";
import { asyncHandler } from './../../utils/asyncHandler.js';
import { validation } from "../../middleware/validation.js";
import { forgetCodeSchema, resetCodeSchema, signInSchema, signupSchema, updateAccSchema, updatePasswordSchema } from "./user.schema.js";
import { protectedRoute } from './../../middleware/protectedRoutes.js';
import { allowedTo } from './../../middleware/roles.js';

const userRouter = Router()


userRouter.post('/signUp',validation(signupSchema),checkEmail,asyncHandler(userController.signUp));
userRouter.post('/signIn',validation(signInSchema),asyncHandler(userController.signIn));
userRouter.put('/',protectedRoute,allowedTo('user'),validation(updateAccSchema),asyncHandler(userController.updateAcc))
userRouter.delete('/',protectedRoute,allowedTo('user'),asyncHandler(userController.deleteAcc))
userRouter.get('/',protectedRoute,allowedTo('user'),asyncHandler(userController.getLoggedUserData))
userRouter.get('/getAllRecoveryEmails',asyncHandler(userController.getAllRecoveryEmails))
userRouter.get('/:id',asyncHandler(userController.getUserData))
userRouter.patch('/',protectedRoute,allowedTo('user'),validation(updatePasswordSchema),asyncHandler(userController.updatePassword))
userRouter.post('/forgetPassword',validation(forgetCodeSchema),asyncHandler(userController.forgetPassword));
userRouter.post('/resetPassword',validation(resetCodeSchema),asyncHandler(userController.resetPassword));







export default userRouter