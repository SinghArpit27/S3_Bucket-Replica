import express from 'express';
import { changePassword, forgetPassword, loginUser, protectedController, registerUser, renewAccessToken, updateUserProfile } from '../controller/userController.js';
import { loginValidation, passwordValidation, registerValidation, updateProfileValidation } from '../../../middleware/userValidation.js';
import { expressValidationResult } from '../../../helper/validationError.js';
import { authenticateToken } from '../../../middleware/jwtAuthorization.js';
const route = express.Router()


// Create User Route POST Request
route.post('/userRegister', registerValidation, expressValidationResult, registerUser);

// Login User Route POST Request
route.post('/userLogin', loginValidation, expressValidationResult, loginUser);

// Refesh Token Route POST Request
route.post('/renewAccessToken', renewAccessToken);

// Forget Password Route POST Request
route.post('/forgetPassword', loginValidation, forgetPassword);

// Change Password Route POST Request
route.post('/changePassword', passwordValidation, authenticateToken, changePassword);

// Change User Profile Route POST Request
route.post('/updateProfile', updateProfileValidation, authenticateToken, updateUserProfile);





// Protected Route for testing
route.get('/protectedRoute', authenticateToken, protectedController);

export default route;